import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function MyActivity() {
  const [images, setImages] = useState<
    { _id: string; imageUrl: string; publicId: string }[]
  >([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://manishasrivastav-production.up.railway.app/api/my-activity";

  // 🧾 Fetch all images
  const fetchImages = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      console.log("Fetched images:", data);
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const visibleImages = images.slice(0, visibleCount);

  // 🌀 Loading state
  if (loading) {
    return (
      <section className="py-24 text-center text-white bg-black">
        Loading images...
      </section>
    );
  }

  // 📭 No images state
  if (!images.length) {
    return (
      <section className="py-24 text-center text-gray-300 bg-black">
        No images found.
      </section>
    );
  }

  return (
    <section id="myActivity" className="min-h-screen  text-white py-16 px-6 flex flex-col items-center">
      {/* 🏷️ Header */}
      <div
          className={`text-center mb-16 transition-all duration-700 `}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            My Activity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive into the moments behind the music and the stories behind every song.
          </p>
        </div>

      {/* 🖼️ Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {visibleImages.map((img) => (
          <Card
            key={img._id}
            className="bg-[#111827] border border-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-0">
              <img
                src={img.imageUrl}
                alt="Activity"
                className="object-cover w-full h-64"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/400x400?text=Image+Not+Found")
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🧭 View More Button */}
      {visibleCount < images.length && (
        <div className="mt-10">
          <Button
            onClick={() => setVisibleCount(images.length)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full"
          >
            View More
          </Button>
        </div>
      )}
    </section>
  );
}
