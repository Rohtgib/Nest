const { postUser } = require("../logic/register.js");

function registerMenu(ctx, bot, mainMenu) {
  let greetMessage = `Registro - ShopSage`;
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
    var registerState = true;
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Para registrate necesitas insertar tu email, un numero de telefono y una contraseña, escribe cada una en un solo mensaje, separando cada informacion solicitada por un espacio [miemail minumero micontraseña]"
    );
    bot.on("text", (ctx) => {
      const inputs = ctx.message.text.split(" ");
      if (registerState == true) {
        if (inputs.length === 3) {
          const emailAddress = inputs[0];
          const phoneNumber = inputs[1];
          const password = inputs[2];
          postUser(emailAddress, phoneNumber, password);
          ctx.reply("Te has registrado correctamente, bienvenido a ShopSage!");
          registerState = false;
          ctx.deleteMessage();

          //            mainMenu(ctx, bot);
        } else {
          ctx.reply(
            "Favor inserta los datos solicitados en este formato y sin corchetes [miemail minumero micontraseña]"
          );
        }
      }
    });
  });

  bot.action("back", (ctx) => {
    ctx.deleteMessage();

    mainMenu(ctx, bot);
  });
}

module.exports = {
  registerMenu,
};
