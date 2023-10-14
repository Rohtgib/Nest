const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

// Endpoint to get the 10 most recently added products
router.get("/get/products/recent", async (req, res) => {
  try {
    // Query the "product" table for the 10 most recently added products
    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .order("id", { ascending: false }) // Sort by created_at in descending order
      .limit(10); // Limit the result to 10 products

    if (error) {
      throw error;
    }

    const products = data || []; // Initialize products as an empty array

    res.json({ products });
  } catch (error) {
    console.error("Error retrieving recently added products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
