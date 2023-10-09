const { mainMenu } = require("./mainMenu");

function registerTelegram(ctx, bot) {
  console.log(ctx.from);
  let greetMessage = `Bienvenido a ShopSage`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Registrarse",
            callback_data: "register",
          },
          {
            text: "Atras",
            callback_data: "back",
          },
        ],
      ],
    },
  });
  bot.action("register", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Logica de registro");
  });

  bot.action("back", (ctx) => {
    mainMenu(ctx, bot);
  });
}

module.exports = {
  registerTelegram,
};
