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

  // 🧠 Fetch Hero data once on mount
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

  // ✨ Smooth entrance
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
      {/* Background & Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <Suspense fallback={null}>
            <ConcertScene mousePosition={mousePosition.current} />
          </Suspense>
        </Canvas>
      </div>

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div
          className={`relative group transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-full blur-3xl opacity-36 group-hover:opacity-70 transition-opacity" />
          <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20" />
          <div className="relative">
            <div className="absolute -inset-6 rounded-full opacity-30 pointer-events-none">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 blur-lg mix-blend-screen" />
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl shadow-purple-500/50">
              <ImageWithFallback
                src={hero?.image || manisha}
                alt={hero?.name || "Manisha Srivastava"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
            </div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded-full blur-md opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-md opacity-60" />
          </div>
        </div>

        {/* Right Text */}
        <div
          className={`text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            {hero?.name || "Manisha Srivastava"}
          </h1>

          {/* Dynamic tagline */}
          <div
            className={`flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-lg md:text-xl transition-all delay-300 duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {hero?.tagline?.map((t, i) => (
              <span
                key={i}
                className={
                  i % 3 === 0
                    ? "text-amber-300"
                    : i % 3 === 1
                    ? "text-purple-300"
                    : "text-pink-300"
                }
              >
                {t}
              </span>
            ))}
          </div>

          <p
            className={`text-base md:text-lg text-gray-300 mb-12 max-w-xl leading-relaxed transition-all delay-500 duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {hero?.description ||
              "Experience the magic of melody and emotion through timeless performances that touch the soul. Let the music guide you through a journey of pure artistic expression."}
          </p>

          {/* Buttons (unchanged) */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all delay-700 duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 hover:opacity-95 text-white px-6 py-3 transition-transform hover:scale-[1.03] border border-amber-300/40"
              onClick={() =>
                document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Watch Performance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-amber-300 text-amber-300 hover:bg-amber-500/10 px-6 py-3 transition-transform hover:scale-[1.03]"
              onClick={() =>
                document.getElementById("music")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Listen Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all delay-1000 duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          aria-label="Scroll to next section"
          onClick={() =>
            document.getElementById("music")?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-10 h-14 flex items-center justify-center rounded-full border-2 border-amber-400/60 bg-transparent shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:scale-105"
        >
          <span className="w-2 h-4 bg-amber-400 rounded-full animate-bounce block" />
        </button>
      </div>
    </section>
  );
}
