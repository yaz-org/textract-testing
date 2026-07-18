# ip-scraper: VPN-Proxy Lambda for Banking Login Automation

A two-part system that scrapes account statements from **BanescOnline** (a Venezuelan
banking website). A submit endpoint enqueues jobs to an SQS FIFO queue (keyed by profile),
and a Docker Lambda processes them sequentially per profile using Puppeteer/Chromium
through a Proton VPN tunnel. Results are sent by signed POST to a caller-provided callback URL.

---

## Architecture

```
Client ──POST──▶ SubmitScraperFn (Function URL, API-key)
                    │
                    ▼
            StatementsScraperQueue (FIFO)
              MessageGroupId = profileName
                    │
                    ▼
         ┌───────────────────────────────────────────────┐
         │            Lambda Container (Docker)           │
         │  ┌────────────────────────────────────┐      │
         │  │           Handler (.mjs)           │      │
         │  │                                    │      │
         │  │  1. Fetch .ovpn from S3            │──────┼──▶ S3 (config)
         │  │  2. Spawn openvpn2socks            │      │
         │  │  3. Wait for SOCKS5 :1080           │      │
         │  │  4. Launch Chromium (puppeteer-extra│      │
         │  │     + stealth plugin)               │      │
         │  │  5. Load saved session (cookies)    │──────┼──▶ S3 (session)
         │  │  6. Navigate to BanescOnline        │      │
         │  │  7. Type username → Enter            │      │
         │  │  8. Answer security questions        │      │
         │  │  9. Type password → Enter            │──────┼──▶ BanescOnline
         │  │ 10. Detect dashboard (iframe gone)   │      │
         │  │ 11. Close modal (if present)         │      │
         │  │ 12. Fetch account statements         │      │
         │  │ 13. Signed POST to callbackUrl       │──────┼──▶ Callback URL
         │  │ 14. Logout → salir.aspx             │      │
         │  │ 15. Browser cleanup (finally)        │      │
         │  └──────────┬─────────────────────────┘      │
         │             │                                │
         │    ┌────────▼──────────┐                    │
         │    │  openvpn2socks     │                    │
         │    │  SOCKS5 :1080      │◀───────────────────┼── Proton VPN
         │    └───────────────────┘                    │
         └───────────────────────────────────────────────┘
```

**Flow**:
1. Client POSTs `{ profileName, callbackUrl }` + `x-api-key` to `SubmitScraperFn` URL
2. Submit function validates the API key, sends message to FIFO queue (`MessageGroupId: profileName`)
3. Scraper Lambda receives the SQS event, extracts `{ profileName, callbackUrl }`
4. Fetches OpenVPN profile from S3 (decoded from a base64 SST secret)
5. Writes the `.ovpn` file to `/tmp/proton.ovpn`
6. Spawns `openvpn2socks` which connects to Proton VPN and listens on `127.0.0.1:1080` (SOCKS5)
7. Launches Puppeteer with `puppeteer-extra` + stealth plugin; `--proxy-server=socks5://127.0.0.1:1080`
8. Loads previous session cookies from S3 (if any)
9. Navigates to BanescOnline login page
10. **Login flow**:
    - If session already valid → auto-redirects to CAU area
    - Finds `#txtUsuario` in the login iframe → types username character-by-character → Enter
    - If security questions page (`LoginDNA.aspx`): detects questions via `#lblPrimeraP` / `#lblSegundaP`,
      looks up answers in credentials, types into `#txtPrimeraR` / `#txtSegundaR`, submits
    - Finds `#txtClave` → types password character-by-character → Enter
    - Waits for redirect: iframe disappears → /Mantis/WebSite/Default.aspx (dashboard)
11. If dashboard reached: close modal → fetch statements → signed POST `{ success, transactions }` to callbackUrl → logout
12. Browser cleanup on finally block; VPN cleanup on outer finally block

---

## Key Dependencies

| Package | Purpose |
|---|---|
| `@sparticuz/chromium` | Chromium binary bundled for Lambda (x86_64; arm64 planned) |
| `puppeteer-extra` | Wrapper around puppeteer-core with plugin support |
| `puppeteer-extra-plugin-stealth` | Evades bot detection by modifying browser fingerprints |
| `puppeteer-core` | Headless browser control |
| `n0madic/go-openvpn` (openvpn2socks) | Pure-Go OpenVPN client → SOCKS5 |
| `@aws-sdk/client-s3` | Fetch OpenVPN config and session state from S3 |
| `node-telegram-bot-api` | Send error (🔴) screenshots via Telegram for debugging |

---

## Handler Source

**File**: `packages/ip-scraper/src/handler.mjs`

### Imports & Globals

```javascript
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { connect } from "node:net";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import TelegramBot from "node-telegram-bot-api";
import { prepareSignedCallback } from "./callback-signing.mjs";

puppeteer.use(StealthPlugin());

const VPN_SOCKS_PORT = 1080;
const VPN_BINARY = "/usr/local/bin/openvpn2socks";
const VPN_TIMEOUT = 25_000;
const SESSION_STATE_KEY = process.env.SESSION_STATE_KEY || "session-state.json";
const s3 = new S3Client({ region: process.env.AWS_REGION });
```

### Telegram Bot Setup

Initialized at module load (no polling — only sends, never receives):

```javascript
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const bot = TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID
  ? new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false })
  : null;
```

### Helper: `sendScreenshot(page, label, extra)`

Captures a full-page screenshot and sends it to the Telegram chat.
Supports `extra.type: "success"` for green checkmark (🟢) vs default red (🔴):

```javascript
async function sendScreenshot(page, label, extra = {}) {
  if (!bot || !TELEGRAM_CHAT_ID) return;
  const img = await page.screenshot({ encoding: "base64", type: "png" });
  const emoji = extra.type === "success" ? "🟢" : "🔴";
  const lines = [`${emoji} *${label}*`];
  if (extra.url) lines.push(`URL: \`${extra.url}\``);
  if (extra.message) lines.push(`Msg: ${extra.message}`);
  if (extra.detail) lines.push(extra.detail);
  await bot.sendPhoto(TELEGRAM_CHAT_ID, Buffer.from(img, "base64"), {
    caption: lines.join("\n"), parse_mode: "Markdown",
  });
}
```

Used on these error states (🔴):
- Iframe navigation timeout (username Enter → no navigation)
- Security questions error (missing labels, eval failure)
- DNA submit navigation timeout
- Unanswered security questions (early return)
- Post-password unexpected URL (error/DNA/security page instead of dashboard)
- Post-password URL evaluation failure

### Session Persistence

```javascript
async function loadSession() {
  const bucket = process.env.VPN_CONFIG_BUCKET;
  try {
    const resp = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: SESSION_STATE_KEY }));
    return JSON.parse(await resp.Body.transformToString());
  } catch (err) {
    if (err.name === "NoSuchKey" || err.name === "AccessDenied") return null;
    throw err;
  }
}

async function saveSession(page) {
  const bucket = process.env.VPN_CONFIG_BUCKET;
  const cookies = await page.cookies();
  const localStorage = await page.evaluate(() => {
    try { return JSON.parse(JSON.stringify(localStorage)); } catch { return {}; }
  });
  const state = { cookies, localStorage, updatedAt: new Date().toISOString(), origin: page.url() };
  await s3.send(new PutObjectCommand({
    Bucket: bucket, Key: SESSION_STATE_KEY,
    Body: JSON.stringify(state), ContentType: "application/json",
  }));
}
```

Both `NoSuchKey` and `AccessDenied` are treated as "no session" (S3 returns AccessDenied
when the object doesn't exist and the caller lacks ListBucket).

### Modal Closing

**File**: `handler.mjs:182-206` — `closeModal(page)`

Waits 1.5-2.5s for modal to appear, checks `#customModal.style.display !== "none"`,
then clicks **every** `#closeButton` element (handles potential duplicates via `querySelectorAll`).
Verifies the modal is closed afterward.

```javascript
async function closeModal(page) {
  await randomDelay(1500, 2500);
  const modalVisible = await page.evaluate(() => {
    const el = document.querySelector("#customModal");
    return el && el.style.display !== "none";
  });
  if (!modalVisible) { return false; }
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
  return !stillOpen;
}
```

### Account Statement Fetching

**File**: `handler.mjs:238-360` — `fetchStatements(page)`

After login, navigates to the account statement page, selects "Por Rango" (date range),
sets Desde to yesterday and Hasta to two days later in Venezuelan time (UTC-4),
clicks Consultar, verifies the transactions table by its headers, and extracts rows to JSON.

**Steps:**
1. Look for `table.GridViewHm a` — if found, click first account link (triggers ASP.NET postback)
2. If `#ctl00_cp_ddlPeriodo` already exists (e.g., from saved session), skip account click
3. Click `#ctl00_cp_rdbRango` radio — enables date inputs
4. Calculate dates in VET: `yesterday = today - 1`, `hasta = today + 2`
5. Clear and set `#ctl00_cp_dtFechaDesde` + `#ctl00_cp_dtFechaHasta` via `page.evaluate` (dispatch `input`/`change` events)
6. Click `#ctl00_cp_btnMostrar` (Consultar) — triggers postback
7. Verify `table.DefGV` has headers matching `["Fecha", "Descripción", "Referencia", "Monto", "D/C", "Saldo"]`
8. If table missing, check for "no movements" message → treat as success with empty array
9. Extract each row as `{ date, description, reference, amount, type, balance }`

Results are returned to the caller via a signed callback URL POST (not Telegram).

### Logout

**File**: `handler.mjs:332-352` — `performLogout(page)`

Finds `#ctl00_btnSalir` anchor and clicks it, then waits for navigation to
`salir.aspx`:

```javascript
async function performLogout(page) {
  const exists = await page.$("#ctl00_btnSalir");
  if (!exists) return { success: false, method: null, ... };
  await page.click("#ctl00_btnSalir");
  await page.waitForFunction(
    () => location.href.includes("salir.aspx"),
    { timeout: 15000, polling: 500 }
  );
  return { success: true, method: "#ctl00_btnSalir", ... };
}
```

### Human-like Typing

```javascript
async function typeSlowly(frame, selector, text) {
  await frame.click(selector);
  await randomDelay(200, 500);
  for (const char of text) {
    await frame.type(selector, char);
    await randomDelay(60, 160);
  }
}
```

### Iframe Discovery & Priority Input Finder

```javascript
async function discoverInputs(frame, label) {
  try {
    const inputs = await frame.evaluate(() =>
      Array.from(document.querySelectorAll("input, select, textarea, button")).map((el) => ({
        tag: el.tagName, type: el.type || null, id: el.id || null,
        name: el.name || null, visible: el.offsetParent !== null,
      }))
    );
    console.log(`[discover:${label}] ${inputs.length} elements`);
    return inputs;
  } catch (err) {
    console.log(`[discover:${label}] Failed: ${err.message}`);
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
  console.log(`[finder:${label}] No priority selector matched, falling back`);
  return fallback;
}
```

### Handler Structure

```javascript
export const handler = async (event) => {
  // SQS event unwrapping
  if (event.Records?.[0]?.eventSource === "aws:sqs") {
    event = JSON.parse(event.Records[0].body);
  }

  const profileName = event?.profileName;
  if (!profileName) {
    return { error: "Missing 'profileName' in event" };
  }

  // Decode WebPageCredentials (base64 JSON profile map)
  const encoded = process.env.WEB_PAGE_CREDENTIALS;
  const allCreds = JSON.parse(Buffer.from(encoded, "base64").toString());
  const creds = allCreds[profileName];

  const targetUrl = "https://www.banesconline.com/mantis/Website/Login.aspx";

  // 1. Start VPN
  const config = await getConfig();
  const { cleanup } = await startVpnProxy(config);
  try {
    await waitForPort(VPN_SOCKS_PORT);

    // 2. Launch Chromium with stealth
    const browser = await puppeteer.launch({
      args: [ ...chromium.args, '--no-sandbox', ... ],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
    try {
      // ... login flow ...

      // On success:
      const statementsResult = await fetchStatements(page);

      // Sign and POST results to callbackUrl
      if (statementsResult?.success && event.callbackUrl) {
        const callbackPayload = {
          success: true,
          profileName,
          transactions: statementsResult.transactions,
          transactionsCount: statementsResult.transactions.length,
        };
        const { body: callbackBody, headers } = prepareSignedCallback(callbackPayload);
        await fetch(event.callbackUrl, {
          method: "POST",
          headers,
          body: callbackBody,
        });
      }

      await performLogout(page);
    } finally { ... }
  } finally { cleanup(); }
};
```

### Login Flow Detail

**Selector priority chains:**

| Purpose | Priority selectors |
|---|---|
| Username | `#txtUsuario`, `input[name="txtUsuario"]` |
| Security question 1 label | `#lblPrimeraP` (SPAN, not INPUT) |
| Security question 2 label | `#lblSegundaP` (SPAN, not INPUT) |
| Security answer 1 | `#txtPrimeraR` |
| Security answer 2 | `#txtSegundaR` |
| Submit answers | `#bAceptar` |
| Password | `#txtClave`, `input[type="password"]`, `input[name="txtClave"]` |
| Modal container | `#customModal` |
| Modal close button | `#closeButton` (SPAN; all instances clicked) |
| Account list table | `table.GridViewHm` |
| Account link (first) | `table.GridViewHm a` |
| Filter table | `table.TDat` (contains all filter controls) |
| Period radio ("Del") | `#ctl00_cp_rdbPeriodo` |
| Period radio ("Por Rango") | `#ctl00_cp_rdbRango` |
| Date Desde | `#ctl00_cp_dtFechaDesde` (DD/MM/AAAA; disabled until radio clicked) |
| Date Hasta | `#ctl00_cp_dtFechaHasta` (DD/MM/AAAA; disabled until radio clicked) |
| Consultar button | `#ctl00_cp_btnMostrar` |
| Transactions table | `table.DefGV` (headers: Fecha, Descripción, Referencia, Monto, D/C, Saldo) |
| Logout link | `#ctl00_btnSalir` (navigates to `salir.aspx`) |

**Post-password flow — success vs error path:**

After password submit, the handler detects whether the dashboard was reached:

```
password → Enter
    │
    ▼
waitForFunction dashboard detection (25s)
    │
    ├── Failure (still on Login/DNA/error page)
    │       └── 🔴 sendScreenshot + iframe discovery + saveSession
    │       └── return { step: "dashboard-loaded" }
    │
    └── Success (iframe gone / clean URL)
            ├── closeModal() → #closeButton (if #customModal visible)
            ├── fetchStatements()
            │     ├── click first account link (table.GridViewHm a)
            │     │     or skip if #ctl00_cp_ddlPeriodo already present
            │     ├── click #ctl00_cp_rdbRango ("Por Rango")
            │     ├── set dates in VET: yesterday → #dtFechaDesde,
            │     │     today+2 → #dtFechaHasta
            │     ├── click #ctl00_cp_btnMostrar (Consultar)
            │     ├── verify table.DefGV headers match expected
            │     ├── extract rows → JSON
            │     └── signed POST { success, transactions } → callbackUrl
            ├── performLogout() → #ctl00_btnSalir → waitForFunction("salir.aspx")
            └── return { step: "logged-out" }
                 (session NOT saved — server-side session left intact)
```

**Dashboard detection after password submit:**
```javascript
await page.waitForFunction(() => {
  const frame = document.querySelector("#ctl00_cp_frmAplicacion");
  if (!frame) return true;            // iframe gone → top-level dashboard
  if (!frame.contentWindow) return false;
  const path = frame.contentWindow.location.pathname;
  return !["Login", "login", "DNA", "Contrase"].some(s => path.includes(s));
}, { timeout: 25000, polling: 1000 });
```

**Modal HTML structure:**
```html
<div id="customModal" class="modal" style="display: flex;">
  <div class="modal-content" style="border-radius: 10px;">
    <span id="closeButton" class="close-modal-home">×</span>
    <img id="modalImage" src="../../Images/FichaComplementaria/Modal_informativo.png">
    <div class="modal-buttons">
      <button type="button" id="actionButton">Comenzar</button>
    </div>
  </div>
</div>
```

**Logout link structure:**
```html
<a id="ctl00_btnSalir" class="icon-salida" href="salir.aspx"
   style="color:#007953;font-size:32px;text-decoration: none;"></a>
```

**Account link (inside GridViewHm table):**
```html
<a href="javascript:__doPostBack('ctl00$cp$gvCtas','select$0')">0134-0984-66-0001005359</a>
```

**Statement filter table (`table.TDat`):**
```html
<table class="TDat">
  <tr>
    <td>
      <span class="DefRdo">
        <input id="ctl00_cp_rdbPeriodo" type="radio" name="ctl00$cp$TipoConsulta"
               value="rdbPeriodo" checked="checked"
               onclick="ActivarValidarFechas();">
        <label for="ctl00_cp_rdbPeriodo">Del</label>
      </span>
    </td>
    <td colspan="4">
      <select name="ctl00$cp$ddlPeriodo" id="ctl00_cp_ddlPeriodo" class="DefDdl"
              onchange="ActivarValidarFechas();">
        <option value="PeriodoDia">Día</option>
        <option value="PeriodoDiaAnterior">Día Anterior</option>
        <option value="PeriodoMes">Mes</option>
        <option value="PeriodoMesAnterior">Mes Anterior</option>
      </select>
    </td>
  </tr>
  <tr>
    <td class="NoBr">
      <span class="DefRdo">
        <input id="ctl00_cp_rdbRango" type="radio" name="ctl00$cp$TipoConsulta"
               value="rdbRango" onclick="ActivarValidarFechas();">
        <label for="ctl00_cp_rdbRango">Por Rango</label>
      </span>
    </td>
    <td class="NoBr">Desde:</td>
    <td class="NoBr">
      <input name="ctl00$cp$dtFechaDesde" type="text" value="29/06/2026"
             maxlength="10" id="ctl00_cp_dtFechaDesde" class="DefCld"
             onkeypress="return caracterParaFecha(this, event);" disabled="">
    </td>
    <td class="NoBr">Hasta:</td>
    <td class="NoBr">
      <input name="ctl00$cp$dtFechaHasta" type="text" value="29/06/2026"
             maxlength="10" id="ctl00_cp_dtFechaHasta" class="DefCld"
             onkeypress="return caracterParaFecha(this, event);" disabled="">
    </td>
  </tr>
  <tr>
    <td colspan="5" class="NoBr Cent">
      <input type="submit" name="ctl00$cp$btnMostrar" value="Consultar"
             id="ctl00_cp_btnMostrar" class="DefBtn">
    </td>
  </tr>
</table>
```

**Venezuelan timezone calculation:**
```javascript
function getVenezuelanDateString(offsetDays) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  const vetDate = new Date(`${year}-${month}-${day}T00:00:00-04:00`);
  vetDate.setDate(vetDate.getDate() + offsetDays);
  return `${pad(vetDate.getDate())}/${pad(vetDate.getMonth()+1)}/${vetDate.getFullYear()}`;
}
// Used as: getVenezuelanDateString(-1) → yesterday, getVenezuelanDateString(2) → two days later
```

**Transactions table (DefGV) — each row extracted to JSON:**
```
Fecha, Descripción, Referencia, Monto, D/C, Saldo
```

---

## Dockerfile

**File**: `packages/ip-scraper/Dockerfile`

Multi-stage build:

```dockerfile
FROM golang:alpine AS go-builder
RUN apk add --no-cache git
RUN git clone https://github.com/n0madic/go-openvpn.git /build && \
    cd /build/cmd/openvpn2socks && \
    go mod download && \
    CGO_ENABLED=0 go build -o /usr/local/bin/openvpn2socks .

FROM public.ecr.aws/lambda/nodejs:22
RUN dnf install -y nss nspr atk cups-libs libXcomposite libXcursor \
    libXdamage libXext libXi libXrandr libXrender libXtst pango cairo \
    gdk-pixbuf2 && dnf clean all

COPY --from=go-builder /usr/local/bin/openvpn2socks /usr/local/bin/openvpn2socks
COPY package.json ./
RUN npm install --omit=dev
COPY src/ ./src/
CMD [ "src/handler.handler" ]
```

**Chromium system dependencies**: Installed via `dnf` (not `apt`) because the base image
is `public.ecr.aws/lambda/nodejs:22` (Amazon Linux 2023, Fedora-based).

---

## Infrastructure

**File**: `infra/ip-scraper.ts`

Defined as a Pulumi program within SST v4. Resources:

### S3 config bucket
Stores the decoded `.ovpn` config and session state.

### ECR repository + Docker image
Built with `@pulumi/docker-build`. Tagged `ip-scraper-<stage>:latest`.
Platform: `linux/amd64`.

### IAM role
`AWSLambdaBasicExecutionRole` managed policy + two inline policies:
- **S3 access**: `s3:GetObject`, `s3:PutObject` on the config bucket
- **SQS access**: `sqs:ReceiveMessage`, `sqs:DeleteMessage`, `sqs:GetQueueAttributes` on the queue

### Lambda function
Container image, 2048 MB memory, 60s timeout, 1024 MB ephemeral storage.

**Environment variables:**

| Variable | Source | Purpose |
|---|---|---|
| `VPN_CONFIG_BUCKET` | auto | S3 bucket holding the .ovpn file |
| `VPN_CONFIG_KEY` | auto | S3 key for the .ovpn file |
| `OPENVPN_USERNAME` | `ProtonVpnUsername` secret | VPN auth |
| `OPENVPN_PASSWORD` | `ProtonVpnPassword` secret | VPN auth |
| `WEB_PAGE_CREDENTIALS` | `WebPageCredentials` secret | Base64 JSON profile map |
| `TELEGRAM_BOT_TOKEN` | `TelegramBotToken` secret | Bot token for error screenshots only |
| `TELEGRAM_CHAT_ID` | `TelegramChatId` secret | Chat to receive error screenshots |
| `CFF_HMAC_SECRET_HEX` | `StatementCallbackHmacSecret` secret | 64-character hex callback-signing key |
| `SESSION_STATE_KEY` | hardcoded | `session-state.json` |

### FIFO Queue + Event Source Mapping
`StatementsScraperQueue` (FIFO, content-based dedup, 3min visibility timeout) with a DLQ.
`EventSourceMapping` wires the queue to the scraper Lambda. `MessageGroupId: profileName`
ensures sequential execution per profile.

### Submit function
`sst.aws.Function` with Function URL, API key validation via `x-api-header`. Enqueues
`{ profileName, callbackUrl }` to the FIFO queue.

---

## Secrets Management

Eight SST secrets:

| Secret | Content | How it's used                                                                           |
|---|---|-----------------------------------------------------------------------------------------|
| `ProtonVpnConfig` | Base64 `.ovpn` profile | Decoded → S3 → Lambda fetches at cold start                                             |
| `ProtonVpnUsername` | OpenVPN auth username | `OPENVPN_USERNAME` env var → `OVPN_USER` to openvpn2socks                               |
| `ProtonVpnPassword` | OpenVPN auth password | `OPENVPN_PASSWORD` env var → `OVPN_PASS` to openvpn2socks                               |
| `WebPageCredentials` | Base64 JSON profile map | Decoded → parsed → lookup by `event.profileName` (returns `{ step: "profile-not-found" }` if missing) |
| `TelegramBotToken` | Telegram bot API token | Initializes `node-telegram-bot-api` for screenshots                                     |
| `TelegramChatId` | Numeric Telegram chat ID | Destination for error screenshot messages                                                   |
| `StatementsScraperApiKey` | API key string | Validates submit-scraper requests via `x-api-key` header                                  |
| `StatementCallbackHmacSecret` | 64 hexadecimal characters encoding 32 random bytes | Injected as `CFF_HMAC_SECRET_HEX` and used only to sign statement callbacks |

**Credentials JSON structure:**

```json
{
  "key1": {
    "username": "user",
    "password": "secret",
    "security_questions": {
      "question1": "answer1",
      "question2": "answer2",
      "question3": "answer3"
    }
  }
}
```

Set per stage:
```bash
bunx sst secret set --stage production WebPageCredentials "$(base64 -w0 creds.json)"
bunx sst secret set --stage production TelegramBotToken "87707...:AAEoRJ..."
bunx sst secret set --stage production TelegramChatId "some chat id number"
bunx sst secret set --stage production \
  StatementCallbackHmacSecret "$(openssl rand -hex 32)"
```

---

## Deployment

```bash
bunx sst deploy --stage production
```

Outputs:
```
IpScraperFunctionName: IpScraper-<suffix>
StatementsScraperQueueUrl: https://sqs.us-east-1.amazonaws.com/<account>/<queue>.fifo
SubmitScraperUrl: https://<id>.lambda-url.us-east-1.on.aws/
```

---

## Usage

### Submit a scraping job

```bash
curl -X POST "$(bunx sst get --stage production SubmitScraperUrl)" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $(bunx sst secret get --stage production StatementsScraperApiKey)" \
  -d '{"profileName":"Betsa","callbackUrl":"https://your-callback.example.com/hook"}'
```

The submit endpoint returns `{ "success": true }` immediately. The scraper processes
the job asynchronously and sends the result by signed POST to `callbackUrl`.

### Callback payload (success)

```json
{
  "success": true,
  "profileName": "Betsa",
  "transactions": [
    { "date": "28/06/2026", "description": "...", "reference": "...", "amount": "1.234,56", "type": "C", "balance": "9.876,54" }
  ],
  "transactionsCount": 1
}
```

### Callback payload (no transactions)

```json
{
  "success": true,
  "profileName": "Betsa",
  "transactions": [],
  "transactionsCount": 0
}
```

Successful callbacks include these headers:

```http
Content-Type: application/json
x-cff-timestamp: <unix-seconds>
x-cff-event-id: <uuidv7>
x-cff-signature: v1=<64-lowercase-hex-characters>
```

The body is serialized once, signed as exact UTF-8 bytes, and sent as the same Node.js `Buffer`. See the authoritative [HMAC Callback Protocol and Implementation Specification](hmac-callback-spec.md) for the complete wire contract, receiver requirements, secret rotation, and replay semantics. The scraper sends callbacks only for successful statement extraction.

### Direct Lambda invocation (for debugging)

```bash
aws lambda invoke --function-name IpScraper-<suffix> \
  --payload '{"profileName":"Betsa","callbackUrl":"https://..."}' out.json
```

**Response fields (Lambda return — not callback):**

| Field | Description |
|---|---|
| `step` | `dashboard-loaded`, `logged-out`, `logout-attempted`, `security-questions-incomplete`, `profile-not-found`, or error |
| `profileName` | Profile used for the run |
| `dashboardUrl` | Final URL after password (e.g. `/Mantis/WebSite/Default.aspx`) |
| `passwordPostUrl` | Iframe URL after password submit |
| `questionsAnswered` | Array of security questions answered |
| `unansweredQuestions` | Array of questions not in credentials |
| `modalClosed` | Whether a modal was detected and closed |
| `statementsFetched` | Whether account statements were successfully fetched |
| `statementsReason` | Reason if fetching failed (`"no-account-or-period-page"`, `"account-navigation-timeout"`, `"consult-navigation-timeout"`, `"no-transaction-table"`) |
| `transactionsCount` | Number of transaction rows extracted |
| `logoutMethod` | Selector used for logout (e.g. `#ctl00_btnSalir`) |
| `logoutUrl` | Final URL after logout (e.g. `salir.aspx`) |

**Telegram messages (error/debug only):**

| Emoji | Trigger |
|---|---|
| 🔴 | Iframe navigation timeout |
| 🔴 | Unexpected DNA layout |
| 🔴 | Security questions error |
| 🔴 | Unanswered security questions (early return) |
| 🔴 | DNA submit navigation timeout |
| 🔴 | Post-password unexpected/unknown page |

---

## Performance

Measured from a warm container (Lambda RIE, x86_64):

| Phase | Time |
|---|---|
| VPN connection (openvpn2socks handshake) | ~1.3s |
| Chromium launch + stealth init | ~1.5s |
| Page navigation + login flow | ~3-5s |
| Dashboard detection | ~2s (post-password redirect) |
| Modal close + logout | ~2-4s (modal wait + salir.aspx nav) |
| Cleanup | ~0.3s |
| **Total warm invoke** | **~12-24s** |

Lambda timeout: 60s (allows for cold start + VPN failover + 25s dashboard detection).

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| VPN credentials in env vars | SST secrets encrypted at rest via KMS |
| Proton VPN IP-only remotes | `-allow-no-server-identity` skips hostname verification; CA cert validates TLS |
| Go binary adds ~15MB | Static compile (CGO_ENABLED=0); no runtime deps |
| Chromium memory (~300 MB) | 2048 MB Lambda allocation provides headroom |
| openvpn2socks subprocess orphaning | SIGTERM → SIGKILL after 3s; Lambda kills children on sandbox teardown |
| Iframe navigation races | `waitForFunction` with 1s polling; error-tolerant `discoverInputs` |
| Unknown security questions | Early return before password; Telegram screenshot with page text |
| Post-login modal blocking navigation | `closeModal()` waits 1.5-2.5s for appearance, clicks all `#closeButton` elements |
| ASP.NET postback navigation timeout | 20s timeout on account link and Consultar `waitForNavigation` |
| No account table on dashboard | `fetchStatements()` checks for `#ctl00_cp_ddlPeriodo` fallback; returns `{ success: false }` |
| Transactions table headers mismatch | `fetchStatements()` returns `{ success: false, reason: "no-transaction-table" }` |
| FIFO queue visibility timeout | 3min covers total ~24s warm invoke; DLQ catches messages after 3 retries |
| Concurrent invocations for same profile | FIFO + MessageGroupId guarantees serial processing per profile |
| Callback signing secret missing or invalid | Callback preparation fails closed; logout and browser cleanup run, then the Lambda invocation fails so SQS retries; no unsigned request is sent |
| Callback URL unreachable or callback returns an error status | Network and non-2xx failures are logged without the callback URL, cleanup runs, and the Lambda invocation fails so SQS retries and eventually uses the DLQ |
| Logout link not found | `performLogout()` returns `{ success: false }` without failing the handler |
| Logout navigation timeout | 15s timeout on `waitForFunction("salir.aspx")`; returns partial result |
| Session cookies expire server-side | Fresh login generates new cookies; old session gracefully handled |
| Bank detects automation | `puppeteer-extra-plugin-stealth` + `--lang=es` + human-like typing delays |
| No VPC → default internet access | Desired — needs public internet for VPN + target URL |
