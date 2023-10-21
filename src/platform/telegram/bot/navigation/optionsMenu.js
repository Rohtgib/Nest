function optionsMenu(ctx, bot, userID, dashboardMenu) {
  user = userID;
  let greetMessage = `Opciones`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Change email",
            callback_data: "editEmail",
          },
          {
            text: "Change phone number",
            callback_data: "editNumber",
          },
          {
            text: "Change password",
            callback_data: "editPassword",
          },
          {
            text: "Go back",
            callback_data: "backtoDashboard",
          },
        ],
      ],
    },
  });
}
