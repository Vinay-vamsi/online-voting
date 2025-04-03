const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

const ADMIN_PASSWORD = "admin123"; // Set your password here

router.post("/results", async (req, res) => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: "❌ Incorrect password" });
  }

  try {
    const candidates = await Candidate.find();

    // Send only the first 2 Head Boys and 2 Head Girls
    const filteredResults = candidates
      .filter((candidate) => candidate.category === "headboy")
      .slice(0, 2)
      .concat(
        candidates.filter((candidate) => candidate.category === "headgirl").slice(0, 2)
      );

    res.json(filteredResults);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "⚠️ Server error" });
  }
});

module.exports = router;

