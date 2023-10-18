const { userRegister } = require("../../../../logic/userAuthentication");

function registerMenu(ctx, bot, mainMenu) {
  let greetMessage = `Create a ShopSage account: /register [email] [phone] [password]`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Go back",
            callback_data: "mainMenu",
          },
        ],
      ],
    },
  });
  bot.command("register", (ctx) => {
    const input = ctx.message.text.split(" ");
    input.shift();

    if (input.length === 3) {
      const emailAddress = input[0];
      const phoneNumber = input[1];
      const password = input[2];
      userRegister(emailAddress, phoneNumber, password);
      ctx.reply("Register successful, welcome to ShopSage!");
      ctx.deleteMessage();
    } else {
      ctx.reply(
        "Please use the command as shown: /register [email] [phone] [password]"
      );
    }
  });

  bot.action("mainMenu", (ctx) => {
    mainMenu(ctx, bot);
  });
}

module.exports = {
  registerMenu,
};
