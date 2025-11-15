import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function MyActivity() {
  const [activities, setActivities] = useState<
    { _id: string; title: string; description: string; imageUrl: string; publicId: string }[]
  >([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<null | {
    title: string;
    description: string;
    imageUrl: string;
  }>(null);

  const BASE_URL = "https://manishasrivastav-production.up.railway.app/api/my-activity";

  // 🧾 Fetch all activities
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch activities");
      const data = await res.json();
      if (data.success) setActivities(data.data);
      else setActivities([]);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const visibleActivities = activities.slice(0, visibleCount);

  // 🌀 Loading
  if (loading) {
    return (
      <section className="py-24 text-center text-white bg-black">
        <div className="animate-pulse text-gray-400 text-lg">
          Loading your activities...
        </div>
      </section>
    );
  }

  // 📭 No Data
  if (!activities.length) {
    return (
      <section className="py-24 text-center text-gray-300 bg-black">
        <p className="text-xl">No activities found yet.</p>
      </section>
    );
  }

  return (
    <section
      id="myActivity"
      className="min-h-screen text-white py-16 px-6 flex flex-col items-center bg-gradient-to-b from-black via-[#0d1117] to-black"
    >
      {/* 🏷️ Header */}
      <div className="text-center mb-16 transition-all duration-700">
        <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
          My Activity
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        <p className="text-gray-400 max-w-2xl mx-auto">
          Dive into the moments behind the music and the stories behind every song.
        </p>
      </div>

      {/* 🖼️ Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        <AnimatePresence>
          {visibleActivities.map((act, index) => (
            <motion.div
              key={act._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-400/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setSelected({
                    title: act.title,
                    description: act.description,
                    imageUrl: act.imageUrl,
                  })
                }
              >
                <CardContent className="p-0 relative">
                  <img
                    src={act.imageUrl}
                    alt={act.title}
                    className="object-cover w-full h-64"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x400?text=Image+Not+Found")
                    }
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-3 py-2">
                    <p className="text-sm font-semibold text-amber-300 truncate">
                      {act.title || "Untitled"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 🧭 View More / View Less */}
      {activities.length > 5 && (
        <div className="mt-12">
          {visibleCount < activities.length ? (
            <Button
              onClick={() => setVisibleCount(activities.length)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              View More
            </Button>
          ) : (
            <Button
              onClick={() => setVisibleCount(5)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              View Less
            </Button>
          )}
        </div>
      )}

      {/* 🪶 Description Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#1f2937] rounded-xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden border border-gray-700"
          >
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="w-full h-100 object-fit"
            />
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold text-amber-300 mb-3">
                {selected.title}
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {selected.description}
              </p>
              <div className="text-right mt-6">
                <Button
                  onClick={() => setSelected(null)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
