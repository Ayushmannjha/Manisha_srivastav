import { useState, useEffect } from "react";
import axios from "axios";

const api_url = "https://manishasrivastav-production.up.railway.app/api/hero";

// ⚙️ Cloudinary credentials (same as About section)
const CLOUD_NAME = "dajhl8jkt";
const UPLOAD_PRESET = "ml_default";

interface HeroData {
  _id?: string;
  name: string;
  tagline: string[];
  description: string;
  image?: string;
  publicId?: string;
}

export default function AdminHeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [form, setForm] = useState<HeroData>({
    name: "",
    tagline: ["", "", ""],
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧩 Fetch Hero data on mount
  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await axios.get(api_url);
      if (res.data) {
        setHero(res.data);
        setForm({
          name: res.data.name || "",
          tagline: res.data.tagline || ["", "", ""],
          description: res.data.description || "",
          image: res.data.image || "",
          publicId: res.data.publicId || "",
        });
        setPreview(res.data.image || null);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 📤 Upload image to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!data.secure_url) throw new Error("Cloudinary upload failed");
    return { secure_url: data.secure_url, public_id: data.public_id };
  };

  // 📸 Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  // 💾 Save or Update Hero
  const handleSave = async () => {
    if (!form.name) {
      alert("Please enter a name");
      return;
    }

    try {
      setLoading(true);

      // ⬆️ Upload new image only if changed
      let uploadedImage = { secure_url: form.image, public_id: form.publicId };
      if (file) uploadedImage = await uploadToCloudinary(file);

      const payload = {
        ...form,
        image: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };

      const res = await axios.post(api_url, payload);
      setHero(res.data.hero);
      setPreview(res.data.hero.image);
      setFile(null);
      alert("✅ Hero section saved successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving Hero section");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Hero
  const handleDelete = async () => {
    if (!hero?._id) return alert("No hero data found");
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      setLoading(true);
      await axios.delete(api_url);
      setHero(null);
      setForm({
        name: "",
        tagline: ["", "", ""],
        description: "",
      });
      setFile(null);
      setPreview(null);
      alert("🗑️ Hero section deleted");
    } catch (err) {
      console.error(err);
      alert("Error deleting Hero section");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTaglineChange = (index: number, value: string) => {
    const updated = [...form.tagline];
    updated[index] = value;
    setForm({ ...form, tagline: updated });
  };

  // 🎨 UI
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300">
          Admin — Hero Section
        </h2>

        <div className="bg-gray-900/60 p-8 rounded-2xl shadow-lg border border-amber-500/20 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-400">Hero Image</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-56 h-56 object-cover rounded-xl mb-3 border border-gray-700 mx-auto"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          {/* Text Fields */}
          <div>
            <label className="block mb-2 text-gray-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          {form.tagline.map((t, i) => (
            <div key={i}>
              <label className="block mb-2 text-gray-400">Tagline {i + 1}</label>
              <input
                value={t}
                onChange={(e) => handleTaglineChange(i, e.target.value)}
                placeholder={`Enter tagline ${i + 1}`}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter short description"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition"
            >
              {loading ? "Saving..." : hero ? "Update" : "Create"}
            </button>
            {hero && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded font-semibold transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {hero && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-amber-300">Preview</h3>
            {hero.image && (
              <img
                src={hero.image}
                alt="Hero"
                className="mx-auto w-64 h-64 object-cover rounded-xl mb-6"
              />
            )}
            <h4 className="text-3xl font-bold mb-2">{hero.name}</h4>
            <div className="flex justify-center gap-3 text-gray-400 italic mb-4">
              {hero.tagline.map((t, i) => (
                <span key={i}>• {t}</span>
              ))}
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">{hero.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
