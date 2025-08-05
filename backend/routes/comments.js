// backend/routes/comments.js

const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET: Fetch comments for a specific story
router.get("/all-stories/:id/comment", async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ storyId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// POST: Add a comment to a story
router.post("/all-stories/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text required" });
  }

  try {
    const newComment = await Comment.create({ storyId: id, text });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

module.exports = router;
