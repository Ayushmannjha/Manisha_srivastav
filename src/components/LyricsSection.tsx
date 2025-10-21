import { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Music2, BookOpen, Calendar } from 'lucide-react';

export function LyricsSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const posts = [
    {
      title: 'Soulful Journey - Lyrics & Meaning',
      date: 'October 15, 2024',
      preview: 'Explore the deep meaning behind the lyrics of "Soulful Journey" - a song about finding oneself through music and life experiences...',
      image: 'https://images.unsplash.com/photo-1606943537055-6cef4e5d3b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Lyrics',
    },
    {
      title: 'Behind the Scenes: Recording Eternal Melodies',
      date: 'September 28, 2024',
      preview: 'Take a peek into the creative process behind my latest album. From late-night sessions to finding the perfect harmony...',
      image: 'https://images.unsplash.com/photo-1715751036456-9e3b3ed4cc1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGdvbGR8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Blog',
    },
    {
      title: 'Moonlight Serenade - Complete Lyrics',
      date: 'September 10, 2024',
      preview: 'The complete lyrics to "Moonlight Serenade" with English translations and a note about the inspiration behind each verse...',
      image: 'https://images.unsplash.com/photo-1735891969992-1256311f791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Lyrics',
    },
    {
      title: 'My Journey with Classical Indian Music',
      date: 'August 22, 2024',
      preview: 'Reflecting on my training in classical music and how it shapes my contemporary work. The fusion of tradition and modernity...',
      image: 'https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwdXJwbGV8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Blog',
    },
    {
      title: 'Echoes of Love - Lyrical Poetry',
      date: 'July 30, 2024',
      preview: 'The poetic verses of "Echoes of Love" explore the timeless theme of love through musical metaphors and emotional depth...',
      image: 'https://images.unsplash.com/photo-1606943537055-6cef4e5d3b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Lyrics',
    },
    {
      title: 'Collaboration and Creative Inspiration',
      date: 'July 15, 2024',
      preview: 'Working with talented musicians and producers has always been a source of joy. Here are some stories from recent collaborations...',
      image: 'https://images.unsplash.com/photo-1735891969992-1256311f791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Blog',
    },
  ];

  // Musical symbols for floating animation
  const musicalSymbols = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];

  return (
    <section
      id="lyrics"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/5 to-black overflow-hidden"
    >
      {/* Floating musical symbols background */}
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

      {/* Faint waveforms */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="d"
              values="M0,50 Q25,30 50,50 T100,50;M0,50 Q25,70 50,50 T100,50;M0,50 Q25,30 50,50 T100,50"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            Lyrics & Stories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive into the words behind the music and the stories behind the songs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <div
              key={post.title}
              className={`transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-amber-500/20 hover:border-amber-500/60 transition-all overflow-hidden group cursor-pointer h-full shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-purple-600 blur opacity-0 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-600/80 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1 shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                      {post.category === 'Lyrics' ? (
                        <Music2 className="w-3 h-3" />
                      ) : (
                        <BookOpen className="w-3 h-3" />
                      )}
                      {post.category}
                    </span>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-2 text-amber-300 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-3">{post.preview}</p>
                  <div className="mt-4">
                    <span className="text-amber-400 text-sm hover:text-amber-300 transition-colors group-hover:underline inline-flex items-center gap-1">
                      Read More 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="px-8 py-3 bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-pink-600/30 hover:from-amber-600/50 hover:via-purple-600/50 hover:to-pink-600/50 border-2 border-amber-500/50 hover:border-amber-400 rounded-full text-amber-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            View All Posts
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
