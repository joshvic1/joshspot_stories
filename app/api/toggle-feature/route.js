import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();

  const { id, isFeatured } = await req.json();

  try {
    await Story.findByIdAndUpdate(id, { isFeatured });
    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
