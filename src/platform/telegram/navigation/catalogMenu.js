const { getRecentProducts, getProductbyID } = require("../logic/getProducts");

function catalogMenu(ctx, bot, userID, dashboardMenu) {
  user = userID;
  let greetMessage = `Catalogo`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Ver nuevos productos",
            callback_data: "browseRecent",
          },
          {
            text: "Buscar producto por nombre",
            callback_data: "productsMenu",
          },
          {
            text: "Expandir informacion sobre un producto",
            callback_data: "expandCommand",
          },
          {
            text: "Atras",
            callback_data: "backtoDashboard",
          },
        ],
      ],
    },
  });

  bot.action("browseRecent", async (ctx) => {
    let recentProductsString = "";
    var recentProducts = await getRecentProducts();
    if (recentProducts.products.length === 0) {
      ctx.reply(
        "No tienes productos disponibles en tu inventario, agregalos y empieza comerciar"
      );
    } else {
      for (let i = 0; i < recentProducts.products.length; i++) {
        const product = recentProducts.products[i];
        if (product.status && product.status.status_type === "Disponible") {
          recentProductsString += `Producto ${product.id}:\n`;
          recentProductsString += `Nombre: ${product.name}\n`;
          recentProductsString += `Descripcion: ${
            product.description || "N/A"
          }\n`;
          recentProductsString += `Precio: RD$${product.price}\n`;
          recentProductsString += "------------------------\n";
        }
      }
      productsList = "Nuevos productos\n------------------------\n";
      productsList += recentProductsString;
      ctx.reply(productsList);
    }
  });

  bot.command("expand", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.split(" "); // Remove the command prefix and then split    console.log(input);
      if (input.length === 2) {
        const productID = input[1];
        try {
          const product = await getProductbyID(productID);
          const productData = product.products[0];
          const vendor = productData.vendor;
          const status = productData.status;

          // Product information is available
          const productDetailString = `
          Producto: ${productData.name}\n
          Descripción: ${productData.description}\n
          Precio: RD$$${productData.price}\n
          Contacta al vendedor:\n
          - Número de teléfono: ${vendor.phone || "No disponible"}\n
          - Correo electrónico: ${vendor.email || "No disponible"}
          `;
          
          

          ctx.reply(productDetailString);
        } catch (error) {
          console.log(error);
          ctx.reply("Este producto no se pudo encontrar o no existe");
        }
      } else {
        ctx.reply("Favor inserta los datos solicitados de forma correcta");
      }
    }
  });
}



module.exports = {
  catalogMenu,
};
