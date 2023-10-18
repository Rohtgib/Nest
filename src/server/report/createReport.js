const express = require("express");
const { supabase, insertData } = require("../supabase");

const createReport = express.Router();
createReport.use(express.json());

createReport.post("/insert/report", async (req, res) => {
  try {
    const { product, reporter, reason } = req.query;
    const report_date = new Date().toISOString();

    const tableName = "report";

    const data = {
      product,
      reporter,
      reason,
      report_date: report_date,
    };

    // Insert the data into the table using the Supabase client
    const insertedData = await insertData(tableName, data);

    res.status(200).json({
      message: "Report/s created successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error creating report/s:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = createReport;
