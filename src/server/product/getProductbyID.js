const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

router.get("/get/products/filter/id", async (req, res) => {
  try {
    const { id } = req.body; // Assuming you send the user's ID in the request body

    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .eq("id", id);

    if (error) {
      throw error;
    }

    const products = data || [];
    let userId = null;

    if (products.length > 0) {
      userId = products[0].vendor;
    }

    res.json({ products, id });
  } catch (error) {
    console.error("Error retrieving user products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
