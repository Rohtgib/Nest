const express = require("express");
const { supabase } = require("../supabase");

const validateUser = express.Router();
validateUser.use(express.json());

validateUser.get("/validate/user", async (req, res) => {
  try {
    const { phone, password } = req.query;

    const { data, error } = await supabase
      .from("user")
      .select("id")
      .eq("phone", phone)
      .eq("password", password);

    if (error) {
      throw error;
    }

    const entryExists = data.length > 0;
    let userID = null;

    if (entryExists) {
      userID = data[0].id;
    }

    res.json({ result: entryExists, userID: userID });
  } catch (error) {
    console.error("Error checking entry:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = validateUser;
