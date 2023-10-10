function productsMenu(ctx, bot, userID, dashboardMenu) {
  let greetMessage = `Vista general de productos de usuario`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Ver mis productos disponibles",
            callback_data: "availableProducts",
          },
          {
            text: "Editar producto",
            callback_data: "editProduct",
          },
          {
            text: "Agregar producto",
            callback_data: "addProduct",
          },
          {
            text: "Atras",
            callback_data: "backtoDashboard",
          },
        ],
      ],
    },
  });

  bot.action("availableProducts", (ctx) => {
    ctx.reply("Mostrar todos los productos disponibles");
  });

  bot.action("editProduct", (ctx) => {
    ctx.reply("Menu para edicion de productos");
  });

  bot.action("addProduct", (ctx) => {
    ctx.reply("Menu para insercion de productos");
  });

  bot.action("backtoDashboard", (ctx) => {
    ctx.deleteMessage();
    dashboardMenu(ctx, bot, userID);
  });
}

module.exports = {
  productsMenu,
};
