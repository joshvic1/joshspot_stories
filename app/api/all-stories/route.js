// app/api/all-stories/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

// Fetch all stories with pagination + category filter
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const category = searchParams.get("category");

  const skip = (page - 1) * limit;

  await dbConnect();

  // Add category filter if provided
  const query = category ? { category } : {};

  const stories = await Story.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Story.countDocuments(query);

  return NextResponse.json({
    stories,
    hasMore: skip + stories.length < total,
  });
}
