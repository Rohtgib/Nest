const { postProduct } = require("../logic/addProduct.js");
const {
  getProductsbyName,
  getProductsbyUser,
  isProductVendor,
} = require("../logic/getProducts.js");
const {
  updateProductDescription,
  updateProductName,
  updateProductPrice,
  updateProductStatus,
} = require("../logic/editProducts.js");

function productsMenu(ctx, bot, userID, dashboardMenu) {
  let conditionToStopHearingMessages;
  user = userID;
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
          availableProductsString += `Producto ${product.id}:\n`;
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
    ctx.reply(
      "Menu para edicion de productos\nSolo debes de pasar el id del producto que deseas modificar seguido de los parametros solicitados\n\n/editname [id]_nuevo nombre - Cambia el nombre de un producto\n/editdescription [id]_nueva descripcion - Cambia la descripcion de un producto\n/editprice [id]_nuevo precio - Cambia el precio de un producto\n/sold [id] - Marca un producto como vendido\n/unlist [id] - Deslista un producto"
    );
  });

  bot.action("addProduct", (ctx) => {
    ctx.reply(
      "Para agregar productos utiliza el comando /addproduct seguido del nombre, descripcion, y precio del producto, cada uno separado por guiones bajos (_)"
    );
  });

  bot.command("editname", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.replace(/^\/editname\s+/i, "").split("_");
      if (input.length === 2) {
        const productID = input[0];
        const productName = input[1];
        const isVendor = await isProductVendor(ctx, user, productID);
        console.log(isVendor);
        if (!isVendor) {
          ctx.reply("Este producto no existe en tu inventario");
        } else {
          updateProductName(productID, productName);
          ctx.reply(
            "Se ha modificado el nombre del producto, revisa tu inventario"
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
      }
    }
  });

  bot.command("editdescription", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text
        .replace(/^\/editdescription\s+/i, "")
        .split("_");
      if (input.length === 2) {
        const productID = input[0];
        const productDescription = input[1];
        const isVendor = await isProductVendor(ctx, user, productID);
        if (!isVendor) {
          ctx.reply("Este producto no existe en tu inventario");
        } else {
          updateProductDescription(productID, productDescription);
          ctx.reply(
            "Se ha modificado la descripcion del producto, revisa tu inventario"
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
      }
    }
  });

  bot.command("editprice", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.replace(/^\/editprice\s+/i, "").split("_");
      if (input.length === 2) {
        const productID = input[0];
        const productPrice = input[1];
        const isVendor = await isProductVendor(ctx, user, productID);
        if (!isVendor) {
          ctx.reply("Este producto no existe en tu inventario");
        } else {
          updateProductPrice(productID, productPrice);
          ctx.reply(
            "Se ha modificado el precio del producto, revisa tu inventario"
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
      }
    }
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

  bot.command("sold", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.split(" "); // Remove the command prefix and then split    console.log(input);
      if (input.length === 2) {
        const productID = input[1];
        const isVendor = await isProductVendor(ctx, user, productID);
        if (!isVendor) {
          ctx.reply("Este producto no existe en tu inventario");
        } else {
          registerProductState = false;
          updateProductStatus(productID, 2);
          ctx.reply(
            "El producto se ha registrado como vendido, revisa tu inventario"
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
      }
    }
  });

  bot.command("unlist", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.split(" "); // Remove the command prefix and then split    console.log(input);
      if (input.length === 2) {
        const productID = input[1];
        const isVendor = await isProductVendor(ctx, user, productID);

        if (!isVendor) {
          ctx.reply("Este producto no existe en tu inventario");
        } else {
          registerProductState = false;
          updateProductStatus(productID, 4);

          ctx.reply("El producto se deslistado de tu inventario");
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
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
