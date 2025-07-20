import StoryCard from "../StoryCard/StoryCard";

export default function StoryList({
  featuredStories,
  filteredStories,
  hasMounted,
  loading,
}) {
  return (
    <>
      {/* Featured */}
      {featuredStories.length > 0 && (
        <section className="section">
          <h2 className="section-title">🔥 Featured Stories</h2>
          <div className="story-grid">
            {featuredStories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* Regular */}
      {hasMounted && (
        <section className="section">
          <h2 className="section-title">🔥 Recent Stories</h2>
          <div className="story-list">
            {!filteredStories ? (
              <p className="text-gray-500">Loading...</p>
            ) : filteredStories.length === 0 ? (
              <p className="text-gray-500">No stories found.</p>
            ) : (
              filteredStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))
            )}
          </div>
        </section>
      )}

      {/* Loading more indicator */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading more...</p>
      )}
    </>
  );
}
