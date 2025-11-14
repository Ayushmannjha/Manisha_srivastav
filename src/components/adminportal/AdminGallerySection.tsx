import React, { useState, useEffect } from "react";

interface GalleryItem {
  _id: string;
  imageUrl: string;
  publicId: string;
}

const AdminGallerySection: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------
  // ✅ FETCH ALL IMAGES
  // ---------------------------------------------------
  const fetchGallery = async () => {
    try {
      const res = await fetch("https://manishasrivastav-production.up.railway.app/api/gallery");
      const data = await res.json();

      setGallery(data.data); // Correct response structure
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ---------------------------------------------------
  // ✅ UPLOAD IMAGE
  // ---------------------------------------------------
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8080/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setGallery((prev) => [data.data, ...prev]); // Insert new image
        setFile(null);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error");
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // ✅ DELETE IMAGE
  // ---------------------------------------------------
  const handleDelete = async (publicId: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/gallery/${publicId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setGallery((prev) =>
          prev.filter((item) => item.publicId !== publicId)
        );
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting");
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Admin Gallery Dashboard
      </h1>

      {/* UPLOAD BOX */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 w-full">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">
    Upload Image
  </h2>

  {/* Responsive Upload Row */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">

    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
      className="border p-2 rounded text-gray-700 w-full sm:w-auto flex-1"
    />

    {/* Upload Button */}
    <button
      onClick={handleUpload}
      disabled={loading || !file}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700
                 disabled:opacity-50 w-full sm:w-auto"
    >
      {loading ? "Uploading..." : "Upload"}
    </button>
  </div>


        {/* Preview */}
        {file && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Preview:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-32 h-32 object-cover rounded shadow"
            />
          </div>
        )}
      </div>

      {/* GALLERY GRID */}
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Uploaded Images
      </h2>

      {gallery.length === 0 ? (
        <p className="text-gray-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="relative bg-white shadow rounded overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt="gallery"
                className="w-full h-40 object-cover"
              />

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(item.publicId)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 px-2 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallerySection;
