// backend/routes/reactions.js

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// POST: Update a reaction on a story
router.post("/all-stories/:id/reactions", async (req, res) => {
  const { id } = req.params;
  const { type, previousType } = req.body;

  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Remove previous reaction
    if (previousType && story.reactions[previousType] > 0) {
      story.reactions[previousType] -= 1;
    }

    // Add new reaction
    story.reactions[type] = (story.reactions[type] || 0) + 1;

    await story.save();

    res.status(200).json({ reactions: story.reactions });
  } catch (error) {
    console.error("Error updating reactions:", error);
    res.status(500).json({ message: "Error updating reactions", error });
  }
});

// GET: Get reactions of a story
router.get("/all-stories/:id/reactions", async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json({ reactions: story.reactions });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    res.status(500).json({ message: "Error fetching reactions", error });
  }
});

module.exports = router;
