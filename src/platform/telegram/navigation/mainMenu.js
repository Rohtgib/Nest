const { loginMenu } = require("./loginMenu.js");
const { registerMenu } = require("./registerMenu.js");

function mainMenu(ctx, bot) {
  let greetMessage = `Hola! Soy ShopSage, tu solucion para ecommerce confiable y facil de usar`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Iniciar sesion",
            callback_data: "loginMenu",
          },
          {
            text: "Registrarse",
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
