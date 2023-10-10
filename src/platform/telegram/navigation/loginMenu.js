const { validateUser } = require("../logic/login.js");
const { dashboardMenu } = require("./dashboardMenu.js");
function loginMenu(ctx, bot, mainMenu) {
  let conditionToStopHearingMessages;
  let greetMessage = `Ejecuta el comando /login junto a tu numero de telefono y clave para iniciar sesion en ShopSage`;
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

  bot.command("login", async (ctx) => {
    conditionToStopHearingMessages = false;
    const input = ctx.message.text.split(" ");
    input.shift();
    if (!conditionToStopHearingMessages) {
      if (input.length === 2) {
        const phoneNumber = input[0];
        const password = input[1];
        const isValidUser = await validateUser(phoneNumber, password);
        if (isValidUser != false) {
          ctx.deleteMessage();
          conditionToStopEaringMessages = true;
          dashboardMenu(ctx, bot, isValidUser, mainMenu);
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
