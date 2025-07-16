import Link from "next/link";

const categories = [
  "all",
  "love",
  "sex",
  "relationship",
  "heartbreak",
  "others",
];

export default function CategoryTabs({ selectedCategory }) {
  return (
    <div className="category-tabs">
      {categories.map((cat) => (
        <a
          key={cat}
          href={`/?category=${cat}`}
          className={`tab ${selectedCategory === cat ? "active-tab" : ""}`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </a>
      ))}
      <Link href="/submit" className="fab-category">
        📨 Submit Anonymous
      </Link>
    </div>
  );
}
