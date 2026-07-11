import Link from "next/link";

export default function RelatedBlogPosts({ posts = [], variant = "full" }) {
  if (!posts.length) return null;

  return (
    <section
      className={`related-posts ${
        variant === "inline" ? "related-posts-inline" : ""
      }`}
      aria-label="Related blog posts"
    >
      {variant !== "inline" && (
        <div className="related-posts-head">
          <p>Keep reading</p>
          <h2>Related posts</h2>
        </div>
      )}
      <div className="related-posts-grid">
        {posts.map((related) => (
          <Link
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
          </Link>
        ))}
      </div>
    </section>
  );
}
