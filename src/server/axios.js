const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const server = axios.create({
  baseURL: `http://127.0.0.1:${process.env.EXPRESS_PORT}/`,
  timeout: 1000,
  headers: { "X-Custom-Header": "ShopSage API" },
});

module.exports = {
    server
}
