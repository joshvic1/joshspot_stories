// My comments API route
// app/api/all-stories/[id]/comment/route.js

import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";

// Fetch comments for a specific story
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const comments = await Comment.find({ storyId: id }).sort({
      createdAt: -1,
    });
    return Response.json(comments);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// Add a new comment to a story
export async function POST(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const { text } = body;

  if (!text) {
    return Response.json({ message: "Comment text required" }, { status: 400 });
  }

  try {
    const newComment = await Comment.create({ storyId: id, text });
    return Response.json(newComment, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Failed to add comment" }, { status: 500 });
  }
}
