const express = require("express");
const expressApp = express();
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());

const { Telegraf } = require("telegraf");
const { mainMenu } = require("./navigation/mainMenu");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

bot.command("start", (ctx) => {
  console.log(ctx.from);
  mainMenu(ctx, bot);
});

bot.launch();
