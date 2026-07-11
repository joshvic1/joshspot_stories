import { notFound } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import BlogAd from "@/components/BlogAd";
import BlogContent from "@/components/BlogContent";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";

const baseUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://joshspot-backend-production.up.railway.app";

async function getBlog(id) {
  try {
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  return {
    title: blog?.title ? `${blog.title} | Joshspot Blog` : "Joshspot Blog",
    description: blog?.excerpt || "Read this Joshspot blog post.",
  };
}

export default async function BlogDetailsPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) return notFound();

  return (
    <MainLayout>
      <article className="blog-detail">
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} className="blog-hero-image" />
        )}
        <header className="blog-detail-head">
          <p>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Joshspot Blog"}
          </p>
          <h1>{blog.title}</h1>
          {blog.excerpt && <p className="blog-excerpt">{blog.excerpt}</p>}
        </header>

        <BlogAd index={0} />
        <BlogContent html={blog.content} seed={blog._id || id} />
      </article>
    </MainLayout>
  );
}
