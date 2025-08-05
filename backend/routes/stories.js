// backend/routes/stories.js

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// GET all stories with pagination and optional filters
router.get("/all-stories", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const featured = req.query.featured;
    const isPublic = req.query.isPublic ?? "true";

    const skip = (page - 1) * limit;

    const query = {
      isPublic: isPublic === "false" ? false : true,
    };

    if (category && category !== "all") {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
    } else if (featured === "false") {
      query.isFeatured = false;
    }

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Story.countDocuments(query);

    res.json({
      stories,
      hasMore: skip + stories.length < total,
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// GET a story by ID
router.get("/story/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id).lean();

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    story._id = story._id.toString();
    story.createdAt = story.createdAt.toString();

    res.status(200).json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Failed to fetch story" });
  }
});

// POST a new story
router.post("/all-stories", async (req, res) => {
  try {
    const {
      content,
      category,
      isPublic = true,
      isFeatured = false,
      media,
    } = req.body;

    if (!content || !category) {
      return res
        .status(400)
        .json({ error: "Content and category are required" });
    }

    const newStory = new Story({
      content,
      category,
      isPublic,
      isFeatured,
      media,
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Failed to create story" });
  }
});

module.exports = router;
