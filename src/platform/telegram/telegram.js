const express = require("express");
const expressApp = express();
const path = require("path");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
const { Telegraf, Markup, Scenes, session } = require("telegraf"); // Use 'session' from 'telegraf'

// Create a stage to manage scenes
const stage = new Scenes.Stage();

// Create a new Telegraf bot instance
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Import your main menu function
const { mainMenu } = require("./navigation/mainMenu");

// Set up your command handler
bot.command("start", (ctx) => {
  console.log(ctx.from);
  mainMenu(ctx, bot);
});

bot.command("echo", (ctx) => {
  // Split the text message sent by the user
  const message = ctx.message.text.split(" ");
  // Remove the first element from array
  message.shift();

  ctx.reply(message.join(" "));
});

console.log(`Telegram bot running on port ${port}`);

// Use the 'session' middleware to manage user sessions
bot.use(session());

// Add the 'stage' middleware to the bot
bot.use(stage.middleware());

bot.launch();
