import Link from "next/link";
import { useRouter } from "next/navigation";
import "/styles/category.css";
import { useState } from "react";
import { FiBell, FiChevronDown, FiPlusCircle } from "react-icons/fi";
const categories = [
  "all",
  "love",
  "sex",
  "relationship",
  "heartbreak",
  "others",
];
const categoriess = [
  { label: "All stories", value: "all" },
  { label: "Love", value: "love" },
  { label: "Sex", value: "sex" },
  { label: "Relationship", value: "relationship" },
  { label: "Heartbreak", value: "heartbreak" },
  { label: "Others", value: "others" },
];

export default function CategoryTabs({ selectedCategory }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setOpen(false);
    router.push(`/?category=${value}`);
  };
  return (
    <>
      <div className="category-tabs">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`tab ${selectedCategory === cat ? "active-tab" : ""}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
        <Link href="/submit" className="fab-category">
          📨 Submit Anonymous
        </Link>
      </div>

      <div className="mobile-dropdown-container">
        <div className="dropdown-wrapper">
          <div
            className="dropdown-trigger"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>
              {categoriess.find((cat) => cat.value === selectedCategory)
                ?.label || "Select Category"}
            </span>
            <FiChevronDown className={`dropdown-icon ${open ? "open" : ""}`} />
          </div>
          {open && (
            <ul className="dropdown-menu">
              {categoriess.map((cat) => (
                <li
                  key={cat.value}
                  onClick={() => handleSelect(cat.value)}
                  className={`dropdown-item ${
                    selectedCategory === cat.value ? "active" : ""
                  }`}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mobile-fab-wrapper">
          <Link href="/submit" className="mobile-fab" title="Submit a story">
            <FiPlusCircle />
          </Link>
          <Link
            href="/notifications"
            className="notifications"
            title="Notifications"
          >
            <FiBell />
          </Link>
        </div>
      </div>
    </>
  );
}
