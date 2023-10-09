const { mainMenu } = require("./mainMenu");

function loginTelegram(ctx, bot) {
  console.log(ctx.from);
  let greetMessage = `Bienvenido a ShopSage`;
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
            text: "Olvide mi contraseña",
            callback_data: "forgot_password",
          },
          {
            text: "Atras",
            callback_data: "back",
          },
        ],
      ],
    },
  });
  bot.action("login", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Logica de login");
  });

  bot.action("forgot_password", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Logica de recuperacion de password");
  });

  bot.action("back", (ctx) => {
    mainMenu(ctx, bot);
  });
}

module.exports = {
  loginTelegram,
};
