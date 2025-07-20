import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const stories = await Story.find();
  return NextResponse.json({ stories });
}
