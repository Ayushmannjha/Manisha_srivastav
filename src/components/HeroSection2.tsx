import { useEffect, useState } from "react";
import im from "../assets/Gemini_Generated_Image_l35037l35037l350.png";
import "../App.css";
// using public images via Tailwind classes; imported asset removed

export default function HeroSection() {
  const [hero, setHero] = useState<{
    name: string;
    tagline: string[];
    description: string;
    image?: string;
  } | null>(null);

  // Fetch Hero data dynamically
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          "https://manishasrivastav-production.up.railway.app/api/hero"
        );
        const data = await res.json();
        if (data) setHero(data);
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHero();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full  flex justify-center items-center py-20 px-6"
      
    >
      <div className="max-w-8xl w-full flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl relative">
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 rounded-lg z-10 md:bg-[url('/1.png')] bg-[url('/Phone.png')] bg-no-repeat bg-center bg-contain `}
          style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        {/* Left Image Section */}
        <div className="relative md:w-1/2 w-full h-[350px] md:h-auto z-0">
          {/* 👇 The image now overlaps the text section */}
          <img
            src={hero?.image || im}
            alt={hero?.name || "Hero Image"}
            className="object-cover w-full h-full md:rounded-r-[200px]"
          />
          {/* Subtle shadow for smooth blend */}
          {/* Crescent-style curve — like a waning moon */}
          {/* White curved border on the right */}
        
        </div>

        {/* Right Content Section */}
        <div className="md:w-1/2 w-full  text-white flex flex-col justify-center sm:px-10 px-6 py-12 relative z-20">
          {/* Floating background circles for subtle design */}
          <div className="absolute top-[10%] right-[15%] w-6 h-6 border border-[#1f2937] rounded-full opacity-60" />
          <div className="absolute bottom-[15%] right-[5%] w-8 h-8 border border-[#1f2937] rounded-full opacity-60" />

          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 leading-tight z-10">
            {hero?.name || "Manisha Srivastava"}
          </h1>
          {/* Dynamic Taglines */}
          <div className="flex flex-wrap gap-3 mb-3 z-10">
            {hero?.tagline?.length ? (
              hero.tagline.map((t, i) => (
                <h4
                  key={i}
                  className={`font-semibold uppercase tracking-wider text-sm ${
                    i % 3 === 0
                      ? "text-yellow-400"
                      : i % 3 === 1
                      ? "text-purple-400"
                      : "text-pink-400"
                  }`}
                >
                  {t}
                </h4>
              ))
            ) : (
              <h4 className="text-yellow-500 font-semibold uppercase tracking-wider text-sm">
                Singer
              </h4>
            )}
          </div>
          <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed sm:pr-10 z-10">
            {hero?.description ||
              "Building immersive digital experiences that merge creativity and technology. Passionate about design, innovation, and crafting products that inspire people to engage."}
          </p>

          <button
            onClick={() =>
              document
                .getElementById("videos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-md font-semibold shadow-lg transition w-fit z-10"
          >
            Explore My Work
          </button>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-10 z-10">
            <span>🌐 www.ayushmanjha.com</span>
            <span>✉️ contact@ayushmanjha.com</span>
            <span>📍 New Delhi, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
