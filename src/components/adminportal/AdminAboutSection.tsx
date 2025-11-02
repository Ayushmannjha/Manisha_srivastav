import { useEffect, useState } from "react";
import axios from "axios";

const api_url = "https://manishasrivastav-production.up.railway.app/api/about";

// ⚙️ Your Cloudinary details (replace with your real values)
const CLOUD_NAME = "dajhl8jkt";
const UPLOAD_PRESET = "ml_default";

interface AboutData {
  _id?: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote: string;
  image?: string; // Cloudinary secure_url
  publicId?: string; // Cloudinary public_id
}

export default function AdminAboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [form, setForm] = useState<AboutData>({
    title: "",
    subtitle: "",
    paragraphs: ["", "", ""],
    quote: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(api_url);
      if (res.data) {
        setAbout(res.data);
        setForm({
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
          paragraphs: res.data.paragraphs || ["", "", ""],
          quote: res.data.quote || "",
          image: res.data.image || "",
          publicId: res.data.publicId || "",
        });
        setPreview(res.data.image || null);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!form.title) {
      alert("Please enter a title");
      return;
    }

    try {
      setLoading(true);

      let uploadedImage = { secure_url: form.image, public_id: form.publicId };
      if (file) {
        uploadedImage = await uploadToCloudinary(file);
      }

      const payload = {
        ...form,
        image: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };

      const res = await axios.post(api_url, payload);
      setAbout(res.data.about);
      setPreview(res.data.about.image);
      setFile(null);
      alert("✅ About section saved successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving About section");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!about?._id) return alert("No about data found");
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      setLoading(true);
      await axios.delete(`${api_url}/${about._id}`);
      setAbout(null);
      setForm({
        title: "",
        subtitle: "",
        paragraphs: ["", "", ""],
        quote: "",
      });
      setFile(null);
      setPreview(null);
      alert("🗑️ About section deleted");
    } catch (err) {
      console.error(err);
      alert("Error deleting section");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...form.paragraphs];
    updated[index] = value;
    setForm({ ...form, paragraphs: updated });
  };

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300">
          Admin — About Section
        </h2>

        <div className="bg-gray-900/60 p-8 rounded-2xl shadow-lg border border-amber-500/20 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-400">Image</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-56 h-56 object-cover rounded-xl mb-3 border border-gray-700"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          {/* Text fields */}
          <div>
            <label className="block mb-2 text-gray-400">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Subtitle</label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Enter subtitle"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          {form.paragraphs.map((p, i) => (
            <div key={i}>
              <label className="block mb-2 text-gray-400">
                Paragraph {i + 1}
              </label>
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(i, e.target.value)}
                rows={3}
                placeholder={`Enter paragraph ${i + 1}`}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-gray-400">Quote</label>
            <input
              name="quote"
              value={form.quote}
              onChange={handleChange}
              placeholder="Enter quote"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition"
            >
              {loading ? "Saving..." : about ? "Update" : "Create"}
            </button>
            {about && (
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
        {about && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-2 text-amber-300">
              Preview
            </h3>
            {about.image && (
              <img
                src={about.image}
                alt="About"
                className="mx-auto w-64 h-64 object-cover rounded-xl mb-6"
              />
            )}
            <h4 className="text-xl font-bold mb-2">{about.title}</h4>
            <h5 className="text-gray-400 italic mb-4">{about.subtitle}</h5>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-300 mb-3">
                {p}
              </p>
            ))}
            <blockquote className="text-purple-400 italic mt-6">
              “{about.quote}”
            </blockquote>
          </div>
        )}
      </div>
    </section>
  );
}
