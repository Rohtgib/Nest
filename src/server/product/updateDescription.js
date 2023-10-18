const express = require("express");
const { supabase, updateData } = require("../supabase");

const updateEmail = express.Router();
updateEmail.use(express.json());

updateEmail.post("/update/description", async (req, res) => {
  try {
    const { id, description } = req.query;
    const tableName = "product";
    const filter = { id: id };

    const data = {
      description,
    };

    const insertedData = await updateData(tableName, data, filter);

    res.status(200).json({
      message: "Description updated successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error updating product description:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = updateEmail;
