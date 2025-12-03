import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

export function Machine() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  const [hovered, setHover] = useState(false);
  const { isNearMachine, setNearMachine, processingStep } = useStore();
  
  const isProcessing = !!processingStep;

  useFrame((state, delta) => {
    if (!group.current) return;

    // Hover animation handled by <Float>, but we can add rotation
    group.current.rotation.y += delta * 0.1;

    // Core pulsing
    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      const scale = isProcessing ? 1 + Math.sin(t * 10) * 0.1 : 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }

    // Ring animations
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x += delta * (isProcessing ? 2 : 0.5);
        ring1Ref.current.rotation.y += delta * (isProcessing ? 1.5 : 0.2);
    }
    if (ring2Ref.current) {
        ring2Ref.current.rotation.x -= delta * (isProcessing ? 1.5 : 0.3);
        ring2Ref.current.rotation.z += delta * (isProcessing ? 2 : 0.4);
    }
  });

  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = () => {
    setNearMachine(true);
  };

  // Colors for Divine Theme
  const coreColor = isProcessing ? '#ffaa00' : '#ffddaa'; // Golden Glow
  const glowColor = isProcessing ? '#ff5500' : '#ffcc00'; // Amber/Gold

  return (
    <group position={[0, 1.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.5]}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
          {/* Main Obelisk Body - Lighter Stone for visibility */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 3, 6]} /> {/* Hexagonal Pillar */}
            <meshStandardMaterial 
                color="#d7ccc8" 
                metalness={0.1} 
                roughness={0.9} 
                emissive={hovered ? '#5d4037' : '#2a1a10'}
                emissiveIntensity={0.2}
            />
          </mesh>

          {/* Gold Inlays/Shell */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.05, 1.05, 3.1, 6]} />
            <meshStandardMaterial 
                color="#ffcc00"
                metalness={1}
                roughness={0.2}
                wireframe
                transparent
                opacity={0.3}
            />
          </mesh>

          {/* Glowing Core - Divine Light */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color={coreColor} />
          </mesh>
          <pointLight position={[0, 0, 0]} distance={5} intensity={3} color={coreColor} />

          {/* Animated Halos */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.4, 0.02, 16, 100]} />
            <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.6, 0.02, 16, 100]} />
            <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} toneMapped={false} />
          </mesh>

          {/* Golden Particles */}
          <Sparkles 
            count={50} 
            scale={5} 
            size={6} 
            speed={0.2} 
            opacity={0.8} 
            color="#ffd700"
          />

          {/* Label if not near - REMOVED FONT PROP TO PREVENT LOADING HANG */}
          {!isNearMachine && (
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.15}
              color="#ffddaa"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              {hovered ? "COMMUNE WITH THE DIVINE" : ""}
            </Text>
          )}
        </group>
      </Float>
    </group>
  );
}
