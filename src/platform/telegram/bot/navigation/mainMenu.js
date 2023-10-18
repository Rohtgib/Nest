const { loginMenu } = require("./loginMenu.js");
const { registerMenu } = require("./registerMenu.js");

function mainMenu(ctx, bot) {
  let greetMessage = `ShopSage's Telegram bot integration`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Login",
            callback_data: "loginMenu",
          },
          {
            text: "Register",
            callback_data: "registerMenu",
          },
        ],
      ],
    },
  });
  bot.action("loginMenu", (ctx) => {
    loginMenu(ctx, bot, mainMenu);
  });

  bot.action("registerMenu", (ctx) => {
    registerMenu(ctx, bot, mainMenu);
  });
}

module.exports = {
  mainMenu,
};
