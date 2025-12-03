import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
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

  // Colors
  const coreColor = isProcessing ? '#ff9900' : '#00ffff';
  const glowColor = isProcessing ? '#ff5500' : '#0088ff';

  return (
    <group position={[0, 1.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.5]}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
          {/* Main Cylinder Body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 3, 32]} />
            <meshStandardMaterial 
                color="#1a1a2e" 
                metalness={0.8} 
                roughness={0.2} 
                emissive={hovered ? '#1a1a3e' : '#000000'}
            />
          </mesh>

          {/* Glass Shell */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.1, 1.1, 3.2, 32]} />
            <MeshTransmissionMaterial 
                backside
                thickness={0.2}
                roughness={0.1}
                transmission={0.9}
                chromaticAberration={0.1}
                anisotropy={0.1}
                color="#88ccff"
            />
          </mesh>

          {/* Glowing Core */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={coreColor} />
          </mesh>
          <pointLight position={[0, 0, 0]} distance={3} intensity={2} color={coreColor} />

          {/* Animated Rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.4, 0.05, 16, 100]} />
            <meshBasicMaterial color={glowColor} toneMapped={false} />
          </mesh>
          <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.6, 0.05, 16, 100]} />
            <meshBasicMaterial color={glowColor} toneMapped={false} />
          </mesh>

          {/* Particles */}
          <Sparkles 
            count={50} 
            scale={4} 
            size={4} 
            speed={0.4} 
            opacity={0.5} 
            color={glowColor}
          />

          {/* Label if not near */}
          {!isNearMachine && (
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/rajdhani/v15/L10xVQD2tWkO8lIlM5Ok.woff"
            >
              {hovered ? "CLICK TO COMMUNE" : ""}
            </Text>
          )}
        </group>
      </Float>
    </group>
  );
}
