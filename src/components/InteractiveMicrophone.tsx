import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Interactive Microphone
function Microphone3D({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const micRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (micRef.current) {
      // Follow mouse movement smoothly
      micRef.current.rotation.y = THREE.MathUtils.lerp(
        micRef.current.rotation.y,
        mousePosition.x * 0.5,
        0.05
      );
      micRef.current.rotation.x = THREE.MathUtils.lerp(
        micRef.current.rotation.x,
        -mousePosition.y * 0.3,
        0.05
      );
      
      // Gentle floating animation
      micRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <group ref={micRef}>
      {/* Microphone head (sphere) */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#e5e5e5" 
          metalness={0.95} 
          roughness={0.05} 
          emissive="#fbbf24" 
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Microphone grille (smaller sphere overlay) */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial 
          color="#d4d4d8" 
          metalness={0.9} 
          roughness={0.2} 
          wireframe 
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Microphone body (upper cylinder) */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 1.2, 32]} />
        <meshStandardMaterial 
          color="#52525b" 
          metalness={0.85} 
          roughness={0.15}
        />
      </mesh>

      {/* Microphone body (lower cylinder) */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.8, 32]} />
        <meshStandardMaterial 
          color="#3f3f46" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Base ring */}
      <mesh position={[0, -2.3, 0]}>
        <torusGeometry args={[0.35, 0.08, 16, 32]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#f59e0b"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Decorative golden rings */}
      <mesh position={[0, -0.7, 0]}>
        <torusGeometry args={[0.32, 0.04, 12, 24]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#f59e0b"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <torusGeometry args={[0.3, 0.04, 12, 24]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#f59e0b"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Lighting */}
      <pointLight position={[0, 1, 2]} intensity={3} color="#fbbf24" distance={8} />
      <pointLight position={[2, 0, 1]} intensity={2} color="#a855f7" distance={6} />
      <pointLight position={[-2, 0, 1]} intensity={2} color="#ec4899" distance={6} />
      <spotLight 
        position={[0, 5, 3]} 
        angle={0.4} 
        penumbra={1} 
        intensity={3}
        color="#fbbf24"
        target-position={[0, 0, 0]}
      />
      <ambientLight intensity={0.4} />
    </group>
  );
}

// Floating particles around microphone
function MicrophoneParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 100;
  const particles = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const radius = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    particles[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particles[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particles[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
  attach="attributes-position"
  args={[particles, 3]} // array, itemSize
  count={particleCount}
  array={particles}
  itemSize={3}
/>

      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#fbbf24"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function InteractiveMicrophone() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  const opacity = Math.max(0.3, 1 - (scrollY / 1000));

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Microphone3D mousePosition={mousePosition.current} />
        <MicrophoneParticles />
      </Canvas>
    </div>
  );
}