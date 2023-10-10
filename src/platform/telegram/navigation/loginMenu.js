const { validateUser } = require("../logic/login.js");

function loginMenu(ctx, bot, mainMenu) {
  let greetMessage = `Inicio de sesion - ShopSage`;
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
    var loginState = true;
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Envia tu numero y contraseña en un solo mensaje, separado por un espacio [minumero micontraseña]"
    );
    bot.on("text", async (ctx) => {
      const phrases = ctx.message.text.split(" ");
      if (loginState == true) {
        if (phrases.length === 2) {
          const phoneNumber = phrases[0];
          const password = phrases[1];

          const isValidUser = await validateUser(phoneNumber, password);
          console.log(isValidUser) // Use await here
          if (isValidUser != false) {
            loginState = false;
            ctx.deleteMessage();
            dashboardMenu(ctx, bot);
          } else {
            ctx.reply(
              "Este usuario no existe o hay credenciales invalidas, intenta de nuevo"
            );
          }
          //ctx.reply("Phone number and password received.");
        } else {
          ctx.reply(
            "Favor envia tu numero y contraseña en un solo mensaje, separado por un espacio [minumero micontraseña]"
          );
        }
      }
    });
  });

  bot.action("forgot_password", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Logica de recuperacion de password");
  });

  bot.action("back", (ctx) => {
    ctx.deleteMessage();
    mainMenu(ctx, bot);
  });
}

module.exports = {
  loginMenu,
};
