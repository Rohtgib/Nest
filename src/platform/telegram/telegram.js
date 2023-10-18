const express = require("express");
const expressApp = express();
const path = require("path");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
const { Telegraf, Markup, Scenes, session } = require("telegraf");

const stage = new Scenes.Stage();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const { mainMenu } = require("./bot/navigation/mainMenu");

bot.command("start", (ctx) => {
  console.log(ctx.from);
  mainMenu(ctx, bot);
});

bot.command("echo", (ctx) => {
  const message = ctx.message.text.split(" ");
  message.shift();

  ctx.reply(message.join(" "));
});

console.log(`Telegram bot running on port ${port}`);

bot.use(session());

bot.use(stage.middleware());

bot.launch();
