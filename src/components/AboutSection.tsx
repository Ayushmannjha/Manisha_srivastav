import { useRef, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Music } from 'lucide-react';
export interface AboutStat {
  _id: string;
  icon: string;
  label: string;
  value: string;
}

export interface AboutData {
  _id: string;
  title: string;
  subtitle: string;
  image?: string; // URL to the about image
  paragraphs: string[];
  quote: string;
  stats: AboutStat[];
  __v: number;
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

const [aboutData, setAbout] = useState<AboutData | null>();
  const [ loading,setLoading] = useState(true);
console.log(loading)
  const [error, setError] = useState<string | null>(null);
  console.log(error);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

 useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://localhost:5000/api/about");
        if (!res.ok) throw new Error("Failed to fetch About data");

        const data: AboutData = await res.json(); // 👈 typed JSON
        console.log("Fetched About Data:", data);

        // ✅ store the fetched data
        setAbout(data);
        console.log("About Data set in state:", aboutData);
      } catch (err: any) {
        console.error("Error fetching About data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);
  useEffect(() => {
  if (aboutData) {
    console.log("About Data set in state:", aboutData);
  }
}, [aboutData]);


  
  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Subtle animated waveforms background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `wave ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Background gradient glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
           {aboutData ? aboutData.title : 'About Manisha Srivastav'}
          </h2>
          {/* Musical divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Music className="w-5 h-5 text-amber-400" />
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <Music className="w-5 h-5 text-pink-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
          {/* Singer Portrait with spotlight effect */}
          <div className={`relative group transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Spotlight glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-purple-600 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl" />
            
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
             <ImageWithFallback
  src={aboutData?.image}
  alt="Manisha Srivastav"
  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
/>


              {/* Spotlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(251,191,36,0.2)_0%,_transparent_60%)]" />
            </div>
          </div>

          {/* Biography text */}
          <div
  className={`space-y-6 transition-all duration-700 delay-300 ${
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
  }`}
>
  {/* ✅ Render paragraphs dynamically */}
  {aboutData?.paragraphs?.map((paragraph, i) => (
    <p key={i} className="text-gray-300 leading-relaxed">
      {paragraph}
    </p>
  ))}

  {/* ✅ Render the quote */}
  <div className="pt-6">
    <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-pink-600/20 border border-amber-500/30 rounded-full hover:scale-105 transition-transform cursor-default shadow-[0_0_20px_rgba(251,191,36,0.2)]">
      <p className="text-amber-300 italic">"{aboutData?.quote}"</p>
    </div>
  </div>
</div>

        </div>

        {/* Stats Section */}
        <div
  className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-700 delay-600 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  {aboutData?.stats.map((stat, index) => {
    // ✅ Dynamically select the right icon
  
    return (
      <div
        key={stat._id}
        className="relative group bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-amber-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:scale-105 hover:border-amber-500/60 transition-all duration-300 cursor-default"
        style={{ transitionDelay: `${700 + index * 100}ms` }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />

        <div className="relative">
          {/* ✅ Dynamic icon rendering */}
         

          <div className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300 mb-2">
            {stat.value}
          </div>

          {/* ✅ Correct label */}
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      </div>
    );
  })}
</div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleX(1); }
          50% { transform: translateY(-5px) scaleX(1.02); }
        }
      `}</style>
    </section>
  );
}
