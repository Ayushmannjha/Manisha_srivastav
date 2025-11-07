import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function AdminMyActivity() {
  const [images, setImages] = useState<
    { _id: string; imageUrl: string; publicId: string }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://manishasrivastav-production.up.railway.app/api/my-activity";

  // 🧾 Fetch all images
  const fetchImages = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 📤 Upload image
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Upload failed");
      } else {
        await fetchImages();
        setFile(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
  };

  // ❌ Delete image
  const handleDelete = async (publicId: string) => {
    if (!window.confirm("Delete this image?")) return;

    try {
        console.log("Deleting image with publicId:", publicId);
      const res = await fetch(`${BASE_URL}/${publicId}`, { method: "DELETE" });

      if (!res.ok) {
        console.error("Delete failed");
      } else {
        await fetchImages();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#0d1117] text-white py-10 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        My Activity
      </h1>

      {/* Upload Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-gray-300"
        />
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {images.map((img) => (
          <Card
            key={img._id}
            className="bg-[#111827] border border-gray-700 rounded-lg overflow-hidden"
          >
            <CardContent className="p-0 relative">
              <img
                src={img.imageUrl}
                alt="Activity"
                className="object-cover w-full h-64"
              />
              <Button
                onClick={() => handleDelete(img.publicId)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
