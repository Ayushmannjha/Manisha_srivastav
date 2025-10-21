import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Music, Mic, Heart, Star } from 'lucide-react';
import * as THREE from 'three';

// 3D Glowing Microphone Animation
function GlowingMicrophone() {
  const micRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (micRef.current) {
      micRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      micRef.current.position.y = Math.sin(time) * 0.1;
    }

    if (glowRef.current) {
  const scale = 1 + Math.sin(time * 2) * 0.1;
  glowRef.current.scale.set(scale, scale, scale);

  const mat = glowRef.current.material;

  if (Array.isArray(mat)) {
    mat.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.3 + Math.sin(time * 2) * 0.2;
    });
  } else {
    mat.transparent = true;
    mat.opacity = 0.3 + Math.sin(time * 2) * 0.2;
  }
}

  });

  return (
    <group ref={micRef}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
      </mesh>

      {/* Microphone head */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#e5e5e5" metalness={0.9} roughness={0.1} emissive="#fbbf24" emissiveIntensity={0.3} />
      </mesh>

      {/* Microphone body */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 1, 32]} />
        <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Lighting */}
      <pointLight position={[0, 1, 1]} intensity={2} color="#fbbf24" distance={5} />
      <pointLight position={[0, -1, 1]} intensity={1} color="#a855f7" distance={4} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

// Animated musical notes and waveforms
function MusicalBackground() {
  const wavesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (wavesRef.current) {
      wavesRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={wavesRef}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 0.785) * 3, Math.sin(i * 0.785) * 3, -2]} rotation={[0, 0, i * 0.785]}>
          <torusGeometry args={[0.3, 0.05, 8, 32]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const stats = [
    { icon: Music, label: 'Songs Recorded', value: '150+' },
    { icon: Mic, label: 'Live Performances', value: '200+' },
    { icon: Heart, label: 'Happy Listeners', value: '1M+' },
    { icon: Star, label: 'Awards', value: '15+' },
  ];

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
            About Manisha
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
                src="https://images.unsplash.com/photo-1606943537055-6cef4e5d3b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Manisha Srivastav"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Spotlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(251,191,36,0.2)_0%,_transparent_60%)]" />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            {/* Biography text */}
            <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <p className="text-gray-300 leading-relaxed">
                Manisha Srivastav is a celebrated Indian vocalist whose soulful voice has captivated audiences across the globe. 
                With a career spanning over a decade, she has established herself as one of the most versatile and emotive singers 
                in the contemporary music scene.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Her musical journey began at a young age, training in classical Indian music while also embracing modern genres. 
                This unique blend allows her to create performances that are both rooted in tradition and refreshingly contemporary.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From intimate studio recordings to grand concert halls, Manisha's performances are known for their emotional depth 
                and technical brilliance. She believes in the power of music to transcend boundaries and connect hearts.
              </p>

              <div className="pt-6">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-pink-600/20 border border-amber-500/30 rounded-full hover:scale-105 transition-transform cursor-default shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  <p className="text-amber-300 italic">
                    "Music is not just what I do, it's who I am"
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Glowing Microphone */}
            <div className={`hidden lg:block w-48 h-64 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <GlowingMicrophone />
                <MusicalBackground />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-amber-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:scale-105 hover:border-amber-500/60 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${700 + index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              
              <div className="relative">
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
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
