// backend/routes/submit.js

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// POST: Submit a new story
router.post("/submit", async (req, res) => {
  const { content, category, type } = req.body;

  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  if (linkRegex.test(content)) {
    return res.status(400).json({ error: "Links are not allowed." });
  }

  try {
    await Story.create({
      content,
      category,
      isPublic: type === "public",
      isFeatured: false,
    });

    res.status(200).json({ message: "Story saved!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving story" });
  }
});

module.exports = router;
