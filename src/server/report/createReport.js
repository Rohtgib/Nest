const express = require("express");
const { supabase, insertData } = require("../supabase");

const createReport = express.Router();
createReport.use(express.json());

//TODO Endpoint to insert data into a table
createReport.post("/insert/report", async (req, res) => {
  try {
    const { product, reporter, reason } = req.body;
    const report_date = new Date().toISOString();

    //TODO Change table
    const tableName = "report";

    //TODO Parse data in JSON format
    const data = {
      product,
      reporter,
      reason,
      report_date: report_date,
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

module.exports = createReport;
