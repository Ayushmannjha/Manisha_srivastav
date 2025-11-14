import { useRef, useState, useEffect } from 'react';
import { Youtube, Instagram, Music, Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';


// Audio equalizer bar component
function EqualizerBar({ delay }: { delay: number }) {
  return (
    <div
      className="w-1 bg-gradient-to-t from-amber-500 via-purple-500 to-pink-500 rounded-full animate-equalizer"
      style={{
        animationDelay: `${delay}s`,
        height: '100%',
      }}
    />
  );
}

export function Footer() {
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

  const socialLinks = [
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@singermanishasrivastava?si=61tDsxzlWb6ilVhu' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/singermanishasrivastava?igsh=amtiOTFweTBsd2Nt' },
    { icon: Music, label: 'Spotify', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@manishasrivastav.com' },
    { icon:Facebook, label:'Facebook', href:'https://www.facebook.com/share/1Bn7YdowZi/'},
    { icon: Twitter, label:'X', href: 'https://x.com/ManishaFolk?t=J79MihBjFJOSfNJC5Dr1XQ&s=09'}
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Music', href: '#music' },
    { name: 'Videos', href: '#videos' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Lyrics', href: '#lyrics' },
    { name: 'Contact', href: '#contact' },
    
  ];

  return (
    <footer 
      ref={ref} 
      id="contact" 
      className="relative bg-gradient-to-b from-black via-purple-950/20 to-black border-t-2 border-amber-500/20 overflow-hidden"
    >
      {/* Animated audio equalizer background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-2 px-4 opacity-10 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <EqualizerBar key={i} delay={i * 0.1} />
        ))}
      </div>

      {/* Animated wave patterns */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-wave-slide" />
      </div>

      {/* Gradient glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
              Manisha Srivastava
            </h3>
            <p className="text-amber-300 mb-6">
              Singer • Performer 
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing the magic of melody and emotion through timeless performances that touch the soul.
            </p>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-white mb-6 flex items-center gap-2">
              Quick Links
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-white mb-6 flex items-center gap-2">
              Get in Touch
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-gray-400 group hover:text-gray-300 transition-colors">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 group-hover:text-amber-300 transition-colors" />
                <div>
                  <a href="mailto:contact@manishasrivastav.com" className="hover:text-amber-400 transition-colors">
                    contact@manishasrivastava.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>+91 98765 43210</div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-pink-400 mt-0.5" />
                <div>Mumbai, India</div>
              </div>
            </div>

            {/* Social Links with glowing effects */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  target='_blank'
                  href={social.href}
                  className="relative w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-amber-600/40 hover:to-purple-600/40 border-2 border-amber-500/30 hover:border-amber-500/70 rounded-full flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all hover:scale-110 hover:-translate-y-1 active:scale-95 group shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]"
                  aria-label={social.label}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity" />
                  <social.icon className="w-5 h-5 relative z-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={`max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-amber-500/30 rounded-2xl p-8 text-center backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-purple-600 rounded-2xl blur opacity-20" />
            
            <div className="relative">
              <h4 className="text-white text-xl mb-3">Stay Updated</h4>
              <p className="text-gray-400 mb-6">Subscribe to get updates on new releases and upcoming performances</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-black/30 border-2 border-amber-500/30 focus:border-amber-500/60 rounded-lg text-white placeholder:text-gray-500 focus:outline-none transition-colors"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 rounded-lg text-white transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 border border-amber-400/50">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t-2 border-amber-500/20 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-400 text-sm mb-3">
            © {new Date().getFullYear()} Manisha Srivastav. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-500 text-xs flex-wrap">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span className="text-amber-500/50">•</span>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <span className="text-amber-500/50">•</span>
            <a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        @keyframes equalizer {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-equalizer {
          animation: equalizer 0.8s ease-in-out infinite;
          transform-origin: bottom;
        }
        @keyframes wave-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-wave-slide {
          animation: wave-slide 3s linear infinite;
        }
      `}</style>
    </footer>
  );
}
