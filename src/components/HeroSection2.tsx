
import im from "../assets/Gemini_Generated_Image_l35037l35037l350.png";
export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#0d1117] flex justify-center items-center py-20 px-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row bg-[#111827] rounded-lg overflow-hidden shadow-2xl">
        
        {/* Left Image Section */}
        <div className="relative md:w-1/2 w-full h-[350px] md:h-auto">
          <img
            src={im}
            alt="Business"
            className="object-cover w-full h-full"
          />
          {/* Curved Overlay */}
          <div className="hidden md:block absolute top-0 right-0 w-20 h-full bg-[#111827] rounded-l-[100px]" />
        </div>

        {/* Right Content Section */}
        <div className="md:w-1/2 w-full bg-[#111827] text-white flex flex-col justify-center px-10 py-12 relative z-10">
          <h4 className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-2">
            Business
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 leading-tight">
            Headline
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam.
          </p>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-md font-semibold shadow-lg transition w-fit">
            Join Now
          </button>

          {/* Footer Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-10">
            <span>🌐 yourwebsite.com</span>
            <span>✉️ youremail@email.com</span>
            <span>📍 your address here</span>
          </div>
        </div>
      </div>
    </section>
  );
}
