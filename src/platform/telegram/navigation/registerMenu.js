const { postUser } = require("../logic/register.js");

function registerMenu(ctx, bot, mainMenu) {
  let greetMessage = `Ejecuta el comando /register junto a tu correo electronico, numero de telefono y clave para registrarte en ShopSage`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Atras",
            callback_data: "back",
          },
        ],
      ],
    },
  });
  bot.command("register", (ctx) => {
    var registerState = true;
    const input = ctx.message.text.split(" ");
    input.shift();
    if (registerState == true) {
      if (input.length === 3) {
        const emailAddress = input[0];
        const phoneNumber = input[1];
        const password = input[2];
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

  bot.action("back", (ctx) => {
    ctx.deleteMessage();

    mainMenu(ctx, bot);
  });
}

module.exports = {
  registerMenu,
};
