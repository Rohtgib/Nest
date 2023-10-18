const express = require("express");
const { supabase, insertData } = require("../supabase");

const createProduct = express.Router();
createProduct.use(express.json());

createProduct.post("/insert/product", async (req, res) => {
  try {
    const { name, description, price, vendor } = req.query;
    // Set status as available
    const status = 1;

    const tableName = "product";

    const data = {
      name,
      description,
      price,
      vendor,
      status,
    };

    const insertedData = await insertData(tableName, data);

    res.status(200).json({
      message: "Product/s created successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error creating product/s:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = createProduct;
