const http = require("http");

async function getProductsbyName(name) {
  const requestData = JSON.stringify({
    name: name,
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/get/products/filter/name",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          // Check if the response data is empty
          if (!responseData) {
            resolve(false); // No data in the response, treat as "false"
          } else {
            const response = JSON.parse(responseData);
            resolve(response); // Entry exists in the Supabase table
          }
        } catch (error) {
          console.error("Error parsing response:", error.message);
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error("API Error:", error.message);
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function getProductsbyUser(userID) {
  const requestData = JSON.stringify({
    id: userID,
  });
  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/get/userproducts",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          // Check if the response data is empty
          if (!responseData) {
            resolve(false); // No data in the response, treat as "false"
          } else {
            const response = JSON.parse(responseData);
            resolve(response); // Entry exists in the Supabase table
          }
        } catch (error) {
          console.error("Error parsing response:", error.message);
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error("API Error:", error.message);
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function getProductbyID(productID) {
  const requestData = JSON.stringify({
    id: productID,
  });
  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/get/products/filter/id",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          // Check if the response data is empty
          if (!responseData) {
            resolve(false); // No data in the response, treat as "false"
          } else {
            const response = JSON.parse(responseData);
            resolve(response); // Entry exists in the Supabase table
          }
        } catch (error) {
          console.error("Error parsing response:", error.message);
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error("API Error:", error.message);
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function isProductVendor(ctx, userID) {
  const myAvailableProducts = await getProductsbyUser(userID);

  if (myAvailableProducts.products.length === 0) {
    return false; // No products found, so the user is not the vendor
  }

  // Find the product with the given ID
  const vendor = myAvailableProducts.products[0].vendor.id;

  // Check if the user's ID matches the vendor's ID
  if (vendor === userID) {
    return true; // The user is the vendor
  }

  return false; // The user is not the vendor
}


module.exports = {
  getProductsbyName,
  getProductsbyUser,
  getProductbyID,
  isProductVendor,
};
