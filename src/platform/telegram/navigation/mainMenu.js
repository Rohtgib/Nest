const { postUser } = require("../logic/register.js");

function mainMenu(ctx, bot) {
  console.log(ctx.from);
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
    loginTelegram(ctx, bot);
  });

  bot.action("registerMenu", (ctx) => {
    registerTelegram(ctx, bot);
  });
}

function loginTelegram(ctx, bot) {
  console.log(ctx.from);
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
    bot.on("text", (ctx) => {
      const phrases = ctx.message.text.split(" ");
      if (loginState == true) {
        if (phrases.length === 2) {
          const phoneNumber = phrases[0];
          const password = phrases[1];

          // You can now work with phoneNumber and password as needed
          console.log("Phone Number:", phoneNumber);
          console.log("Password:", password);

          // Reply with a confirmation message
          ctx.reply("Phone number and password received.");
          loginState = false;
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
    mainMenu(ctx, bot);
  });
}

function registerTelegram(ctx, bot) {
  console.log(ctx.from);
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
    mainMenu(ctx, bot);
  });
}

module.exports = {
  mainMenu,
};
