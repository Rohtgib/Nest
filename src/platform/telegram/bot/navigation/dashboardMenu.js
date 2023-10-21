const { catalogMenu } = require("./catalogMenu.js");
const { productsMenu } = require("./productsMenu.js");
const { optionsMenu } = require("./optionsMenu.js");

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
            text: "Options",
            callback_data: "optionsMenu",
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
    dashboardMenu(ctx, bot, user, dashboardMenu);
  });
}

module.exports = {
  dashboardMenu,
};
