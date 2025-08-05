const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ["love", "sex", "relationship", "heartbreak", "others"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: {
    love: { type: Number, default: 0 },
  },
  comments: [
    {
      _id: false,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      emojiAvatar: String,
    },
  ],
  media: {
    type: String,
  },
});

module.exports = mongoose.models?.Story || mongoose.model("Story", StorySchema);
