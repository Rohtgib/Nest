const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

// Endpoint to get products by user ID
router.get("/get/userproducts", async (req, res) => {
  try {
    const { id } = req.body; // Assuming you send the user's ID in the request body

    // Query the "product" table for products by the vendor's ID
    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .eq("vendor", id);

    if (error) {
      throw error;
    }

    const products = data || []; // Initialize products as an empty array
    let userId = null;

    if (products.length > 0) {
      userId = products[0].vendor; // Get the vendor ID from the first product (assuming "vendor" field contains user ID)
    }

    res.json({ products, userId });
  } catch (error) {
    console.error("Error retrieving user products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
