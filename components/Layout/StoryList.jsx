import StoryCard from "../StoryCard/StoryCard";
import { FaFire } from "react-icons/fa";
import "/styles/featured.css";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

export default function StoryList({
  featuredStories,
  filteredStories,
  hasMounted,
  loading,
}) {
  const presetImages = [
    "/featured-1.png",
    "/featured-2.png",
    "/featured-3.png",
    "/featured-4.png",
    "/featured-5.png",
    "/featured-6.png",
    "/featured-7.png",
    "/featured-8.png",
    "/featured-9.png",
    "/featured-10.png",
    "/featured-11.png",
    "/featured-12.png",
    "/featured-13.png",
    "/featured-14.png",
    "/featured-15.png",
    "/featured-16.png",
    "/featured-17.png",
    "/featured-18.png",
    "/featured-19.png",
    "/featured-20.png",
    "/featured-21.png",
  ];
  const router = useRouter();
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * presetImages.length);
    return presetImages[randomIndex];
  };
  return (
    <>
      {/* Featured Slider */}
      {featuredStories.length > 0 && (
        <section className="section featured-slider-wrapper">
          <h2 className="section-title">
            <FaFire style={{ marginRight: "5px" }} /> Featured Stories
          </h2>

          <div className="slider-buttons">
            <button onClick={() => scroll("left")} className="arrow-button">
              <FiChevronLeft />
            </button>
            <button onClick={() => scroll("right")} className="arrow-button">
              <FiChevronRight />
            </button>
          </div>

          <div className="featured-slider" ref={scrollRef}>
            {featuredStories.map((story) => (
              <div
                key={story._id}
                className="featured-card"
                onClick={() => router.push(`/story/${story._id}`)}
                style={{
                  backgroundImage: `url(${getRandomImage()})`,
                }}
              >
                <div className="overlay">
                  <p className="featured-text">
                    {story.content.slice(0, 200)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Regular */}
      {hasMounted && (
        <section className="section">
          <h2 className="section-title">
            <FaFire style={{ marginRight: "5px" }} /> Recent Stories
          </h2>
          <div className="story-list">
            {!hasMounted || filteredStories === undefined ? (
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
