const http = require("http");
const dotenv = require("dotenv");

async function postProduct(name, description, price, vendor) {
  const requestData = JSON.stringify({
    name: name,
    description: description,
    price: parseFloat(price),
    vendor: vendor,
    status: 1,
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/insert/product",
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
        console.log("API Response:", responseData);

        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      console.error("API Error:", error.message);

      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

module.exports = { postProduct };
