import { useEffect, useState } from "react";
import axios from "axios";
import {  Edit, Trash2, Plus } from "lucide-react";

const api_url = "http://localhost:5000/api/posts";

// 🟣 Cloudinary credentials
const CLOUD_NAME = "dajhl8jkt";
const UPLOAD_PRESET = "ml_default";

interface Post {
  _id?: string;
  title: string;
  date: string;
  preview: string;
  image?: string; // Cloudinary secure_url
  publicId?: string; // Cloudinary public_id
  category: "Lyrics" | "Blog";
  content?: string;
}

export default function AdminLyrics() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<Post>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    preview: "",
    image: "",
    publicId: "",
    category: "Blog",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setFetching(true);
      const res = await axios.get(api_url);
      setPosts(res.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setFetching(false);
    }
  };

  // 🟣 Upload image to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Cloudinary upload response:", data);

      if (data.secure_url && data.public_id) {
        setForm((prev) => ({
          ...prev,
          image: data.secure_url,
          publicId: data.public_id,
        }));
      } else {
        alert("⚠️ Image upload failed");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("❌ Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  // 🟢 Save or update post
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.preview.trim())
      return alert("⚠️ Please fill all required fields");
    try {
      console.log("Submitting post:", form);
      setLoading(true);
      if (editing?._id) {
        await axios.put(`${api_url}/${editing._id}`, form);
        alert("✅ Post updated successfully!");
      } else {
        await axios.post(api_url, form);
        alert("✅ Post created successfully!");
      }
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving post");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete post (and Cloudinary image)
  const handleDelete = async (id: string, publicId?: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      console.log("Deleting post with ID:", id, "and publicId:", publicId);
      await axios.delete(`${api_url}/${id}`, {
        data: { publicId }, // send publicId to backend
      });
      alert("🗑️ Post and image deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting post");
    }
  };

  const handleEdit = (post: Post) => {
    setEditing(post);
    setForm(post);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      preview: "",
      image: "",
      publicId: "",
      category: "Blog",
      content: "",
    });
  };

  return (
    <section className="relative py-24 bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-10">
          Admin — Manage Lyrics & Blogs
        </h2>

        {/* 🧾 Form Section */}
        <div className="bg-gray-900/50 p-8 rounded-2xl border border-amber-500/20 shadow-lg mb-12">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            {editing ? <Edit className="text-amber-400" /> : <Plus className="text-purple-400" />}
            {editing ? "Edit Post" : "Add New Post"}
          </h3>

          {/* Title + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Preview */}
          <textarea
            name="preview"
            value={form.preview}
            onChange={(e) => setForm({ ...form, preview: e.target.value })}
            placeholder="Short preview"
            rows={3}
            className="mt-6 w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500"
          />

          {/* Image Upload */}
          <div className="mt-6 flex flex-col gap-3">
            <label className="font-semibold">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading ? (
              <p className="text-sm text-gray-400">Uploading image...</p>
            ) : form.image ? (
              <div className="flex items-center gap-3">
                <img
                  src={form.image}
                  alt="Uploaded"
                  className="w-24 h-24 rounded object-cover border border-amber-500/40"
                />
                <span className="text-sm text-green-400 break-all">{form.image}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No image uploaded</p>
            )}
          </div>

          {/* 🟣 Public ID input (auto-filled) */}
          <div className="mt-4">
            <label className="font-semibold text-sm text-gray-300 mb-1 block">
              Cloudinary Public ID
            </label>
            <input
              type="text"
              name="publicId"
              value={form.publicId || ""}
              onChange={(e) => setForm({ ...form, publicId: e.target.value })}
              placeholder="Public ID of uploaded image"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500 text-green-300"
              readOnly={!editing} // editable only in edit mode
            />
          </div>

          {/* Category + Content */}
          <select
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as "Lyrics" | "Blog" })}
            className="mt-6 w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500"
          >
            <option value="Blog">Blog</option>
            <option value="Lyrics">Lyrics</option>
          </select>

          <textarea
            name="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Full content / lyrics"
            rows={3}
            className="mt-6 w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-purple-500"
          />

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold flex-1"
            >
              {loading ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </button>
            {editing && (
              <button
                onClick={resetForm}
                className="bg-gray-700 hover:bg-gray-800 p-3 rounded font-semibold flex-1"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* 🧠 Posts List */}
        {fetching ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 italic">No posts available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-900/40 border border-amber-500/20 rounded-xl p-4 shadow-lg"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{post.preview}</p>
                <p className="text-xs text-gray-500 break-all mb-2">
                  Public ID: {post.publicId || "—"}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 bg-amber-600/40 hover:bg-amber-600/60 rounded text-sm flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => post._id && handleDelete(post._id, post.publicId)}
                    className="px-3 py-1 bg-red-600/40 hover:bg-red-600/60 rounded text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
