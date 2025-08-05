// backend/routes/trendingStories.js

const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// GET: Trending stories
router.get("/trending-stories", async (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 720 * 60 * 60 * 1000); // 30 days

  try {
    const stories = await Story.find({ createdAt: { $gte: thirtyDaysAgo } })
      .lean()
      .limit(50);

    const sortedStories = stories
      .map((story) => ({
        ...story,
        popularityScore:
          (story.reactions?.length || 0) + (story.comments?.length || 0),
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 4);

    res.status(200).json({ stories: sortedStories });
  } catch (error) {
    console.error("Trending stories fetch error:", error);
    res.status(500).json({ stories: [] });
  }
});

module.exports = router;
