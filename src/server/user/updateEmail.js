const express = require("express");
const { supabase, updateData } = require("../supabase");

const updateEmail = express.Router();
updateEmail.use(express.json());

updateEmail.post("/update/email", async (req, res) => {
  try {
    const { phone, email } = req.body;
    const tableName = "user";
    const filter = { phone: phone };

    const data = {
      email,
    };

    const insertedData = await updateData(tableName, data, filter);

    res.status(200).json({
      message: "Email updated successfully",
    });
  } catch (error) {
    console.error("Error updating email:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = updateEmail;
