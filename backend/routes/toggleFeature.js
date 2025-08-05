// backend/routes/toggleFeature.js

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// POST: Toggle feature
router.post("/toggle-feature", async (req, res) => {
  const { id, isFeatured } = req.body;

  try {
    await Story.findByIdAndUpdate(id, { isFeatured });
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
});

module.exports = router;
