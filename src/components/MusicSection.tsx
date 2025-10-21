import { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced Vinyl Record with particle trails
function VinylRecord({ isPlaying, isHovered }: { isPlaying: boolean; isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 50;
  const particles = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2.2;
    particles[i * 3] = Math.cos(angle) * radius;
    particles[i * 3 + 1] = 0.05;
    particles[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Spin faster when playing
      if (isPlaying) {
        meshRef.current.rotation.z += 0.05;
      } else {
        meshRef.current.rotation.z += 0.005;
      }

      // Glow effect when playing
      const emissiveIntensity = isPlaying ? 0.5 + Math.sin(state.clock.getElapsedTime() * 3) * 0.2 : 0.3;
      meshRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = emissiveIntensity;
        }
      });
    }

    // Particle trail effect on hover
    if (particlesRef.current && isHovered) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const angle = (i / particleCount) * Math.PI * 2 + time * 2;
        const radius = 2.2 + Math.sin(time * 3 + i * 0.5) * 0.2;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = 0.05 + Math.sin(time * 2 + i * 0.3) * 0.1;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Vinyl disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.05, 64]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#fbbf24"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Center label with gold accent */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#f59e0b" 
          emissiveIntensity={isPlaying ? 0.8 : 0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Grooves effect */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <torusGeometry args={[0.7 + i * 0.06, 0.005, 8, 32]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}

      {/* Particle trail */}
      {isHovered && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
  attach="attributes-position"
  args={[particles, 3]} // <-- array + itemSize here
  count={particleCount}
/>

          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color="#fbbf24"
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      )}

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={isPlaying ? 2 : 1} color="#fbbf24" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <spotLight 
        position={[0, 5, 0]} 
        angle={0.5} 
        penumbra={1} 
        intensity={isPlaying ? 2 : 1}
        color="#fbbf24"
      />
    </group>
  );
}

export function MusicSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVinylHovered, setIsVinylHovered] = useState(false);

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

  const albums = [
    {
      title: 'Eternal Melodies',
      year: '2024',
      cover: 'https://images.unsplash.com/photo-1715751036456-9e3b3ed4cc1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGdvbGR8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Soulful Journey', 'Moonlight Serenade', 'Echoes of Love'],
    },
    {
      title: 'Classical Fusion',
      year: '2023',
      cover: 'https://images.unsplash.com/photo-1606943537055-6cef4e5d3b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Raga Dreams', 'Timeless Beats', 'Harmony Within'],
    },
    {
      title: 'Voice of the Heart',
      year: '2022',
      cover: 'https://images.unsplash.com/photo-1735891969992-1256311f791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Whispers', 'Golden Sunrise', 'Eternal Bond'],
    },
    {
      title: 'Acoustic Sessions',
      year: '2021',
      cover: 'https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwdXJwbGV8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Unplugged Love', 'Silent Night', 'Morning Raga'],
    },
  ];

  const currentAlbum = albums[currentTrack % albums.length];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % albums.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + albums.length) % albums.length);
  };

  return (
    <section
      id="music"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Background gradient glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            Discography
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore a collection of soul-stirring melodies and timeless classics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* 3D Vinyl Player */}
          <div className={`relative transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div 
              className="aspect-square max-w-md mx-auto"
              onMouseEnter={() => setIsVinylHovered(true)}
              onMouseLeave={() => setIsVinylHovered(false)}
            >
              {/* Glow effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className={`absolute -inset-4 bg-amber-500 rounded-full blur-2xl transition-opacity ${isPlaying ? 'opacity-50' : 'opacity-20'}`} />
              
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                <VinylRecord isPlaying={isPlaying} isHovered={isVinylHovered} />
              </Canvas>
            </div>

            {/* Player Controls */}
            <div className="mt-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <div className="mb-6">
                <h3 className="text-2xl text-white mb-1">{currentAlbum.title}</h3>
                <p className="text-amber-300">{currentAlbum.year}</p>
              </div>

              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={handlePrevious}
                  className="w-12 h-12 bg-purple-600/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center border-2 border-purple-500/30 transition-all hover:scale-110 hover:border-amber-400/50 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 hover:from-amber-600 hover:via-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all hover:scale-110 active:scale-95 border-2 border-amber-400/50"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 bg-purple-600/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center border-2 border-purple-500/30 transition-all hover:scale-110 hover:border-amber-400/50 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Track List */}
              <div className="space-y-2">
                {currentAlbum.tracks.map((track, index) => (
                  <div
                    key={track}
                    className="flex items-center gap-3 text-gray-400 hover:text-amber-300 transition-colors cursor-pointer p-2 rounded hover:bg-amber-500/10 group"
                  >
                    <span className="text-amber-400 group-hover:text-amber-300">{index + 1}</span>
                    <span>{track}</span>
                    <div className={`ml-auto w-1 h-1 rounded-full bg-amber-400 ${isPlaying && index === 0 ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Album Grid */}
          <div className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {albums.map((album, index) => (
              <div
                key={album.title}
                onClick={() => setCurrentTrack(index)}
                className={`relative cursor-pointer group transition-all duration-300 ${
                  currentTrack === index 
                    ? 'scale-105 rotate-2 ring-2 ring-amber-400 rounded-xl shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                    : 'hover:scale-105 hover:rotate-2'
                }`}
                style={{ transitionDelay: `${350 + index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-amber-600 to-purple-600 rounded-xl blur-lg transition-opacity ${
                  currentTrack === index ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                }`} />
                
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-amber-500/30 group-hover:border-amber-500/60 transition-all">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white mb-1">{album.title}</h4>
                    <p className="text-amber-300 text-sm">{album.year}</p>
                  </div>

                  {/* Playing indicator */}
                  {currentTrack === index && isPlaying && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-amber-400 rounded-full animate-pulse"
                            style={{
                              height: '16px',
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
