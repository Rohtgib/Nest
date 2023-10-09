const express = require("express");
const { supabase } = require("../supabase");

const loginUser = express.Router();
loginUser.use(express.json());

// Endpoint to validate user credentials
loginUser.post("/validate/user", async (req, res) => {
  try {
    const { phone, password } = req.body; // Assuming you send these values in the request body

    const { data, error } = await supabase
      .from("user")
      .select("id")
      .eq("phone", phone)
      .eq("password", password);

    if (error) {
      throw error;
    }

    const entryExists = data.length > 0; // Check if any data was returned
    let userId = null;

    if (entryExists) {
      userId = data[0].id; // Get the id of the first matching user
    }

    res.json({ result: entryExists, userId: userId });
  } catch (error) {
    console.error("Error checking entry:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = loginUser;
