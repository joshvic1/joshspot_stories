import dbConnect from "@/lib/dbConnect"; //This is my database connect
import Story from "@/models/Story";
import StoryPage from "@/components/StoryPage";
import MainLayout from "@/components/Layout/MainLayout";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  await dbConnect();

  const selectedCategory = searchParams?.category || "all";

  const featuredStories = await Story.find({
    isPublic: true,
    isFeatured: true,
    ...(selectedCategory !== "all" && { category: selectedCategory }),
  })
    .sort({ createdAt: -1 })
    .lean();

  const regularStories = await Story.find({
    isPublic: true,
    isFeatured: false,
    ...(selectedCategory !== "all" && { category: selectedCategory }),
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <MainLayout>
      <StoryPage
        featuredStories={JSON.parse(JSON.stringify(featuredStories))}
        regularStories={JSON.parse(JSON.stringify(regularStories))}
        selectedCategory={selectedCategory}
      />
    </MainLayout>
  );
}
