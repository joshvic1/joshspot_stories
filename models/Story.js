// Defining my stories structure in the database

import mongoose from "mongoose";

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
    enum: ["love", "sex", "relationship", "heartbreak"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: {
    love: { type: Number, default: 0 },
    heartbreak: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  comments: [
    {
      _id: false,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      emojiAvatar: String, // Add random emoji
    },
  ],
});

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
