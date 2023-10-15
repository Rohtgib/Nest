const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

router.get("/get/products/filter/name", async (req, res) => {
  try {
    const { name } = req.body;

    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(email,phone),status: product_status(status_type)"
      )
      .textSearch("name", name);

    if (error) {
      throw error;
    }

    const products = data || [];

    res.json({ products, name });
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
