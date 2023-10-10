const { postUser } = require("../logic/register.js");
const { validateUser } = require("../logic/login.js");

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

function loginMenu(ctx, bot) {
  let greetMessage = `Bienvenido a ShopSage`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Iniciar sesion",
            callback_data: "login",
          },
          {
            text: "Olvide mi contraseña",
            callback_data: "forgot_password",
          },
          {
            text: "Atras",
            callback_data: "back",
          },
        ],
      ],
    },
  });
  bot.action("login", (ctx) => {
    var loginState = true;
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Envia tu numero y contraseña en un solo mensaje, separado por un espacio [minumero micontraseña]"
    );
    bot.on("text", async (ctx) => {
      const phrases = ctx.message.text.split(" ");
      if (loginState == true) {
        if (phrases.length === 2) {
          const phoneNumber = phrases[0];
          const password = phrases[1];

          const isValidUser = await validateUser(phoneNumber, password); // Use await here
          if (isValidUser) {
            loginState = false;
            ctx.deleteMessage();
            dashboardMenu(ctx, bot);
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
  });

  bot.action("forgot_password", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Logica de recuperacion de password");
  });

  bot.action("back", (ctx) => {
    ctx.deleteMessage();
    mainMenu(ctx, bot);
  });
}

function registerMenu(ctx, bot) {
  let greetMessage = `Bienvenido a ShopSage`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Registrarse",
            callback_data: "register",
          },
          {
            text: "Atras",
            callback_data: "back",
          },
        ],
      ],
    },
  });
  bot.action("register", (ctx) => {
    var registerState = true;
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Para registrate necesitas insertar tu email, un numero de telefono y una contraseña, escribe cada una en un solo mensaje, separando cada informacion solicitada por un espacio [miemail minumero micontraseña]"
    );
    bot.on("text", (ctx) => {
      const inputs = ctx.message.text.split(" ");
      if (registerState == true) {
        if (inputs.length === 3) {
          const emailAddress = inputs[0];
          const phoneNumber = inputs[1];
          const password = inputs[2];
          postUser(emailAddress, phoneNumber, password);
          ctx.reply("Te has registrado correctamente, bienvenido a ShopSage!");
          registerState = false;
          ctx.deleteMessage();

          mainMenu(ctx, bot);
        } else {
          ctx.reply(
            "Favor inserta los datos solicitados en este formato y sin corchetes [miemail minumero micontraseña]"
          );
        }
      }
    });
  });

  bot.action("back", (ctx) => {
    ctx.deleteMessage();

    mainMenu(ctx, bot);
  });
}

function dashboardMenu(ctx, bot) {
  let greetMessage = `Bienvenido de vuelta!`;
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
    ctx.reply("Logica de mis productos");
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
