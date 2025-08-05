import StoryPageClient from "@/components/Comments/StoryPageClient";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getStoryById(id) {
  try {
    const res = await fetch(`${baseUrl}/api/story/${id}`, {
      cache: "no-store", // optional: ensures fresh fetch every time
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch story");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default async function StoryPage({ params }) {
  const { id } = params;

  const result = await getStoryById(id);

  if (!result.success) return notFound();

  return <StoryPageClient story={result.data} />;
}
