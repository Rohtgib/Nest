const http = require("http");

// Define a function that makes a POST request to your Express API
async function validateUser(phone, password) {
  // Create the request data as a JSON string
  const requestData = JSON.stringify({
    phone: phone,
    password: password,
  });

  // Define the request options
  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/validate/user",
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
        try {
          // Check if the response data is empty
          if (!responseData) {
            resolve(false); // No data in the response, treat as "false"
          } else {
            const response = JSON.parse(responseData);

            if (response.result == true) {
              resolve(response.userId); // Entry exists in the Supabase table
            } else {
              resolve(false); // Entry does not exist in the Supabase table
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

    // Send the request data
    req.write(requestData);
    req.end();
  });
}

// Export the function so that it can be used in other files
module.exports = { validateUser };
