const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
