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

async function getRelatedBlogs(currentId) {
  try {
    const res = await fetch(`${baseUrl}/api/blogs?page=1&limit=60`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const blogs = (data.blogs || []).filter((blog) => blog._id !== currentId);

    return blogs
      .map((blog) => ({
        blog,
        sort: Math.sin(
          Array.from(`${currentId}-${blog._id}`).reduce(
            (total, char) => total + char.charCodeAt(0),
            0
          )
        ),
      }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 10)
      .map(({ blog }) => blog);
  } catch {
    return [];
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
  const [blog, relatedBlogs] = await Promise.all([getBlog(id), getRelatedBlogs(id)]);

  if (!blog) return notFound();

  return (
    <MainLayout>
      <article className="blog-detail">
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} className="blog-hero-image" />
        )}
        <header className="blog-detail-head">
          <h1>{blog.title}</h1>
          {blog.excerpt && <p className="blog-excerpt">{blog.excerpt}</p>}
        </header>

        <BlogAd index={0} />
        <BlogContent html={blog.content} seed={blog._id || id} />

        {relatedBlogs.length > 0 && (
          <section className="related-posts" aria-labelledby="related-posts-title">
            <div className="related-posts-head">
              <p>Keep reading</p>
              <h2 id="related-posts-title">Related posts</h2>
            </div>
            <div className="related-posts-grid">
              {relatedBlogs.map((related) => (
                <a
                  href={`/blog/${related._id}`}
                  className="related-post-card"
                  key={related._id}
                >
                  {related.coverImage ? (
                    <img src={related.coverImage} alt={related.title} />
                  ) : (
                    <div className="related-post-fallback">
                      <span>Joshspot</span>
                    </div>
                  )}
                  <div>
                    <h3>{related.title}</h3>
                    {related.excerpt && <p>{related.excerpt}</p>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
}
