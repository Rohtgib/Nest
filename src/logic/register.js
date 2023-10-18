const http = require("http");

// Define a function that makes a POST request to your Express API
async function postUser(email, phone, password) {
  // Create the request data as a JSON string
  const requestData = JSON.stringify({
    email: email,
    password: password,
    phone: phone,
  });

  // Define the request options
  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/insert/user",
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

// Export the function so that it can be used in other files
module.exports = { postUser };
