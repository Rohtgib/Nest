const express = require("express");
const { supabase, updateData } = require("../supabase");

const updatePassword = express.Router();
updatePassword.use(express.json());

updatePassword.post("/update/password", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const tableName = "user";
    const filter = { phone: phone };

    const data = {
      password,
    };

    const insertedData = await updateData(tableName, data, filter);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating user password:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = updatePassword;
