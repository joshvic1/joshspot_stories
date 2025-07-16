// app/api/all-stories/[id]/reactions/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

export async function POST(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { type, previousType } = await request.json();

  try {
    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    // Remove previous reaction if exists
    if (previousType && story.reactions[previousType] > 0) {
      story.reactions[previousType] -= 1;
    }

    // Add new reaction
    story.reactions[type] = (story.reactions[type] || 0) + 1;
    await story.save();

    return NextResponse.json({ reactions: story.reactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating reactions", error },
      { status: 500 }
    );
  }
}

export async function GET(_, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ reactions: story.reactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching reactions", error },
      { status: 500 }
    );
  }
}
