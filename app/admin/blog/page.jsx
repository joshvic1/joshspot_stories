"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiBold,
  FiEdit2,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiTrash2,
  FiUnderline,
} from "react-icons/fi";
import "/app/admin/styles/blogAdmin.css";

const baseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://joshspot-backend-production.up.railway.app";

const emptyForm = {
  title: "",
  excerpt: "",
  coverImage: "",
  content: "",
  isPublished: true,
};

export default function BlogAdminPage() {
  const editorRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/blogs?includeDrafts=true&limit=100`);
      const data = await res.json();
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch (error) {
      console.error("Failed to load blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const syncEditor = () => {
    updateForm("content", editorRef.current?.innerHTML || "");
  };

  const runCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncEditor();
  };

  const addLink = () => {
    const url = window.prompt("Paste the link URL");
    if (!url) return;
    runCommand("createLink", url);
  };

  const addImage = () => {
    const url = window.prompt("Paste the image URL");
    if (!url) return;
    runCommand("insertImage", url);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      content: blog.content || "",
      isPublished: blog.isPublished !== false,
    });
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = blog.content || "";
    }, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveBlog = async (event) => {
    event.preventDefault();
    const content = editorRef.current?.innerHTML || form.content;
    if (!form.title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        editingId ? `${baseUrl}/api/blogs/${editingId}` : `${baseUrl}/api/blogs`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, content }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save blog");
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete blog post.");
    }
  };

  return (
    <div className="blog-admin">
      <header className="blog-admin-header">
        <div>
          <p>Blog Manager</p>
          <h1>{editingId ? "Edit blog post" : "Create blog post"}</h1>
        </div>
        {editingId && (
          <button type="button" className="blog-admin-ghost" onClick={resetForm}>
            New post
          </button>
        )}
      </header>

      <form className="blog-admin-form" onSubmit={saveBlog}>
        <input
          value={form.title}
          onChange={(e) => updateForm("title", e.target.value)}
          placeholder="Blog title"
          required
        />
        <textarea
          value={form.excerpt}
          onChange={(e) => updateForm("excerpt", e.target.value)}
          placeholder="Short excerpt"
          rows="3"
        />
        <input
          value={form.coverImage}
          onChange={(e) => updateForm("coverImage", e.target.value)}
          placeholder="Cover image URL"
        />

        <div className="blog-editor-shell">
          <div className="blog-editor-toolbar" aria-label="Blog editor toolbar">
            <button type="button" onClick={() => runCommand("bold")} title="Bold">
              <FiBold />
            </button>
            <button type="button" onClick={() => runCommand("italic")} title="Italic">
              <FiItalic />
            </button>
            <button
              type="button"
              onClick={() => runCommand("underline")}
              title="Underline"
            >
              <FiUnderline />
            </button>
            <button
              type="button"
              onClick={() => runCommand("insertUnorderedList")}
              title="Bullet list"
            >
              <FiList />
            </button>
            <button type="button" onClick={addLink} title="Add link">
              <FiLink />
            </button>
            <button type="button" onClick={addImage} title="Add image URL">
              <FiImage />
            </button>
          </div>
          <div
            ref={editorRef}
            className="blog-editor"
            contentEditable
            suppressContentEditableWarning
            onInput={syncEditor}
            data-placeholder="Write your blog content here..."
          />
        </div>

        <label className="blog-admin-check">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => updateForm("isPublished", e.target.checked)}
          />
          Published
        </label>

        <button className="blog-admin-submit" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Save changes" : "Publish blog post"}
        </button>
      </form>

      <section className="blog-admin-list">
        <h2>All blog posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : blogs.length ? (
          blogs.map((blog) => (
            <article className="blog-admin-item" key={blog._id}>
              <div>
                <h3>{blog.title}</h3>
                <p>{blog.isPublished ? "Published" : "Draft"}</p>
              </div>
              <div className="blog-admin-actions">
                <button type="button" onClick={() => startEdit(blog)} title="Edit">
                  <FiEdit2 />
                </button>
                <button type="button" onClick={() => deleteBlog(blog._id)} title="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>No blog posts yet.</p>
        )}
      </section>
    </div>
  );
}
