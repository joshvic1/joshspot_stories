import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();

  const { content, category, type } = await req.json();

  try {
    await Story.create({
      content,
      category,
      isPublic: type === "public",
      isFeatured: false,
    });

    return NextResponse.json({ message: "Story saved!" });
  } catch (err) {
    return NextResponse.json({ error: "Error saving story" }, { status: 500 });
  }
}
