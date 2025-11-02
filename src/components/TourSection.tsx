import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "lucide-react";

export function TourSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/posts"; // your backend

  // 👁️ Animate on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 🔥 Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // ✅ Always ensure each post has a valid image
        const normalized = data.map((p: any) => {
          const query = encodeURIComponent(p.title || "music");
          const imageUrl =
            p.image && p.image !== "NA"
              ? p.image
              : `https://source.unsplash.com/600x400/?${query},music`;

          return { ...p, image: imageUrl };
        });

        setPosts(normalized);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const musicalSymbols = ["♪", "♫", "♬", "♩", "♭", "♮", "♯"];

  if (loading) {
    return (
      <section className="py-24 text-center text-white bg-black">
        Loading posts...
      </section>
    );
  }

  return (
    <section
      id="lyrics"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/5 to-black overflow-hidden"
    >
      {/* Floating Background */}
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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
            Dive into the words behind the music and the stories behind the songs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-amber-500/20 hover:border-amber-500/60 transition-all overflow-hidden group cursor-pointer h-full">
                {/* 🖼️ Image */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* 📝 Text */}
                <CardContent className="p-6">
                  <h3 className="text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-amber-300 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date || "Unknown date"}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {post.preview || "No description available."}
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

        {/* Footer Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="px-8 py-3 bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-pink-600/30 border-2 border-amber-500/50 rounded-full text-amber-300 hover:scale-105 transition-all">
            View All Posts
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>
    </section>
  );
}