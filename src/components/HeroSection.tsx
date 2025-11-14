import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import * as THREE from "three";
import manisha from "../assets/manishalogo.png";

// 🎵 Floating Music Icon
function FloatingMusicIcon({
  position,
  type,
  mousePosition,
}: {
  position: [number, number, number];
  type: number;
  mousePosition: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Group>(null);
  const initialPosition = useMemo(() => position, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y =
        initialPosition[1] + Math.sin(time + initialPosition[0]) * 0.5;
      meshRef.current.position.x =
        initialPosition[0] +
        Math.sin(time * 0.5) * 0.3 +
        mousePosition.x * 0.2;
      meshRef.current.position.z =
        initialPosition[2] +
        Math.cos(time * 0.5) * 0.2 +
        mousePosition.y * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
    }
  });

  const icons = [
    () => (
      <>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0.08, 0.5, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </>
    ),
    () => (
      <>
        <mesh>
          <torusGeometry args={[0.15, 0.04, 12, 24]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      </>
    ),
    () => (
      <>
        <mesh position={[-0.1, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[-0.1, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0.1, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      </>
    ),
    () => (
      <mesh>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    ),
  ];

  return (
    <group ref={meshRef} position={position}>
      {icons[type % icons.length]()}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color={type % 2 === 0 ? "#fbbf24" : "#a855f7"}
        distance={2}
      />
    </group>
  );
}

// 🎶 3D Concert Scene
function ConcertScene({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const musicIcons = useMemo(
    () => [
      [-4, 1.6, -3, 0],
      [3.6, -0.8, -2.2, 1],
      [-2.6, -1.8, -4.2, 2],
      [4.2, 0.8, -3.2, 3],
      [-5, 0, -2, 0],
      [1.8, 2.6, -4.4, 2],
      [-3.8, 3.2, -3.6, 1],
      [0, -2.8, -3, 3],
      [5.2, 1.8, -5, 0],
      [-6, -1.2, -3.4, 1],
      [2.8, -3.2, -3.2, 2],
      [-1.2, 1.2, -3.2, 3],
    ],
    []
  );

  return (
    <>
      {musicIcons.map((m, i) => (
        <FloatingMusicIcon
          key={i}
          position={[m[0] as number, m[1] as number, m[2] as number]}
          type={m[3] as number}
          mousePosition={mousePosition}
        />
      ))}
      <ambientLight intensity={0.22} />
      <pointLight
        position={[-5, 6, 6]}
        intensity={1.2}
        color="#a855f7"
        distance={20}
      />
      <pointLight
        position={[5, 6, 6]}
        intensity={1.2}
        color="#ec4899"
        distance={20}
      />
      <pointLight
        position={[0, 5, 0]}
        intensity={0.9}
        color="#fbbf24"
        distance={16}
      />
    </>
  );
}

// 🎤 Main Dynamic Hero Section
export function HeroSection() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hero, setHero] = useState<{
    name: string;
    tagline: string[];
    description: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("https://manishasrivastav-production.up.railway.app/api/hero");
        const data = await res.json();
        if (data) setHero(data);
      } catch (err) {
        console.error("Error fetching Hero:", err);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(t);
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      <div className="absolute inset-0 opacity-60 pointer-events-none z-0">
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <Suspense fallback={null}>
            <ConcertScene mousePosition={mousePosition.current} />
          </Suspense>
        </Canvas>
      </div>

  {/* Extra right curve (placed above the canvas, behind content) */}
  <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-linear-to-l from-[#5b21b6]/70 via-[#7c3aed]/40 to-transparent rounded-l-[100px] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] opacity-95 z-10" />

      {/* Main content */}
  <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left image */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-[#1a2238]">
            <ImageWithFallback
              src={hero?.image || manisha}
              alt={hero?.name || "Manisha Srivastava"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right text */}
        asdasd
        <div
          className={`text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">
            {hero?.name || "Manisha Srivastava"}
          </h1>
          <h2 className="text-gray-300 text-lg mb-6 uppercase tracking-widest">
            {hero?.tagline?.[0] || "Singer & Performer"}
          </h2>
          <p className="text-gray-400 max-w-md mb-8 mx-auto lg:mx-0">
            {hero?.description ||
              "Building immersive musical experiences that merge creativity and soul. Passionate about melody, rhythm, and crafting performances that inspire people to connect."}
          </p>

          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md">
            Explore My Work
          </Button>
        </div>
      </div>
    </section>
  );
}
