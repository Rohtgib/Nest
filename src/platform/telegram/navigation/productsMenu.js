const { postProduct } = require("../logic/addProduct.js");
const {
  getProductsbyName,
  getProductsbyUser,
} = require("../logic/getProducts.js");

function productsMenu(ctx, bot, userID, dashboardMenu) {
  let conditionToStopHearingMessages;
  user = userID;
  let greetMessage = `Vista general de productos de usuario ${user}`;
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

  bot.action("availableProducts", async (ctx) => {
    let availableProductsString = "";
    var myAvailableProducts = await getProductsbyUser(user);
    if (myAvailableProducts.products.length === 0) {
      ctx.reply(
        "No tienes productos disponibles en tu inventario, agregalos y empieza comerciar"
      );
    } else {
      for (let i = 0; i < myAvailableProducts.products.length; i++) {
        const product = myAvailableProducts.products[i];
        if (product.status && product.status.status_type === "Disponible") {
          availableProductsString += `Producto ${i + 1}:\n`;
          availableProductsString += `Nombre: ${product.name}\n`;
          availableProductsString += `Descripcion: ${
            product.description || "N/A"
          }\n`;
          availableProductsString += `Precio: RD$${product.price}\n`;
          availableProductsString += "------------------------\n";
        }
      }
      productsList = "Inventario\n------------------------\n";
      productsList += availableProductsString;
      ctx.reply(productsList);
    }
  });

  bot.action("editProduct", (ctx) => {
    ctx.reply("Menu para edicion de productos");
  });

  bot.command("addproduct", (ctx) => {
    conditionToStopHearingMessages = false;
    const input = ctx.message.text.replace(/^\/addproduct\s+/i, "").split("_"); // Remove the command prefix and then split    console.log(input);
    if (!conditionToStopHearingMessages) {
      if (input.length === 3) {
        const productName = input[0];
        const productDescription = input[1];
        const productPrice = input[2];
        postProduct(productName, productDescription, productPrice, user);
        registerProductState = false;
        ctx.reply(
          "El producto se ha registrado correctamente, revisa tu inventario"
        );
        ctx.deleteMessage();
        conditionToStopHearingMessages = true;
        // mainMenu(ctx, bot);
      } else {
        ctx.reply(
          "Favor inserta los datos solicitados en este formato y sin corchetes [Mi producto_mi descripcion_100]"
        );
      }
    }
  });

  bot.action("backtoDashboard", (ctx) => {
    dashboardMenu(ctx, bot, user);
  });
}

module.exports = {
  productsMenu,
};
