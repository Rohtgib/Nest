const { loginMenu } = require("./loginMenu.js");
const { registerMenu } = require("./registerMenu.js");

function mainMenu(ctx, bot) {
  let greetMessage = `Hola! Soy ShopSage, tu solucion para ecommerce confiable y facil de usar`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Iniciar sesion",
            callback_data: "loginMenu",
          },
          {
            text: "Registrarse",
            callback_data: "registerMenu",
          },
        ],
      ],
    },
  });
  bot.action("loginMenu", (ctx) => {
    loginMenu(ctx, bot);
  });

  bot.action("registerMenu", (ctx) => {
    registerMenu(ctx, bot);
  });
}

module.exports = {
  mainMenu,
};

// const fs = require("fs");
// const path = require("path");
// const sourceFilePath = path.join(__dirname, "dashboardMenu.js");

// try {
//   // Read the contents of the source file
//   const sourceFileContents = fs.readFileSync(sourceFilePath, "utf8");

//   // Evaluate the contents as JavaScript code within the current context
//   eval(sourceFileContents);

//   console.log(`Appended ${sourceFilePath} temporarily.`);
// } catch (error) {
//   console.error(`Error reading or executing ${sourceFilePath}:`, error);
// }
