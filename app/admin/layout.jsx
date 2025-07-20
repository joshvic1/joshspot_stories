"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiEdit2,
  FiBookOpen,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "/app/admin/styles/adminSidebar.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <FiHome /> },
    { label: "Create Story", href: "/admin/create", icon: <FiEdit2 /> },
    { label: "Manage Stories", href: "/admin/manage", icon: <FiBookOpen /> },
  ];

  return (
    <div style={{ display: "flex" }}>
      {isMobile && (
        <button
          className="admin-toggle-btn"
          onClick={() => setIsOpen(true)}
          style={{ position: "fixed", zIndex: 1100 }}
        >
          <FiMenu />
        </button>
      )}

      <aside className={`admin-sidebar ${isOpen ? "expanded" : ""}`}>
        <button className="admin-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isMobile ? <FiX /> : isOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="admin-sidebar-nav">
          {(isOpen || isMobile) && <h1>Admin Dashboard</h1>}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="admin-sidebar-link"
              style={{
                backgroundColor:
                  pathname === item.href ? "rgba(0,0,0,0.3)" : "transparent",
              }}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="admin-icon">{item.icon}</span>
              {(isOpen || isMobile) && (
                <span className="admin-label">{item.label}</span>
              )}
            </Link>
          ))}

          <button
            className="admin-sidebar-link"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/admin/login");
            }}
          >
            <span className="admin-icon">
              <FiLogOut />
            </span>
            {(isOpen || isMobile) && (
              <span className="admin-label">Logout</span>
            )}
          </button>
        </nav>
      </aside>

      <main style={{ marginLeft: isOpen ? 200 : 60, padding: "20px", flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
