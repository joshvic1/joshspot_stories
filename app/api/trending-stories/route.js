import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";

export async function GET() {
  await dbConnect();

  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  try {
    const stories = await Story.find({ createdAt: { $gte: twoDaysAgo } })
      .lean()
      .sort({})
      .limit(50);

    // Sort stories by combined popularity
    const sortedStories = stories
      .map((story) => ({
        ...story,
        popularityScore:
          (story.reactions?.length || 0) + (story.comments?.length || 0),
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 4); // top 4

    return NextResponse.json({ stories: sortedStories });
  } catch (error) {
    console.error("Trending stories fetch error:", error);
    return NextResponse.json({ stories: [] }, { status: 500 });
  }
}
