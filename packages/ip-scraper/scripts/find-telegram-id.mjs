import TelegramBot from "node-telegram-bot-api";

const token = process.argv[2];
if (!token) {
  console.error("Usage: node find-telegram-id.mjs <TELEGRAM_BOT_TOKEN>");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: false });

try {
  const updates = await bot.getUpdates();
  if (updates.length === 0) {
    console.log("No updates found. Send a message to your bot first (e.g. /start), then re-run.");
    process.exit(0);
  }
  const latest = updates[updates.length - 1];
  const chat = latest.message?.chat || latest.callback_query?.message?.chat;
  if (!chat) {
    console.log("Could not find a chat in the latest update.");
    console.log("Full update:", JSON.stringify(latest, null, 2));
    process.exit(1);
  }
  console.log(`Chat ID: ${chat.id}`);
  console.log(`Chat type: ${chat.type}`);
  console.log(`Chat title/name: ${chat.title || chat.first_name || "N/A"}`);
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
