const { catalogMenu } = require("./catalogMenu.js");
const { productsMenu } = require("./productsMenu.js");

function dashboardMenu(ctx, bot, userID, mainMenu) {
  user = userID;
  let greetMessage = `Welcome back to ShopSage!`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Catalog",
            callback_data: "catalogMenu",
          },
          {
            text: "My products",
            callback_data: "productsMenu",
          },
          {
            text: "Log out",
            callback_data: "mainMenu",
          },
        ],
      ],
    },
  });
  bot.action("catalogMenu", (ctx) => {
    catalogMenu(ctx, bot, user, dashboardMenu);
  });

  bot.action("productsMenu", (ctx) => {
    productsMenu(ctx, bot, user, dashboardMenu);
  });

  bot.action("optionsMenu", (ctx) => {
    ctx.reply("Logica de opciones");
  });
}

module.exports = {
  dashboardMenu,
};
