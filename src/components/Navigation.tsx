import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Inline glow animation styles (for Tailwind JIT)
const glowAnimation = `
@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(251,191,36,0.4)) drop-shadow(0 0 15px rgba(168,85,247,0.2)); }
  50% { filter: drop-shadow(0 0 15px rgba(251,191,36,0.8)) drop-shadow(0 0 30px rgba(168,85,247,0.4)); }
}
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.glow-animate {
  animation: glowPulse 3s ease-in-out infinite;
}
.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-in forwards;
}
`;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Inject animations into <head> only once
    if (!document.getElementById('nav-animations')) {
      const style = document.createElement('style');
      style.id = 'nav-animations';
      style.innerHTML = glowAnimation;
      document.head.appendChild(style);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Music', href: '#music' },
    { name: 'Videos', href: '#videos' },
    { name: 'Blogs/Lyrics', href: '#lyrics' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'My activity', href: '#myActivity' },
     { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(251,191,36,0.3)] border-b border-amber-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <span className="relative flex-shrink-0 glow-animate">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#g1)" opacity="0.95" />
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                fontFamily="serif"
                fontWeight="700"
                fontSize="26"
                fill="white"
              >
                M
              </text>
            </svg>
          </span>
          <span
            className={` sm:inline-block text-lg md:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 transition-transform duration-500 `}
          >
            Manisha Srivastava
          </span>
        </a>

        {/* Desktop Menu (only from lg and up) */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-amber-400 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button (below lg) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-amber-300 hover:text-amber-400 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed top-[68px] left-0 w-full bg-gradient-to-b from-[#1a0329]/95 via-[#2a0a3f]/90 to-black/90 backdrop-blur-xl border-t border-amber-500/10 transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 text-lg font-medium animate-fade-in">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 opacity-0 translate-y-3 animate-slide-up"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
