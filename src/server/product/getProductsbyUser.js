const express = require("express");
const { supabase } = require("../supabase");

const router = express.Router();

router.use(express.json());

router.get("/get/products/filter/user", async (req, res) => {
  try {
    const { id } = req.body;

    const { data, error } = await supabase
      .from("product")
      .select(
        "id,name,description,price,vendor: user(id,email,phone),status: product_status(status_type)"
      )
      .eq("vendor", id);

    if (error) {
      throw error;
    }

    const products = data || [];
    let vendorID = null;

    if (products.length > 0) {
      vendorID = products[0].vendor.id;
    }

    res.json({ products, vendorID });
  } catch (error) {
    console.error("Error retrieving user products:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
