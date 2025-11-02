import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";

const api_url = "http://localhost:5000/api/videos"; // ⚙️ replace with your backend URL

interface Video {
  _id?: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  order?: number;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState<Video>({ title: "", youtubeId: "", thumbnail: "", order: 0 });
  const [editing, setEditing] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get(api_url);
    setVideos(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.youtubeId) return alert("Please fill required fields");
    try {
      setLoading(true);
      if (editing?._id) {
        await axios.put(`${api_url}/${editing._id}`, form);
        alert("✅ Video updated");
      } else {
        await axios.post(api_url, form);
        alert("✅ Video added");
      }
      setForm({ title: "", youtubeId: "", thumbnail: "", order: 0 });
      setEditing(null);
      fetchVideos();
    } catch (err) {
      alert("Error saving video");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this video?")) return;
    await axios.delete(`${api_url}/${id}`);
    fetchVideos();
  };

  const handleEdit = (v: Video) => {
    setEditing(v);
    setForm(v);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", youtubeId: "", thumbnail: "", order: 0 });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-10 text-center">
          Admin — Manage Videos
        </h2>

        {/* Form */}
        <div className="bg-gray-900/60 border border-amber-500/20 rounded-2xl p-6 mb-10">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Plus className="text-purple-400" /> {editing ? "Edit Video" : "Add New Video"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="bg-gray-800 border border-gray-700 p-3 rounded"
            />
            <input
              type="text"
              name="youtubeId"
              value={form.youtubeId}
              onChange={handleChange}
              placeholder="YouTube Video ID"
              className="bg-gray-800 border border-gray-700 p-3 rounded"
            />
            <input
              type="text"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="bg-gray-800 border border-gray-700 p-3 rounded"
            />
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              placeholder="Order"
              className="bg-gray-800 border border-gray-700 p-3 rounded"
            />
            
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded"
            >
              {loading ? "Saving..." : editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button onClick={resetForm} className="bg-gray-700 px-6 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Video List */}
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((v) => (
            <div key={v._id} className="bg-gray-900/40 p-4 rounded-xl border border-gray-700">
              <div className="aspect-video mb-2">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover rounded" />
              </div>
              <h4 className="text-lg font-semibold mb-1">{v.title}</h4>
              <p className="text-gray-400 text-sm mb-3">YouTube ID: {v.youtubeId}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(v)}
                  className="px-3 py-1 bg-amber-600/40 hover:bg-amber-600/60 rounded flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(v._id!)}
                  className="px-3 py-1 bg-red-600/40 hover:bg-red-600/60 rounded flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
