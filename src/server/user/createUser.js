const express = require("express");
const { supabase, insertData } = require("../supabase");

const createUser = express.Router();
createUser.use(express.json());

createUser.post("/insert/user", async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const creation_date = new Date().toISOString();

    const tableName = "user";

    const data = {
      email,
      password,
      phone,
      creation_date: creation_date,
    };

    await insertData(tableName, data);
    result = true;

    res.status(200).json({
      message: "User/s created successfully",
      result: result,
    });
  } catch (error) {
    result = false;
    res.status(500).json({ error: error.message, result: result });
  }
});

module.exports = createUser;
