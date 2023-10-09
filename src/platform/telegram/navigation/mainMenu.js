const { loginTelegram } = require("./loginMenu");
const { registerTelegram } = require("./registerMenu");

function mainMenu(ctx, bot) {
  console.log(ctx.from);
  let greetMessage = `Hola! Soy ShopSage, tu solucion para ecommerce confiable y facil de usar`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Iniciar sesion",
            callback_data: "login",
          },
          {
            text: "Registrarse",
            callback_data: "register",
          },
        ],
      ],
    },
  });
  bot.action("login", (ctx) => {
    loginTelegram(ctx, bot);
  });

  bot.action("register", (ctx) => {
    registerTelegram(ctx, bot);
  });
}

module.exports = {
  initializeBot: mainMenu,
};
