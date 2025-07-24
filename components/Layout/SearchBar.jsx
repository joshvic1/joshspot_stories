"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import "/styles/searchBar.css";

export default function SearchBar({ stories = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const results = stories.filter((story) =>
      story.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results.slice(0, 5)); // limit to 5 results
  }, [searchTerm, stories]);

  const handleNavigate = (id) => {
    setSearchTerm("");
    setFilteredResults([]);
    setShowDropdown(false);
    router.push(`/story/${id}`);
  };

  return (
    <div className="search-wrapper">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search anonymous stories..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="search-box"
      />

      {showDropdown && filteredResults.length > 0 && (
        <div className="search-dropdown show">
          {filteredResults.map((story) => (
            <div
              key={story._id}
              className="search-result"
              onClick={() => handleNavigate(story._id)}
            >
              {story.content.slice(0, 100)}...
            </div>
          ))}
        </div>
      )}

      {showDropdown && searchTerm && filteredResults.length === 0 && (
        <div className="search-dropdown show no-result search-no-result">
          No stories found.
        </div>
      )}
    </div>
  );
}
