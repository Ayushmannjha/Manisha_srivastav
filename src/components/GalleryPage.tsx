import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface GalleryItem {
  _id: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState<null | GalleryItem>(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://manishasrivastav-production.up.railway.app/api/gallery");
      setImages(res.data.data);
    } catch (error) {
      console.log("Error loading gallery", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-xl">
          Loading Gallery...
        </div>
      </section>
    );
  }

  return (
    <section id= "gallery"className="min-h-screen text-white py-16 px-6 flex flex-col items-center ">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-2 ">
          Gallery
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-400/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setOpen(img)}
              >
                <CardContent className="p-0 ">
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="object-cover w-full h-52 sm:h-60 md:h-64"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL PREVIEW */}
      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111827] rounded-xl overflow-hidden shadow-xl border border-gray-700 w-full max-w-4xl"
          >
            <img
              src={open.imageUrl}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 flex justify-end">
              <Button
                onClick={() => setOpen(null)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 font-semibold"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
