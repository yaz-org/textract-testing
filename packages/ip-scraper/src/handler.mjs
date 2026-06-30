import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { connect } from "node:net";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import TelegramBot from "node-telegram-bot-api";

puppeteer.use(StealthPlugin());

const VPN_SOCKS_PORT = 1080;
const VPN_BINARY = "/usr/local/bin/openvpn2socks";
const VPN_TIMEOUT = 25_000;
const SESSION_STATE_KEY = process.env.SESSION_STATE_KEY || "session-state.json";
const s3 = new S3Client({ region: process.env.AWS_REGION });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const bot = TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID
  ? new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false })
  : null;
if (bot) {
  console.log("[telegram] Bot initialized");
} else {
  console.log(`[telegram] Bot disabled (token=${!!TELEGRAM_BOT_TOKEN}, chatId=${!!TELEGRAM_CHAT_ID})`);
}

async function sendScreenshot(page, label, extra = {}) {
  if (!bot || !TELEGRAM_CHAT_ID) return;
  try {
    const img = await page.screenshot({ encoding: "base64", type: "png" });
    const emoji = extra.type === "success" ? "🟢" : "🔴";
    const lines = [`${emoji} *${label}*`];
    if (extra.url) lines.push(`URL: \`${extra.url}\``);
    if (extra.message) lines.push(`Msg: ${extra.message}`);
    if (extra.detail) lines.push(extra.detail);
    await bot.sendPhoto(TELEGRAM_CHAT_ID, Buffer.from(img, "base64"), {
      caption: lines.join("\n"),
      parse_mode: "Markdown",
    });
    console.log(`[telegram] Sent screenshot: ${label}`);
  } catch (err) {
    console.error(`[telegram] Send failed: ${err.message}`);
  }
}

function waitForPort(port, host = "127.0.0.1", timeout = VPN_TIMEOUT) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      if (Date.now() - start > timeout) {
        reject(new Error(`Timeout waiting for port ${port}`));
        return;
      }
      const socket = connect(port, host, () => {
        socket.destroy();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        setTimeout(check, 300);
      });
    }
    check();
  });
}

async function getConfig() {
  const bucket = process.env.VPN_CONFIG_BUCKET;
  const key = process.env.VPN_CONFIG_KEY;
  if (!bucket || !key) {
    throw new Error("Missing VPN_CONFIG_BUCKET or VPN_CONFIG_KEY env vars");
  }
  const resp = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return await resp.Body.transformToString();
}

async function loadSession() {
  const bucket = process.env.VPN_CONFIG_BUCKET;
  try {
    const resp = await s3.send(new GetObjectCommand({
      Bucket: bucket,
      Key: SESSION_STATE_KEY,
    }));
    const state = JSON.parse(await resp.Body.transformToString());
    console.log(`[session] Loaded session from ${state.origin} (${state.cookies?.length || 0} cookies)`);
    return state;
  } catch (err) {
    if (err.name === "NoSuchKey" || err.name === "AccessDenied") {
      console.log("[session] No saved session state found");
      return null;
    }
    throw err;
  }
}

async function saveSession(page) {
  const bucket = process.env.VPN_CONFIG_BUCKET;
  const cookies = await page.cookies();
  const localStorage = await page.evaluate(() => {
    try { return JSON.parse(JSON.stringify(localStorage)); } catch { return {}; }
  });
  const state = {
    cookies,
    localStorage,
    updatedAt: new Date().toISOString(),
    origin: page.url(),
  };
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: SESSION_STATE_KEY,
    Body: JSON.stringify(state),
    ContentType: "application/json",
  }));
  console.log(`[session] Saved session state (${cookies.length} cookies, ${Object.keys(localStorage).length} ls keys)`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const randomDelay = (min, max) => sleep(min + Math.random() * (max - min));

async function typeSlowly(frame, selector, text) {
  await frame.click(selector);
  await randomDelay(200, 500);
  for (const char of text) {
    await frame.type(selector, char);
    await randomDelay(60, 160);
  }
}

async function discoverInputs(frame, label) {
  try {
    const inputs = await frame.evaluate(() =>
      Array.from(document.querySelectorAll("input, select, textarea, button")).map((el) => ({
        tag: el.tagName,
        type: el.type || null,
        id: el.id || null,
        name: el.name || null,
        className: el.className || null,
        placeholder: el.placeholder || null,
        value: el.value ? el.value.substring(0, 30) : null,
        visible: el.offsetParent !== null,
      }))
    );
    console.log(`[discover:${label}] ${inputs.length} elements`);
    return inputs;
  } catch (err) {
    console.log(`[discover:${label}] Failed (navigation likely): ${err.message}`);
    return [];
  }
}

async function findInputByPriority(frame, selectors, label) {
  for (const sel of selectors) {
    const el = await frame.$(sel);
    if (el) {
      console.log(`[finder:${label}] Matched selector "${sel}"`);
      return sel;
    }
  }
  const fallback = "input:not([type=hidden]):not([type=submit]):not([type=button])";
  console.log(`[finder:${label}] No priority selector matched, falling back to "${fallback}"`);
  return fallback;
}

async function extractPageText(frame) {
  return await frame.evaluate(() => {
    const labels = Array.from(document.querySelectorAll(
      "span, label, td, div, p, h1, h2, h3, h4, strong, b"
    ));
    const texts = [];
    for (const el of labels) {
      const text = (el.textContent || "").trim();
      if (text && text.length > 3 && el.offsetParent !== null) {
        texts.push({ tag: el.tagName, id: el.id || null, text: text.substring(0, 300) });
      }
    }
    return texts;
  });
}

async function closeModal(page) {
  await randomDelay(1500, 2500);
  const modalVisible = await page.evaluate(() => {
    const el = document.querySelector("#customModal");
    return el && el.style.display !== "none";
  });
  if (!modalVisible) {
    console.log("[modal] No modal detected");
    return false;
  }
  console.log("[modal] Modal detected, finding close buttons");
  const closeCount = await page.evaluate(() => {
    const buttons = document.querySelectorAll("#closeButton");
    buttons.forEach((btn) => btn.click());
    return buttons.length;
  });
  console.log(`[modal] Clicked ${closeCount} close button(s)`);
  await randomDelay(1000, 1500);
  const stillOpen = await page.evaluate(() => {
    const el = document.querySelector("#customModal");
    return el && el.style.display !== "none";
  });
  console.log(`[modal] Modal still visible after close: ${stillOpen}`);
  return !stillOpen;
}

async function performLogout(page) {
  console.log("[logout] Looking for logout link");
  const exists = await page.$("#ctl00_btnSalir");
  if (!exists) {
    console.log("[logout] Logout link not found");
    return { success: false, method: null, finalUrl: page.url() };
  }
  console.log("[logout] Clicking #ctl00_btnSalir");
  await page.click("#ctl00_btnSalir");
  try {
    await page.waitForFunction(
      () => location.href.includes("salir.aspx"),
      { timeout: 15000, polling: 500 }
    );
    console.log(`[logout] Navigated to salir.aspx`);
    return { success: true, method: "#ctl00_btnSalir", finalUrl: page.url() };
  } catch {
    console.log("[logout] Timeout waiting for salir.aspx navigation");
    return { success: false, method: "#ctl00_btnSalir", finalUrl: page.url() };
  }
}

function getVenezuelanDateString(offsetDays) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;

  const vetDate = new Date(`${year}-${month}-${day}T00:00:00-04:00`);
  vetDate.setDate(vetDate.getDate() + offsetDays);

  const d = String(vetDate.getDate()).padStart(2, "0");
  const m = String(vetDate.getMonth() + 1).padStart(2, "0");
  const y = vetDate.getFullYear();
  return `${d}/${m}/${y}`;
}

async function fetchStatements(page) {
  console.log("[statements] Checking for account table");
  const accountLink = await page.$("table.GridViewHm a");
  if (accountLink) {
    console.log("[statements] Clicking first account link");
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0", timeout: 20000 }),
        accountLink.click(),
      ]);
      console.log(`[statements] Navigated to ${page.url()}`);
    } catch (err) {
      console.log(`[statements] Account navigation error: ${err.message}`);
      return { success: false, reason: "account-navigation-timeout" };
    }
  } else {
    const alreadyOn = await page.$("#ctl00_cp_ddlPeriodo");
    if (!alreadyOn) {
      console.log("[statements] Neither account table nor period dropdown found");
      return { success: false, reason: "no-account-or-period-page" };
    }
    console.log("[statements] Already on statement page, skipping account click");
  }

  console.log("[statements] Selecting Por Rango option");
  await page.click("#ctl00_cp_rdbRango");
  await randomDelay(500, 1000);

  const desde = getVenezuelanDateString(-1);
  const hasta = getVenezuelanDateString(2);
  console.log(`[statements] Setting date range: ${desde} → ${hasta}`);

  await page.evaluate(({ desde, hasta }) => {
    const desdeEl = document.querySelector("#ctl00_cp_dtFechaDesde");
    const hastaEl = document.querySelector("#ctl00_cp_dtFechaHasta");

    desdeEl.value = "";
    desdeEl.focus();
    desdeEl.value = desde;
    desdeEl.dispatchEvent(new Event("input", { bubbles: true }));
    desdeEl.dispatchEvent(new Event("change", { bubbles: true }));
    desdeEl.blur();

    hastaEl.value = "";
    hastaEl.focus();
    hastaEl.value = hasta;
    hastaEl.dispatchEvent(new Event("input", { bubbles: true }));
    hastaEl.dispatchEvent(new Event("change", { bubbles: true }));
    hastaEl.blur();
  }, { desde, hasta });

  await randomDelay(300, 500);

  console.log("[statements] Clicking Consultar");
  try {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0", timeout: 20000 }),
      page.click("#ctl00_cp_btnMostrar"),
    ]);
  } catch (err) {
    console.log(`[statements] Consult navigation error: ${err.message}`);
    return { success: false, reason: "consult-navigation-timeout" };
  }
  await randomDelay(1000, 1500);

  const { tableFound, noTransactions } = await page.evaluate(() => {
    const table = document.querySelector("table.DefGV");
    if (!table) {
      const body = document.body.textContent || "";
      const noTx = body.includes("Ud. no posee movimientos en el rango de fechas seleccionado");
      return { tableFound: false, noTransactions: noTx };
    }
    const headers = table.querySelectorAll("thead th");
    const expected = ["Fecha", "Descripción", "Referencia", "Monto", "D/C", "Saldo"];
    const actual = Array.from(headers).map((th) => th.textContent.trim());
    const valid = expected.every((h, i) => actual[i]?.includes(h));
    return { tableFound: valid, noTransactions: false };
  });

  if (!tableFound) {
    if (noTransactions) {
      console.log("[statements] No transactions in selected period");
      return { success: true, reason: null, transactions: [] };
    }
    console.log("[statements] Transactions table not found and no matching message");
    return { success: false, reason: "no-transaction-table" };
  }

  console.log("[statements] Extracting transaction data");
  const transactions = await page.evaluate(() => {
    const table = document.querySelector("table.DefGV");
    const rows = table.querySelectorAll("tbody tr");
    return Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        date: cells[0]?.textContent.trim() || "",
        description: cells[1]?.textContent.trim() || "",
        reference: cells[2]?.textContent.trim() || "",
        amount: cells[3]?.textContent.trim() || "",
        type: cells[4]?.textContent.trim() || "",
        balance: cells[5]?.textContent.trim() || "",
      };
    });
  });
  console.log(`[statements] Extracted ${transactions.length} transactions`);

  return { success: true, reason: null, transactions };
}

async function startVpnProxy(config) {
  const ovpnPath = "/tmp/proton.ovpn";
  await writeFile(ovpnPath, config);

  const proc = spawn(VPN_BINARY, [
    "-config", ovpnPath,
    "-allow-no-server-identity",
  ], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      OVPN_USER: process.env.OPENVPN_USERNAME,
      OVPN_PASS: process.env.OPENVPN_PASSWORD,
    },
  });

  proc.stdout?.on("data", (d) => console.log(`[vpn] ${d.toString().trim()}`));
  proc.stderr?.on("data", (d) => console.error(`[vpn] ${d.toString().trim()}`));
  proc.on("exit", (code) => console.log(`[vpn] process exited with code ${code}`));

  const cleanup = () => {
    try { proc.kill("SIGTERM"); } catch {}
    setTimeout(() => {
      try { proc.kill("SIGKILL"); } catch {}
    }, 3000);
  };

  return { proc, cleanup };
}

export const handler = async (event) => {
  if (event.Records?.[0]?.eventSource === "aws:sqs") {
    event = JSON.parse(event.Records[0].body);
  }

  const vpnUser = process.env.OPENVPN_USERNAME;
  const vpnPass = process.env.OPENVPN_PASSWORD;

  if (!vpnUser || !vpnPass) {
    return { error: "Missing VPN environment variables" };
  }

  const profileName = event?.profileName;

  if (!profileName) {
    return { error: "Missing 'profile' in event" };
  }

  let creds;
  try {
    const encoded = process.env.WEB_PAGE_CREDENTIALS;
    if (!encoded) throw new Error("WEB_PAGE_CREDENTIALS not set");
    const allCreds = JSON.parse(Buffer.from(encoded, "base64").toString());
    creds = allCreds[profileName];
    if (!creds) {
      console.log(`[handler] Profile "${profileName}" not found in credentials`);
      return { step: "profile-not-found", profileName };
    }
  } catch (err) {
    return { error: `Failed to load credentials: ${err.message}` };
  }

  const targetUrl = event?.url || "https://www.banesconline.com/mantis/Website/Login.aspx";

  console.log("[handler] Fetching VPN config from S3...");
  const config = await getConfig();
  console.log("[handler] VPN config loaded");

  const { cleanup } = await startVpnProxy(config);

  try {
    console.log("[handler] Waiting for VPN proxy...");
    await waitForPort(VPN_SOCKS_PORT);
    console.log("[handler] VPN proxy ready");

    console.log("[handler] Launching Chromium...");
    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--lang=es',
        `--proxy-server=socks5://127.0.0.1:${VPN_SOCKS_PORT}`,
      ],
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.setExtraHTTPHeaders({ "Accept-Language": "es" });

      const session = await loadSession();
      if (session?.cookies?.length) {
        await page.setCookie(...session.cookies);
        console.log(`[session] Restored ${session.cookies.length} cookies`);
      }

      console.log(`[handler] Navigating to ${targetUrl}...`);
      await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30000 });

      if (session?.localStorage) {
        await page.evaluate((store) => {
          for (const [k, v] of Object.entries(store)) {
            localStorage.setItem(k, v);
          }
        }, session.localStorage);
        console.log(`[session] Restored ${Object.keys(session.localStorage).length} localStorage keys`);
      }

      // Wait for the login iframe
      await page.waitForSelector("#ctl00_cp_frmAplicacion", { timeout: 15000 });
      const iframeEl = await page.$("#ctl00_cp_frmAplicacion");
      const iframe = await iframeEl.contentFrame();
      if (!iframe) throw new Error("Could not access iframe content frame");

      // Wait for iframe DOM to stabilize
      await iframe.waitForSelector("body", { timeout: 10000 });
      await randomDelay(500, 1000);

      // Discover all form elements in the iframe
      const discovered = await discoverInputs(iframe, "login");

      // Find the username input by priority
      const usernameSelector = await findInputByPriority(iframe, [
        "#txtUsuario",
        'input[name="txtUsuario"]',
        'input[placeholder="USUARIO"]',
      ], "username");

      // Type username character by character
      console.log(`[handler] Typing username (${creds.username.length} chars)...`);
      await typeSlowly(iframe, usernameSelector, creds.username);
      console.log("[handler] Username entered");

      await randomDelay(300, 600);
      console.log("[handler] Pressing Enter...");
      await page.keyboard.press("Enter");

      // Wait for the iframe to navigate to the next page
      console.log("[handler] Waiting for post-login page...");
      let currentUrl = null;
      let isDnaPage = false;
      try {
        await page.waitForFunction(
          () => {
            const frame = document.querySelector("#ctl00_cp_frmAplicacion");
            return frame && frame.contentWindow && frame.contentWindow.location &&
              !frame.contentWindow.location.pathname.includes("inicio.aspx");
          },
          { timeout: 30000, polling: 1000 }
        );
        const urlResult = await page.evaluate(() => {
          const frame = document.querySelector("#ctl00_cp_frmAplicacion");
          return frame?.contentWindow?.location?.pathname || null;
        });
        currentUrl = urlResult;
        isDnaPage = currentUrl?.includes("LoginDNA") || false;
        console.log(`[handler] Iframe navigated to ${currentUrl} (DNA=${isDnaPage})`);
      } catch {
        console.log("[handler] Iframe did not navigate within timeout, continuing...");
        await sendScreenshot(page, "iframe-navigation-timeout", {
          url: page.url(),
          message: "Username Enter did not trigger iframe navigation",
        }).catch(() => {});
      }

      await randomDelay(1000, 1500);

      // Discover what's on the post-login page before deciding how to interact
      const postLoginInputs = await discoverInputs(iframe, "post-login");
      const pageText = await extractPageText(iframe);

      // Handle security questions (LoginDNA.aspx)
      const questionsAnswered = [];
      const unansweredQuestions = [];
      if (isDnaPage) {
        console.log("[handler] Security questions page detected");

        // Check if question labels exist (they are SPANs, not INPUTs)
        const hasQ1 = await iframe.$("#lblPrimeraP") !== null;
        const hasQ2 = await iframe.$("#lblSegundaP") !== null;

        if (hasQ1 && hasQ2) {
          console.log("[handler] Answering security questions...");
          try {
            const question1 = await iframe.$eval("#lblPrimeraP", (el) => el.textContent.trim());
            const question2 = await iframe.$eval("#lblSegundaP", (el) => el.textContent.trim());
            console.log(`[handler] Q1: "${question1}"`);
            console.log(`[handler] Q2: "${question2}"`);

            const sq = creds.security_questions || {};
            const answer1 = sq[question1];
            const answer2 = sq[question2];

            if (answer1) {
              await typeSlowly(iframe, "#txtPrimeraR", answer1);
              questionsAnswered.push({ question: question1, answered: true });
            } else {
              console.log(`[handler] No answer found for: "${question1}"`);
              unansweredQuestions.push(question1);
            }

            await randomDelay(200, 400);

            if (answer2) {
              await typeSlowly(iframe, "#txtSegundaR", answer2);
              questionsAnswered.push({ question: question2, answered: true });
            } else {
              console.log(`[handler] No answer found for: "${question2}"`);
              unansweredQuestions.push(question2);
            }

            if (unansweredQuestions.length === 0) {
              await randomDelay(300, 600);
              console.log("[handler] Submitting security questions...");
              await iframe.click("#bAceptar");

              // Wait for navigation to password page
              try {
                await page.waitForFunction(
                  () => {
                    const frame = document.querySelector("#ctl00_cp_frmAplicacion");
                    return frame && frame.contentWindow && frame.contentWindow.location &&
                      !frame.contentWindow.location.pathname.includes("LoginDNA");
                  },
                  { timeout: 30000, polling: 1000 }
                );
                currentUrl = await page.evaluate(() => {
                  const frame = document.querySelector("#ctl00_cp_frmAplicacion");
                  return frame?.contentWindow?.location?.pathname || null;
                });
                console.log(`[handler] Navigated to ${currentUrl} after DNA`);
              } catch {
                console.log("[handler] DNA submit navigation timeout");
                await sendScreenshot(page, "dna-submit-timeout", {
                  url: currentUrl,
                  message: "Did not navigate away from LoginDNA after submitting answers",
                }).catch(() => {});
              }
            }
          } catch (err) {
            console.error(`[handler] Error processing security questions: ${err.message}`);
            await sendScreenshot(page, "security-questions-error", {
              url: currentUrl,
              message: err.message,
            }).catch(() => {});
          }
        } else {
          console.log(`[handler] DNA page has different layout (Q1=${hasQ1}, Q2=${hasQ2})`);
          await sendScreenshot(page, "dna-unexpected-layout", {
            url: currentUrl,
            message: `Q1=${hasQ1} Q2=${hasQ2}`,
            detail: pageText.map((t) => t.text).join(" | ").substring(0, 200),
          }).catch(() => {});
        }

        await randomDelay(800, 1200);
      }

      // If still on a DNA page (unanswered questions), skip password
      if (isDnaPage && unansweredQuestions.length > 0) {
        console.log(`[handler] ${unansweredQuestions.length} unanswered question(s), cannot proceed`);
        await sendScreenshot(page, "security-questions-incomplete", {
          url: currentUrl,
          message: `Unknown: ${unansweredQuestions.join(", ")}`,
          detail: pageText.map((t) => t.text).join(" | ").substring(0, 200),
        }).catch(() => {});
        await saveSession(page).catch(() => {});
        return {
          step: "security-questions-incomplete",
          profileName,
          username: creds.username.substring(0, 2) + "***",
          questionsAnswered,
          unansweredQuestions,
          pageText,
        };
      }

      // Now find and enter the password
      const passwordSelector = await findInputByPriority(iframe, [
        "#txtClave",
        'input[type="password"]',
        'input[name="txtClave"]',
        'input[placeholder*="CLAVE"]',
        'input[placeholder*="clave"]',
        'input[placeholder*="CONTRASEÑA"]',
      ], "password");

      console.log(`[handler] Typing password...`);
      await typeSlowly(iframe, passwordSelector, creds.password);
      console.log("[handler] Password entered");

      await randomDelay(300, 600);
      console.log("[handler] Submitting login...");
      await page.keyboard.press("Enter");

      // Wait for redirect: if the iframe is gone → top-level dashboard;
      // if it still exists, wait until it leaves DNA/security pages.
      let dashboardUrl = null;
      let passwordPostUrl = null;
      await randomDelay(1500, 2500);
      try {
        await page.waitForFunction(
          () => {
            const frame = document.querySelector("#ctl00_cp_frmAplicacion");
            if (!frame) return true; // iframe gone → top-level navigation (dashboard)
            if (!frame.contentWindow || !frame.contentWindow.location) return false;
            const path = frame.contentWindow.location.pathname;
            const excluded = ["Login", "login", "DNA", "Contrase"];
            return !excluded.some((s) => path.includes(s));
          },
          { timeout: 25000, polling: 1000 }
        );
        console.log("[handler] Dashboard detected via iframe change");
      } catch {
        console.log("[handler] Dashboard navigation timeout");
      }

      // Determine final URL after password submit
      let iframe2 = null;
      try {
        const urlInfo = await page.evaluate(() => {
          const frame = document.querySelector("#ctl00_cp_frmAplicacion");
          return {
            iframePath: frame?.contentWindow?.location?.pathname || null,
            topPath: location.pathname,
            topTitle: document.title,
          };
        });
        passwordPostUrl = urlInfo.iframePath || urlInfo.topPath;
        dashboardUrl = urlInfo.topPath;
        console.log(`[handler] After password — title: "${urlInfo.topTitle}", iframe: ${urlInfo.iframePath}, top: ${urlInfo.topPath}`);

        // Screenshot if still on an error or security page (not the dashboard)
        const final = passwordPostUrl || "";
        const isDashboard = !final.includes("error") && !final.includes("DNA") && !final.includes("Contrase") && !final.includes("Login") && !final.includes("inicio");
        console.log(`[handler] Post-password page check: "${final}" isDashboard=${isDashboard} bot=${!!bot} chatId=${!!TELEGRAM_CHAT_ID}`);
        if (!isDashboard) {
          console.log("[handler] Triggering screenshot...");
          await sendScreenshot(page, "post-password-unexpected", {
            url: final,
            message: `Title: ${urlInfo.topTitle}`,
          }).catch(() => {});

          // Try re-discovering the iframe
          iframe2 = await page.$("#ctl00_cp_frmAplicacion");
          if (iframe2) {
            const contentFrame = await iframe2.contentFrame();
            if (contentFrame) {
              await discoverInputs(contentFrame, "post-password");
              const text = await extractPageText(contentFrame);
              console.log(`[handler] Post-password page text samples:`, text.slice(0, 3).map((t) => t.text.substring(0, 60)));
            }
          }
        } else {
          // ── Success path ──
          console.log("[handler] Login successful");

          const modalClosed = await closeModal(page).catch((err) => {
            console.log(`[modal] Error: ${err.message}`);
            return false;
          });

          const statementsResult = await fetchStatements(page).catch((err) => {
            console.log(`[statements] Error: ${err.message}`);
            return { success: false, reason: "exception" };
          });

          if (statementsResult?.success && event.callbackUrl) {
            try {
              const callbackBody = JSON.stringify({
                success: true,
                profileName,
                transactions: statementsResult.transactions,
                transactionsCount: statementsResult.transactions.length,
              });
              const resp = await fetch(event.callbackUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: callbackBody,
              });
              console.log(`[callback] Posted to ${event.callbackUrl} (${resp.status})`);
            } catch (err) {
              console.error(`[callback] Failed: ${err.message}`);
            }
          }

          const logoutResult = await performLogout(page).catch((err) => {
            console.log(`[logout] Error: ${err.message}`);
            return { success: false, method: null, finalUrl: page.url() };
          });

          // Return early — session is server-side, don't clear or overwrite
          return {
            step: logoutResult?.success ? "logged-out" : "logout-attempted",
            profileName,
            username: creds.username.substring(0, 2) + "***",
            usernameSelector,
            passwordSelector,
            postLoginUrl: currentUrl,
            dashboardUrl,
            questionsAnswered,
            unansweredQuestions,
            passwordPostUrl,
            modalClosed: modalClosed ?? false,
            statementsFetched: statementsResult?.success ?? false,
            statementsReason: statementsResult?.reason ?? null,
            transactionsCount: statementsResult?.transactions?.length ?? 0,
            logoutMethod: logoutResult?.method ?? null,
            logoutUrl: logoutResult?.finalUrl ?? null,
          };
        }
      } catch (err) {
        console.log(`[handler] Could not determine post-password URL: ${err.message}`);
        await sendScreenshot(page, "post-password-unknown", {
          url: page.url(),
          message: err.message,
        }).catch(() => {});
      }

      try {
        await saveSession(page);
      } catch (err) {
        console.error(`[session] Failed to save: ${err.message}`);
      }

      return {
        step: "dashboard-loaded",
        profileName,
        username: creds.username.substring(0, 2) + "***",
        usernameSelector,
        passwordSelector,
        postLoginUrl: currentUrl,
        dashboardUrl,
        questionsAnswered,
        unansweredQuestions,
        discoveredInputs: discovered,
        postLoginInputs,
        pageText,
        passwordPostUrl,
      };
    } finally {
      const pages = await browser.pages();
      await Promise.all(pages.map((p) => p.close().catch(() => {})));
      await browser.close();
    }
  } finally {
    cleanup();
  }
};
