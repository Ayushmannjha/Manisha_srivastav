import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Music2, BookOpen, Calendar, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Post {
  _id: string;
  title: string;
  date: string;
  preview: string;
  image: string;
  category: string;
  content: string;
}

export function LyricsSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // ⭐ New: Only load 5 initially
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://manishasrivastav-production.up.railway.app/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const musicalSymbols = ["♪", "♫", "♬", "♩", "♭", "♮", "♯"];

  const getGradientByCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "lyrics":
        return "from-purple-700 via-indigo-600 to-blue-600";
      case "story":
        return "from-rose-600 via-pink-600 to-purple-700";
      case "poem":
        return "from-amber-600 via-orange-500 to-red-600";
      default:
        return "from-gray-600 via-slate-500 to-zinc-700";
    }
  };

  return (
    <section id="lyrics" ref={ref} className="relative py-24 overflow-hidden bg-black">
      
      {/* Floating symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl text-amber-400 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            {musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)]}
          </div>
        ))}
      </div>

      {/* Waveforms */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="d"
              values="M0,50 Q25,30 50,50 T100,50;
                      M0,50 Q25,70 50,50 T100,50;
                      M0,50 Q25,30 50,50 T100,50"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            Lyrics & Stories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive into the words behind the music and the stories behind the songs
          </p>
        </div>

        {/* Posts */}
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.slice(0, visibleCount).map((post, index) => (
              <div
                key={post._id}
                className={`transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                <Card
                  className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-amber-500/20 hover:border-amber-500/60 transition-all overflow-hidden group cursor-pointer h-full"
                  onClick={() => setSelectedPost(post)}
                >
                  <div
                    className={`relative aspect-video overflow-hidden flex items-center justify-center bg-gradient-to-br ${getGradientByCategory(
                      post.category
                    )}`}
                  >
                    {post.image ? (
                      <ImageWithFallback src={post.image} alt={post.title} />
                    ) : (
                      <h3 className="text-2xl md:text-3xl font-extrabold text-center px-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-amber-400">
                        {post.title}
                      </h3>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/50 rounded-full text-white text-xs flex items-center gap-1">
                        {post.category === "Lyrics" ? (
                          <Music2 className="w-3 h-3" />
                        ) : (
                          <BookOpen className="w-3 h-3" />
                        )}
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-2 text-amber-300 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-3">
                      {post.preview || post.content?.slice(0, 100) + "..."}
                    </p>

                    <div className="mt-4">
                      <span className="text-amber-400 text-sm hover:text-amber-300 transition-colors group-hover:underline inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* ⭐ Load More Button */}
        {visibleCount < posts.length && !loading && (
          <div
            className={`text-center mt-12 transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-8 py-3 bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-pink-600/30 border-2 border-amber-500/50 rounded-full text-amber-300 hover:scale-105 transition-all"
            >
              View More Posts
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-gradient-to-b from-purple-950 to-black max-w-3xl w-full rounded-2xl shadow-2xl border border-amber-500/30 relative animate-fadeIn overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[80vh] overflow-y-auto p-6 custom-scrollbar">
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full rounded-lg mb-4"
                />
              )}

              <h2 className="text-3xl font-bold text-amber-300 mb-3">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
              </div>

              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {selectedPost.content}
              </div>
            </div>
          </div>

          {/* Styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #fbbf24, #a855f7);
              border-radius: 4px;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
              50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
            }
            .animate-float { animation: float linear infinite; }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.25s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
