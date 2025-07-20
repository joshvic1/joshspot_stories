import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();
  const { content, category, isFeatured, media } = await req.json();

  try {
    await Story.create({
      content,
      category,
      media, // <-- This must exist in your schema.
      isPublic: true,
      isFeatured: isFeatured || false,
    });

    return NextResponse.json({ message: "Story saved!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error saving story" }, { status: 500 });
  }
}
