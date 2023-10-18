const http = require("http");

async function validateUser(phone, password) {
  const requestData = JSON.stringify({
    phone: phone,
    password: password,
  });

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/validate/user",
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
          if (!responseData) {
            resolve(false);
          } else {
            const response = JSON.parse(responseData);

            if (response.result == true) {
              resolve(response.userId);
            } else {
              resolve(false);
            }
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

    req.write(requestData);
    req.end();
  });
}

module.exports = { validateUser };
