const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

router.get("/get/products/recent", async (req, res) => {
  try {
    const dataLimit = 10;
    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .order("id", { ascending: false })
      .limit(dataLimit);

    if (error) {
      throw error;
    }

    const products = data || [];

    res.json({ products });
  } catch (error) {
    console.error("Error retrieving recently added products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
