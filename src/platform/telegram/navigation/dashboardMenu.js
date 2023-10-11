const { productsMenu } = require("./productsMenu.js");

function dashboardMenu(ctx, bot, userID, mainMenu) {
  user = userID;
  let greetMessage = `Bienvenido de vuelta a ShopSage`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Buscar",
            callback_data: "browseMenu",
          },
          {
            text: "Mis productos",
            callback_data: "productsMenu",
          },
          {
            text: "Opciones",
            callback_data: "optionsMenu",
          },
          {
            text: "Salir",
            callback_data: "logout",
          },
        ],
      ],
    },
  });
  bot.action("browseMenu", (ctx) => {
    ctx.reply("Logica de catalogo");
  });

  bot.action("productsMenu", (ctx) => {
    productsMenu(ctx, bot, user, dashboardMenu);
  });

  bot.action("optionsMenu", (ctx) => {
    ctx.reply("Logica de opciones");
  });

  bot.action("logout", (ctx) => {
    ctx.deleteMessage();
    mainMenu(ctx, bot);
  });
}

module.exports = {
  dashboardMenu,
};
