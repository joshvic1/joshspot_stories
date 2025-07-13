// app/story/[id]/page.jsx

import StoryPageClient from "/components/Comments/StoryPageClient.jsx";
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/Story";
import { notFound } from "next/navigation";

export default async function StoryPage({ params }) {
  const { id } = params;

  await dbConnect();

  try {
    const story = await Story.findById(id).lean();

    if (!story) return notFound();

    // Convert _id and createdAt to string-safe
    story._id = story._id.toString();
    story.createdAt = story.createdAt.toString();

    return <StoryPageClient story={story} />;
  } catch (error) {
    console.error("Error fetching story:", error);
    return notFound();
  }
}
