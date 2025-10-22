import { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2, Disc3 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Rotating Album Card
function AlbumCard3D({ 
  isActive, 
  isHovered, 
  index 
}: { 
  isActive: boolean; 
  isHovered: boolean; 
  index: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 30;
  const particles = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 1.8;
    particles[i * 3] = Math.cos(angle) * radius;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    particles[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;
      
      // Float up and down
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.1;
      
      // Tilt on hover
      if (isHovered) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.2, 0.1);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }

    // Particle effects for active album
    if (particlesRef.current && isActive) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const angle = (i / particleCount) * Math.PI * 2 + time;
        const radius = 1.8 + Math.sin(time * 2 + i * 0.5) * 0.2;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(time + i * 0.3) * 0.3;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main card box */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 0.05]} />
        <meshStandardMaterial
          color={isActive ? '#fbbf24' : '#9333ea'}
          metalness={0.7}
          roughness={0.3}
          emissive={isActive ? '#f59e0b' : '#7c3aed'}
          emissiveIntensity={isActive ? 0.6 : 0.3}
        />
      </mesh>

      {/* Border frame */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.5, 1.5, 0.02]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.9}
          roughness={0.1}
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Particles for active album */}
      {isActive && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            color="#fbbf24"
            transparent
            opacity={0.7}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={isActive ? 2 : 1} color="#fbbf24" />
    </group>
  );
}

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
              count={particleCount}
              array={particles}
              itemSize={3}
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
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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
      description: 'A journey through soulful compositions',
      cover: 'https://images.unsplash.com/photo-1715751036456-9e3b3ed4cc1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGdvbGR8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Soulful Journey', 'Moonlight Serenade', 'Echoes of Love', 'Dance of Dreams'],
      spotifyUri: 'playlist/37i9dQZF1DXcBWIGoYBM5M', // Example: Today's Top Hits
    },
    {
      title: 'Classical Fusion',
      year: '2023',
      description: 'Where tradition meets modernity',
      cover: 'https://images.unsplash.com/photo-1606943537055-6cef4e5d3b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Raga Dreams', 'Timeless Beats', 'Harmony Within', 'Cultural Rhythm'],
      spotifyUri: 'playlist/37i9dQZF1DX4sWSpwq3LiO', // Example: Peaceful Piano
    },
    {
      title: 'Voice of the Heart',
      year: '2022',
      description: 'Emotions woven into melodies',
      cover: 'https://images.unsplash.com/photo-1735891969992-1256311f791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTc2MDk3NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Whispers', 'Golden Sunrise', 'Eternal Bond', 'Heart Strings'],
      spotifyUri: 'playlist/37i9dQZF1DWXRqgorJj26U', // Example: Rock Classics
    },
    {
      title: 'Acoustic Sessions',
      year: '2021',
      description: 'Raw, pure, and intimate',
      cover: 'https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwdXJwbGV8ZW58MXx8fHwxNzYwOTgwMzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tracks: ['Unplugged Love', 'Silent Night', 'Morning Raga', 'Gentle Breeze'],
      spotifyUri: 'playlist/37i9dQZF1DX1s9knjP51Oa', // Example: Acoustic Covers
    },
  ];

  const currentAlbum = albums[currentTrack % albums.length];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % albums.length);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + albums.length) % albums.length);
    setIsPlaying(false);
  };

  const toggleCardFlip = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <section
      id="music"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Background gradient glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Disc3 className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300">
              Discography
            </h2>
            <Music2 className="w-8 h-8 text-purple-400" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore a collection of soul-stirring melodies and timeless classics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* 3D Vinyl Player */}
          <div className={`relative transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div 
              className="aspect-square max-w-md mx-auto hidden lg:block"
              onMouseEnter={() => setIsVinylHovered(true)}
              onMouseLeave={() => setIsVinylHovered(false)}
            >
              {/* Glow effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className={`absolute -inset-4 bg-amber-500 rounded-full blur-2xl transition-opacity duration-500 ${isPlaying ? 'opacity-50' : 'opacity-20'}`} />
              
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                <VinylRecord isPlaying={isPlaying} isHovered={isVinylHovered} />
              </Canvas>
            </div>

            {/* Spotify Player & Album Info */}
            <div className="mt-0 lg:mt-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-amber-500/50 transition-all">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl text-white mb-1">{currentAlbum.title}</h3>
                <p className="text-amber-300 text-sm sm:text-base mb-2">{currentAlbum.year}</p>
                <p className="text-gray-400 text-xs sm:text-sm italic">{currentAlbum.description}</p>
              </div>

              {/* Spotify Embed */}
              <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden border-2 border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <iframe
                  src={`https://open.spotify.com/embed/${currentAlbum.spotifyUri}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                  title={`Spotify player for ${currentAlbum.title}`}
                />
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center border-2 border-purple-500/30 transition-all hover:scale-110 hover:border-amber-400/50 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-amber-300 transition-colors" />
                </button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-400">
                    Album <span className="text-amber-400">{currentTrack + 1}</span> of <span className="text-amber-400">{albums.length}</span>
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center border-2 border-purple-500/30 transition-all hover:scale-110 hover:border-amber-400/50 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-amber-300 transition-colors" />
                </button>
              </div>

              {/* Track List */}
              <div className="space-y-2">
                <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                  <Music2 className="w-4 h-4 text-amber-400" />
                  Featured Tracks
                </h4>
                {currentAlbum.tracks.map((track, index) => (
                  <div
                    key={track}
                    className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-amber-300 transition-all cursor-pointer p-2 rounded hover:bg-amber-500/10 group"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-xs text-amber-400 group-hover:bg-purple-600/50 group-hover:scale-110 transition-all border border-purple-500/30 group-hover:border-amber-400/50 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-sm sm:text-base">{track}</span>
                    <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 transition-all ${isPlaying && index === 0 ? 'animate-pulse scale-150' : 'opacity-0 group-hover:opacity-100'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Album Grid with 3D Cards */}
          <div className={`grid grid-cols-2 gap-3 sm:gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {albums.map((album, index) => (
              <div
                key={album.title}
                className="relative"
                style={{ transitionDelay: `${350 + index * 100}ms` }}
              >
                {/* 3D Canvas Background */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                    <AlbumCard3D 
                      isActive={currentTrack === index} 
                      isHovered={hoveredAlbum === index}
                      index={index}
                    />
                  </Canvas>
                </div>

                {/* Flippable Card */}
                <div
                  className={`relative cursor-pointer transition-all duration-700 ${
                    flippedCards.has(index) ? '[transform:rotateY(180deg)]' : ''
                  }`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                  onMouseEnter={() => setHoveredAlbum(index)}
                  onMouseLeave={() => setHoveredAlbum(null)}
                >
                  {/* Front of Card */}
                  <div
                    className={`relative ${flippedCards.has(index) ? 'invisible' : 'visible'}`}
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div
                      onClick={() => setCurrentTrack(index)}
                      onDoubleClick={() => toggleCardFlip(index)}
                      className={`relative group transition-all duration-300 ${
                        currentTrack === index 
                          ? 'scale-105 rotate-2 ring-2 ring-amber-400 rounded-xl shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                          : 'hover:scale-105 hover:-rotate-2'
                      }`}
                    >
                      {/* Glow effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r from-amber-600 to-purple-600 rounded-xl blur-lg transition-opacity ${
                        currentTrack === index ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                      }`} />
                      
                      <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-amber-500/30 group-hover:border-amber-500/60 transition-all bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm">
                        <img
                          src={album.cover}
                          alt={album.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        
                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-white mb-1 group-hover:text-amber-300 transition-colors">{album.title}</h4>
                          <p className="text-amber-300 text-sm">{album.year}</p>
                        </div>

                        {/* Playing indicator */}
                        {currentTrack === index && isPlaying && (
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 border border-amber-400/50">
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

                        {/* Hover overlay - Double tap hint */}
                        <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white text-sm bg-black/70 px-3 py-1 rounded-full border border-amber-400/50 backdrop-blur-sm">
                            Double-click for tracks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card - Track List */}
                  <div
                    className={`absolute inset-0 ${flippedCards.has(index) ? 'visible' : 'invisible'}`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div
                      onClick={() => toggleCardFlip(index)}
                      className="h-full bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-amber-500/50 rounded-xl p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer hover:border-amber-400 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white">{album.title}</h4>
                        <Disc3 className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                      </div>
                      
                      <div className="space-y-2">
                        {album.tracks.map((track, trackIndex) => (
                          <div
                            key={track}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-amber-300 transition-colors p-1.5 rounded hover:bg-amber-500/10"
                          >
                            <div className="w-4 h-4 rounded-full bg-purple-600/30 flex items-center justify-center text-xs text-amber-400 border border-purple-500/30">
                              {trackIndex + 1}
                            </div>
                            <span className="text-xs">{track}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <span className="text-xs text-gray-400 bg-black/30 px-3 py-1 rounded-full border border-purple-500/30">
                          Click to flip back
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}