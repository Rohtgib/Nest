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

    const insertedData = await insertData(tableName, data);

    res.status(200).json({
      message: "User/s created successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error creating user/s:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = createUser;
