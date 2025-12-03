import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, Icosahedron, Dodecahedron, Octahedron, Torus } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

export function Machine() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Group>(null);
  
  const [hovered, setHover] = useState(false);
  const { isNearMachine, setNearMachine, processingStep } = useStore();
  
  const isProcessing = !!processingStep;

  useFrame((state, delta) => {
    if (!group.current) return;

    // Hover animation handled by <Float>, but we can add rotation
    group.current.rotation.y += delta * 0.05;

    // Core pulsing
    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      const scale = isProcessing ? 1 + Math.sin(t * 10) * 0.1 : 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }

    // Sacred Geometry Rotation
    if (geomRef.current) {
        geomRef.current.rotation.x += delta * 0.1;
        geomRef.current.rotation.z -= delta * 0.05;
    }

    // Floor Mandala Rotation
    if (floorRef.current) {
        floorRef.current.rotation.z += delta * 0.02;
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
  const wireColor = isProcessing ? '#ff5500' : '#ffcc00'; // Amber/Gold

  return (
    <group position={[0, 1.5, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[0, 0.3]}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
          {/* Main Obelisk Body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 3, 6]} />
            <meshStandardMaterial 
                color="#d7ccc8" 
                metalness={0.1} 
                roughness={0.9} 
                emissive={hovered ? '#5d4037' : '#2a1a10'}
                emissiveIntensity={0.2}
            />
          </mesh>

          {/* Gold Inlays */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.02, 1.02, 3.05, 6]} />
            <meshStandardMaterial 
                color="#ffcc00"
                metalness={1}
                roughness={0.2}
                wireframe
                transparent
                opacity={0.3}
            />
          </mesh>

          {/* SACRED GEOMETRY: Rotating Outer Cage */}
          <group ref={geomRef}>
             <Icosahedron args={[2.5, 0]}>
                <meshStandardMaterial color="#ffaa55" wireframe transparent opacity={0.3} />
             </Icosahedron>
             <Dodecahedron args={[1.8, 0]} rotation={[0, Math.PI/4, 0]}>
                <meshStandardMaterial color="#ffcc00" wireframe transparent opacity={0.4} />
             </Dodecahedron>
          </group>

          {/* Floating Merkaba (Star Tetrahedron) above */}
          <group position={[0, 2.5, 0]}>
             <Octahedron args={[0.5, 0]}>
                <meshStandardMaterial color="#ffaa00" metalness={1} roughness={0} />
             </Octahedron>
             <Octahedron args={[0.8, 0]} rotation={[Math.PI/4, Math.PI/4, 0]}>
                <meshStandardMaterial color="#ffddaa" wireframe />
             </Octahedron>
          </group>

          {/* Glowing Core */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color={coreColor} />
          </mesh>
          <pointLight position={[0, 0, 0]} distance={5} intensity={3} color={coreColor} />

          {/* Particles */}
          <Sparkles 
            count={80} 
            scale={6} 
            size={8} 
            speed={0.2} 
            opacity={0.6} 
            color="#ffd700"
          />

          {/* Label */}
          {!isNearMachine && (
            <Text
              position={[0, 3.5, 0]}
              fontSize={0.15}
              color="#5d4037"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              {hovered ? "DISPENSE" : ""}
            </Text>
          )}
        </group>
      </Float>

      {/* FLOOR MANDALA - Projected on ground */}
      <group position={[0, -3.4, 0]} rotation={[-Math.PI/2, 0, 0]} ref={floorRef}>
         {/* Concentric Rings */}
         <mesh>
            <ringGeometry args={[2, 2.1, 64]} />
            <meshBasicMaterial color="#ffaa55" transparent opacity={0.3} />
         </mesh>
         <mesh>
            <ringGeometry args={[3.5, 3.6, 64]} />
            <meshBasicMaterial color="#ffaa55" transparent opacity={0.2} />
         </mesh>
         <mesh rotation={[0, 0, Math.PI/6]}>
            <ringGeometry args={[2.8, 2.85, 6]} /> {/* Hexagon */}
            <meshBasicMaterial color="#ffcc00" transparent opacity={0.4} />
         </mesh>
         <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[2.8, 2.85, 6]} /> {/* Hexagon */}
            <meshBasicMaterial color="#ffcc00" transparent opacity={0.4} />
         </mesh>
      </group>
    </group>
  );
}
