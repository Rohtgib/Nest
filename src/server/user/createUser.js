const express = require("express");
const { supabase, insertData } = require("../supabase");

const createUser = express.Router();
createUser.use(express.json());

//TODO Endpoint to insert data into a table
createUser.post("/insert/user", async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const creation_date = new Date().toISOString();

    //TODO Change table
    const tableName = "user";

    //TODO Parse data in JSON format
    const data = {
      email,
      password,
      phone,
      creation_date: creation_date,
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

module.exports = createUser;
