// utils/api/stories.js

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Fetch stories from backend
 * @param {Object} options
 * @param {string} options.category - story category
 * @param {boolean} options.featured - whether to fetch featured stories
 * @returns {Promise<Object>} response with stories and hasMore
 */
export async function fetchStories({ category = "all", featured } = {}) {
  let queryParams = [];

  if (category !== "all") {
    queryParams.push(`category=${category}`);
  }

  if (typeof featured === "boolean") {
    queryParams.push(`featured=${featured}`);
  }

  const query = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  const res = await fetch(`${BASE_URL}/api/all-stories${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stories");
  }

  return res.json();
}
