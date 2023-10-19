const { userRegister } = require("../../../../logic/userAuthentication");

function registerMenu(ctx, bot, mainMenu) {
  let greetMessage = `Create a ShopSage account: /register [email] [phone] [password]`;
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
  bot.command("register", async (ctx) => {
    const input = ctx.message.text.split(" ");
    input.shift();

    if (input.length === 3) {
      const emailAddress = input[0];
      const phoneNumber = input[1];
      const password = input[2];
      const registerResult = await userRegister(
        emailAddress,
        phoneNumber,
        password
      );
      console.log(registerResult);
      if (registerResult) {
        ctx.deleteMessage();
        ctx.reply("Register successful, welcome to ShopSage!");
      } else {
        ctx.reply(
          "Couldn't register your user in ShopSage, make sure the email or phone supplied is not being used"
        );
      }
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
