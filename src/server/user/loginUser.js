const express = require("express");
const { supabase } = require("../supabase");

const loginUser = express.Router();
loginUser.use(express.json());

loginUser.get("/validate/user", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const { data, error } = await supabase
      .from("user")
      .select("id")
      .eq("phone", phone)
      .eq("password", password);

    if (error) {
      throw error;
    }

    const entryExists = data.length > 0;
    let userId = null;

    if (entryExists) {
      userId = data[0].id;
    }

    res.json({ userFound: entryExists, userId: userId });
  } catch (error) {
    console.error("Error validating login:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = loginUser;
