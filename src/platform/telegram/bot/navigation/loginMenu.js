const { validateUser } = require("../../logic/login.js");
const { dashboardMenu } = require("./dashboardMenu.js");
function loginMenu(ctx, bot, mainMenu) {
  let greetMessage = `Login to an existing ShopSage account: /login [phone] [password]`;
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

  bot.command("login", async (ctx) => {
    const input = ctx.message.text.split(" ");
    input.shift();
    if (input.length === 2) {
      const phoneNumber = input[0];
      const password = input[1];
      const isValidUser = await validateUser(phoneNumber, password);
      if (isValidUser != false) {
        ctx.deleteMessage();
        dashboardMenu(ctx, bot, isValidUser, mainMenu);
      } else {
        ctx.reply(
          "This user doesn't exist or you provided incorrect credentials, please try again."
        );
      }
      //ctx.reply("Phone number and password received.");
    } else {
      ctx.reply("Please use the command as shown: /login [phone] [password]");
    }
  });

  bot.action("mainMenu", (ctx) => {
    mainMenu(ctx, bot);
  });
}

module.exports = {
  loginMenu,
};
