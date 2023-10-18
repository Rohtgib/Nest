const {
  getRecentProducts,
  getProductbyID,
  getProductsbyName,
} = require("../../../../logic/getProducts");

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
            callback_data: "browseHelp",
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

bot.action("browseHelp", (ctx) => {
	ctx.reply("Para buscar un producto por su nombre utiliza el comando /browse seguido de el nombre");
});

bot.action("expandCommand", (ctx) => {
	ctx.reply("Para expandir la informacion de un producto utiliza el comando /expand seguido del ID de producto");
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

  bot.command("browse", async (ctx) => {
    let availableProductsString = "";
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.replace(/^\/browse\s+/i, "");
      try {
        const searchResult = await getProductsbyName(input);
        if (searchResult.products.length === 0) {
          ctx.reply("No se han encontrado productos");
        } else {
          for (let i = 0; i < searchResult.products.length; i++) {
            const product = searchResult.products[i];
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
          productsList = "Resultado de busqueda\n------------------------\n";
          productsList += availableProductsString;
          ctx.reply(productsList);
        }
      } catch (error) {
        console.log(error);
        ctx.reply("Ha ocurrido un error");
      }
    }
  });

  bot.action("backtoDashboard", (ctx) => {
    dashboardMenu(ctx, bot, user);
  });
}

module.exports = {
  catalogMenu,
};
