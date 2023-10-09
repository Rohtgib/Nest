const express = require("express");
const { supabase, insertData } = require("../supabase");

const createProduct = express.Router();
createProduct.use(express.json());

//TODO Endpoint to insert data into a table
createProduct.post("/insert/product", async (req, res) => {
  try {
    const { name, description, price, vendor} = req.body;
    const status = 1;


    //TODO Change table
    const tableName = "product";

    //TODO Parse data in JSON format
    const data = {
      name,
      description,
      price,
      vendor,
      status
    };

    // Insert the data into the table using the Supabase client
    const insertedData = await insertData(tableName, data);

    res.status(200).json({
      message: "Data inserted successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = createProduct;
