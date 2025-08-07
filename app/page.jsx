import StoryPage from "@/components/StoryPage";
import MainLayout from "@/components/Layout/MainLayout";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  const selectedCategory = searchParams?.category || "all";

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const featuredUrl = `${baseUrl}/api/all-stories?featured=true&category=${selectedCategory}&limit=5`;
  const regularUrl = `${baseUrl}/api/all-stories?featured=false&category=${selectedCategory}&limit=10`;

  const [featuredRes, regularRes] = await Promise.all([
    fetch(featuredUrl),
    fetch(regularUrl),
  ]);

  const featuredData = await featuredRes.json();
  const regularData = await regularRes.json();

  return (
    <MainLayout>
      <StoryPage
        featuredStories={featuredData.stories || []}
        regularStories={regularData.stories || []}
        selectedCategory={selectedCategory}
      />
    </MainLayout>
  );
}
