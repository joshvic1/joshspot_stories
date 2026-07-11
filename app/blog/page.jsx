import { Fragment } from "react";
import Link from "next/link";
import MainLayout from "@/components/Layout/MainLayout";
import BlogAd from "@/components/BlogAd";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";

const baseUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://joshspot-backend-production.up.railway.app";

async function getBlogs() {
  try {
    const res = await fetch(`${baseUrl}/api/blogs?page=1&limit=20`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs || [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Blog | Joshspot Stories",
  description: "Read Joshspot blog posts, stories, updates, and guides.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <MainLayout>
      <section className="blog-index">
        <div className="blog-index-head">
          <p>Joshspot Blog</p>
          <h1>Fresh gist, guides, and stories</h1>
        </div>

        <BlogAd index={0} />

        <div className="blog-grid">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Fragment key={blog._id}>
                <Link href={`/blog/${blog._id}`} className="blog-card">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="blog-card-image"
                    />
                  )}
                  <div className="blog-card-body">
                    <span>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Joshspot"}
                    </span>
                    <h2>{blog.title}</h2>
                    {blog.excerpt && <p>{blog.excerpt}</p>}
                  </div>
                </Link>
                {(index + 1) % 3 === 0 && index < blogs.length - 1 && (
                  <div className="blog-grid-ad">
                    <BlogAd index={index + 1} />
                  </div>
                )}
              </Fragment>
            ))
          ) : (
            <div className="blog-empty">No blog posts yet.</div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
