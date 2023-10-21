const {
  getRecentProducts,
  getProductbyID,
  getProductsbyName,
} = require("../../../../logic/getProducts");

function catalogMenu(ctx, bot, userID, dashboardMenu) {
  user = userID;
  let greetMessage = `Catalog`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Browse new products",
            callback_data: "browseRecent",
          },
          {
            text: "Search for products",
            callback_data: "browseHelp",
          },
          {
            text: "Expand product information",
            callback_data: "expandCommand",
          },
          {
            text: "Go back",
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
      ctx.reply("No products are available, try again later");
    } else {
      for (let i = 0; i < recentProducts.products.length; i++) {
        const product = recentProducts.products[i];
        if (product.status && product.status.status_type === "Disponible") {
          recentProductsString += `Product #${product.id}:\n`;
          recentProductsString += `Name: ${product.name}\n`;
          recentProductsString += `Description: ${
            product.description || "N/A"
          }\n`;
          recentProductsString += `Price: RD$${product.price}\n`;
          recentProductsString += "------------------------\n";
        }
      }
      productsList = "Most recent products\n------------------------\n";
      productsList += recentProductsString;
      ctx.reply(productsList);
    }
  });

  bot.action("browseHelp", (ctx) => {
    ctx.reply("To browse products by their names use /browse [product name]");
  });

  bot.action("expandCommand", (ctx) => {
    ctx.reply("To expand product information use /expand [product no.]");
  });

  bot.command("expand", async (ctx) => {
    conditionToStopHearingMessages = false;
    if (!conditionToStopHearingMessages) {
      const input = ctx.message.text.split(" ");
      if (input.length === 2) {
        const productID = input[1];
        try {
          const product = await getProductbyID(productID);
          const productData = product.products[0];
          const vendor = productData.vendor;

          const productDetailString = `
          Product: ${productData.name}\n
          Description: ${productData.description}\n
          Price: RD$${productData.price}\n
          Vendor information:\n
          - Phone number: ${vendor.phone || "Unavailable"}\n
          - Email: ${vendor.email || "Unavailable"}
          `;

          ctx.reply(productDetailString);
        } catch (error) {
          console.log(error);
          ctx.reply("This product couldn't be found or doesn't exist");
        }
      } else {
        ctx.reply("Please use the command as follows: /expand [product no.]");
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
          ctx.reply("No products were found");
        } else {
          for (let i = 0; i < searchResult.products.length; i++) {
            const product = searchResult.products[i];
            if (product.status && product.status.status_type === "Disponible") {
              availableProductsString += `Product #${product.id}:\n`;
              availableProductsString += `Name: ${product.name}\n`;
              availableProductsString += `Description: ${
                product.description || "N/A"
              }\n`;
              availableProductsString += `Price: RD$${product.price}\n`;
              availableProductsString += "------------------------\n";
            }
          }
          productsList = `Search result for ${input}\n------------------------\n`;
          productsList += availableProductsString;
          ctx.reply(productsList);
        }
      } catch (error) {
        console.log(error);
        ctx.reply(
          "An error ocurred, make sure you're using the command as explained: /browse [product name]"
        );
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
