const http = require("http");
const { server } = require("../server/axios");

async function userLogin(phone, password) {
  try {
    const response = await server.get("validate/user", {
      params: {
        phone: phone,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function userRegister(email, phone, password) {
  try {
    await server.post("insert/user", {
      params: {
        email: email,
        password: password,
        phone: phone,
      },
    });
  } catch (error) {
    console.error("Error", error.message);
  }
}

module.exports = { userLogin, userRegister };
