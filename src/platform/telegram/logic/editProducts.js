const http = require("http");

async function updateProductName(productID, name) {
  const requestData = JSON.stringify({
    id: productID,
    name: name,
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/update/name",
    method: "POST",
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
        // Handle the API response here (e.g., logging or returning data)
        console.log("API Response:", responseData);

        // Resolve the promise with the API response data
        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      // Handle errors (e.g., logging or rejecting the promise)
      console.error("API Error:", error.message);

      // Reject the promise with the error
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function updateProductDescription(productID, description) {
  const requestData = JSON.stringify({
    id: productID,
    description: description,
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/update/description",
    method: "POST",
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
        // Handle the API response here (e.g., logging or returning data)
        console.log("API Response:", responseData);

        // Resolve the promise with the API response data
        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      // Handle errors (e.g., logging or rejecting the promise)
      console.error("API Error:", error.message);

      // Reject the promise with the error
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function updateProductPrice(productID, price) {
  const requestData = JSON.stringify({
    id: productID,
    price: parseFloat(price),
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/update/price",
    method: "POST",
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
        // Handle the API response here (e.g., logging or returning data)
        console.log("API Response:", responseData);

        // Resolve the promise with the API response data
        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      // Handle errors (e.g., logging or rejecting the promise)
      console.error("API Error:", error.message);

      // Reject the promise with the error
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

async function updateProductStatus(productID, status) {
  const requestData = JSON.stringify({
    id: productID,
    status: parseInt(status),
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/update/status",
    method: "POST",
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
        // Handle the API response here (e.g., logging or returning data)
        console.log("API Response:", responseData);

        // Resolve the promise with the API response data
        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      // Handle errors (e.g., logging or rejecting the promise)
      console.error("API Error:", error.message);

      // Reject the promise with the error
      reject(error);
    });

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

module.exports = {
  updateProductDescription,
  updateProductName,
  updateProductPrice,
  updateProductStatus,
};
