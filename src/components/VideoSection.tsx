import { useRef, useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const API_URL = "http://localhost:5000/api/videos"; // 🔧 Replace with your backend API

export function VideoSection() {
  const ref = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videos, setVideos] = useState<
    { _id: string; youtubeId: string; title: string; thumbnail: string }[]
  >([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  // ✅ Intersection observer for fade-in animation
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

  // ✅ Fetch videos dynamically from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log("Fetched videos:", data);

        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
          setSelectedVideo(data[0].youtubeId); // default main video
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  // ✅ Scroll carousel
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="videos"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            Performances
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch exclusive performances and music videos from the stage
          </p>
        </div>

        {/* Main Video Player */}
        {selectedVideo && (
          <div
            className={`relative mb-8 group transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30" />

            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Light Effects */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-400 rounded-full blur-sm opacity-70 animate-pulse" />
            <div
              className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full blur-sm opacity-70 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full blur-sm opacity-70 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-400 rounded-full blur-sm opacity-70 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        )}

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Carousel Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-purple-900/80 hover:bg-purple-800 text-white rounded-full shadow-lg backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-purple-900/80 hover:bg-purple-800 text-white rounded-full shadow-lg backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel Content */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video, index) => (
              <div
                key={video._id}
                onClick={() => setSelectedVideo(video.youtubeId)}
                className="relative cursor-pointer group hover:scale-105 transition-all duration-300 flex-shrink-0 w-64"
                style={{ transitionDelay: `${350 + index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity" />

                <div
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVideo === video.youtubeId
                      ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                      : "border-purple-500/30 hover:border-purple-500/60"
                  }`}
                >
                  <img
                    src={
                      video.thumbnail === "NA"
                        ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                        : video.thumbnail
                    }
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-amber-500/80 transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm">{video.title}</p>
                  </div>
                </div>
              </div>
            ))}
            {videos.length === 0 && (
              <p className="text-gray-400 text-center w-full">No videos found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
