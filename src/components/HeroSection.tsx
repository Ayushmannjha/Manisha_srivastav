import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import * as THREE from 'three';
import manisha from '../assets/manishalogo.png'

// Floating Music Icon (Musical Note Shape)
function FloatingMusicIcon({ position, type, mousePosition }: { position: [number, number, number]; type: number; mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const initialPosition = useMemo(() => position, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = initialPosition[1] + Math.sin(time + initialPosition[0]) * 0.5;
      meshRef.current.position.x = initialPosition[0] + Math.sin(time * 0.5) * 0.3 + mousePosition.x * 0.2;
      meshRef.current.position.z = initialPosition[2] + Math.cos(time * 0.5) * 0.2 + mousePosition.y * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Different music icon types
  const icons = [
    // Type 0: Musical Note ♪
    () => (
      <>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.08, 0.5, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
      </>
    ),
    // Type 1: Treble Clef (stylized)
    () => (
      <>
        <mesh>
          <torusGeometry args={[0.15, 0.04, 12, 24]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      </>
    ),
    // Type 2: Double Notes ♫
    () => (
      <>
        <mesh position={[-0.1, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#9333ea" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#9333ea" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[-0.1, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial color="#a855f7" emissive="#9333ea" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.1, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial color="#a855f7" emissive="#9333ea" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      </>
    ),
    // Type 3: Star (for accent)
    () => (
      <mesh>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.7} transparent opacity={0.85} />
      </mesh>
    ),
  ];

  return (
    <group ref={meshRef} position={position}>
      {icons[type % icons.length]()}
      <pointLight position={[0, 0, 0]} intensity={0.5} color={type % 2 === 0 ? "#fbbf24" : "#a855f7"} distance={2} />
    </group>
  );
}

// Main 3D Scene
function ConcertScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Floating Music Icons - More variety */}
      <FloatingMusicIcon position={[-4, 2, -3]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[4, -1, -2]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-3, -2, -4]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[5, 1, -3]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-5, 0, -2]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-2, 3, -5]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[3, 2, -4]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[0, -3, -3]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-6, -1, -3]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[6, 2, -5]} type={1} mousePosition={mousePosition} />

      {/* Additional Layer - More Music Icons */}
      <FloatingMusicIcon position={[2, 4, -4]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-3, 4, -3]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[4, 3, -5]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-5, 2, -4]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[1, -2, -5]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-1, -1, -2]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[6, 0, -4]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-7, 1, -5]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[3, -3, -3]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-4, -3, -5]} type={3} mousePosition={mousePosition} />
      
      {/* Third Layer - Even More Depth */}
      <FloatingMusicIcon position={[5, 4, -6]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-6, 3, -6]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[2, -4, -4]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-2, -4, -6]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[7, 1, -5]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-7, -2, -4]} type={3} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[0, 4, -5]} type={0} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[1, 2, -6]} type={1} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[-1, 1, -3]} type={2} mousePosition={mousePosition} />
      <FloatingMusicIcon position={[4, -2, -6]} type={3} mousePosition={mousePosition} />

      {/* Lighting for concert atmosphere */}
      <ambientLight intensity={0.3} />
      <pointLight position={[-5, 5, 5]} intensity={2} color="#a855f7" distance={15} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ec4899" distance={15} />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#fbbf24" distance={12} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
    </>
  );
}

export function HeroSection() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-950/30 to-black"
      onMouseMove={handleMouseMove}
    >
      {/* Stage-like background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      {/* 3D Concert Scene */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ConcertScene mousePosition={mousePosition.current} />
        </Canvas>
      </div>

      {/* Multiple spotlight glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Singer Image */}
        <div className={`relative group transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          {/* Multiple glowing layers for concert effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" />
          <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20" />
          
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full blur-xl opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
            
            {/* Image container */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-amber-400/50 shadow-2xl shadow-purple-500/50">
              <ImageWithFallback
                src={manisha}
                alt="Manisha Srivastav"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Spotlight effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
            </div>

            {/* Corner accent lights */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded-full blur-md opacity-70 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-md opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className={`text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            Manisha Srivastav
          </h1>

          {/* Tagline with golden accents */}
          <div className={`flex items-center justify-center lg:justify-start gap-4 mb-8 text-lg md:text-xl transition-all delay-300 duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-amber-300">Singer</span>
            <span className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            <span className="text-purple-300">Performer</span>
            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            <span className="text-pink-300">Storyteller</span>
          </div>

          <p className={`text-base md:text-lg text-gray-300 mb-12 max-w-xl leading-relaxed transition-all delay-500 duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Experience the magic of melody and emotion through timeless performances that touch the soul. Let the music guide you through a journey of pure artistic expression.
          </p>

          {/* CTAs with glowing effects */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all delay-700 duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 hover:from-amber-600 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.7)] transition-all hover:scale-105 border border-amber-400/50"
              onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Performance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-400 text-amber-300 hover:bg-amber-500/20 hover:border-amber-300 px-8 py-6 hover:scale-105 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Listen Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with glow */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all delay-1000 duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.5)]">
          <div className="w-1.5 h-3 bg-amber-400 rounded-full mt-2 animate-bounce shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        </div>
      </div>
    </section>
  );
}