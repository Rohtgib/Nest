const { postProduct } = require("../../../../logic/addProduct.js");
const {
  getProductsbyUser,
  isProductVendor,
} = require("../../../../logic/getProducts.js");
const {
  updateProductDescription,
  updateProductName,
  updateProductPrice,
  updateProductStatus,
} = require("../../../../logic/editProducts.js");

function productsMenu(ctx, bot, userID, dashboardMenu) {
  let conditionToStopHearingMessages;
  user = userID;
  let greetMessage = `My products`;
  bot.telegram.sendMessage(ctx.chat.id, greetMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Browse my products for sale",
            callback_data: "availableProducts",
          },
          {
            text: "Edit product information",
            callback_data: "editProduct",
          },
          {
            text: "Add new product",
            callback_data: "addProduct",
          },
          {
            text: "Go back",
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
      ctx.reply("You have no products for sale");
    } else {
      for (let i = 0; i < myAvailableProducts.products.length; i++) {
        const product = myAvailableProducts.products[i];
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
      productsList = "Inventory\n------------------------\n";
      productsList += availableProductsString;
      ctx.reply(productsList);
    }
  });

  bot.action("editProduct", (ctx) => {
    ctx.reply(
      "Editing products from your inventory\n\n/editname [id]_[new product name] - Edits a product's name\n/editdescription [id]_[new description] - Edits a product's description\n/editprice [id]_[new price] - Edits a product's price\n/sold [id] - Marks a product as sold\n/unlist [id] - Unlists a product"
    );
  });

  bot.action("addProduct", (ctx) => {
    ctx.reply(
      "Adding products to your inventory: /addproduct [name]_[description]_[price]"
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
          ctx.reply("This product doesn't exist in your inventory");
        } else {
          updateProductName(productID, productName);
          ctx.reply(
            `The name of product #${input} has been changed successfully`
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Insufficient parameters supplied");
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
          ctx.reply("This product doesn't exist in your inventory");
        } else {
          updateProductDescription(productID, productDescription);
          ctx.reply(
            `The description of product #${input} has been changed successfully`
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Insufficient parameters supplied");
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
          ctx.reply("This product doesn't exist in your inventory");
        } else {
          updateProductPrice(productID, productPrice);
          ctx.reply(
            `The price of product #${input} has been changed successfully`
          );
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Insufficient parameters supplied");
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
          `${productName} has been added to your inventory and is now on sale`
        );
        ctx.deleteMessage();
        conditionToStopHearingMessages = true;
        // mainMenu(ctx, bot);
      } else {
        ctx.reply("Insufficient parameters supplied");
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
          ctx.reply("This product doesn't exist in your inventory");
        } else {
          registerProductState = false;
          updateProductStatus(productID, 2);
          ctx.reply(`Product #${input} has been registered as sold`);
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Insufficient parameters supplied");
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
          ctx.reply("This product doesn't exist in your inventory");
        } else {
          registerProductState = false;
          updateProductStatus(productID, 4);

          `Product #${input} has been unlisted from your inventory`;
          ctx.deleteMessage();
          conditionToStopHearingMessages = true;
          // mainMenu(ctx, bot);
        }
      } else {
        ctx.reply("Insufficient parameters supplied");
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
