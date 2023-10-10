const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

// Endpoint to get products by user ID
router.get("/get/products/filter/name", async (req, res) => {
  try {
    const { name } = req.body; // Assuming you send the user's ID in the request body

    // Query the "product" table for products by the vendor's ID
    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .textSearch("name", name);

    if (error) {
      throw error;
    }

    const products = data || []; // Initialize products as an empty array

    res.json({ products, name });
  } catch (error) {
    console.error("Error retrieving user products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
