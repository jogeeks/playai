import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, Icosahedron, Torus, Octahedron } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

export function Temple() {
  const group = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHover] = useState(false);
  const { activeMachine, setActiveMachine, isTransmuting, transmutation } = useStore();
  const isActive = activeMachine === 'temple';
  const hasTransmuted = !!transmutation;

  useFrame((state, delta) => {
    // Rotate the entire lantern slowly
    if (group.current) {
        group.current.rotation.y += delta * 0.1;
    }
    
    // Rotate rings in opposite directions
    if (ringsRef.current) {
        ringsRef.current.rotation.x += delta * 0.2;
        ringsRef.current.rotation.z -= delta * 0.1;
    }

    // Pulse the core
    if (coreRef.current) {
        const t = state.clock.getElapsedTime();
        const scale = isTransmuting ? 1 + Math.sin(t * 15) * 0.2 : 1 + Math.sin(t * 3) * 0.1;
        coreRef.current.scale.setScalar(scale);
        coreRef.current.rotation.y -= delta * 0.5;
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
    setActiveMachine('temple');
  };

  // Color logic
  const fireColor = hasTransmuted ? "#00ffff" : "#ff4400"; // Orange -> Cyan
  const emberColor = hasTransmuted ? "#ffffff" : "#ffaa00"; // Gold -> White

  return (
    <group position={[0, 3, -8]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[0, 0.5]}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {/* SACRED GEOMETRY LANTERN */}
            
            {/* The Rings (The "Laser Cut" Cage) */}
            <group ref={ringsRef}>
                {/* Ring 1 */}
                <Torus args={[2.5, 0.05, 16, 100]}>
                    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
                </Torus>
                {/* Ring 2 */}
                <Torus args={[2.3, 0.05, 16, 100]} rotation={[Math.PI/3, 0, 0]}>
                    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
                </Torus>
                {/* Ring 3 */}
                <Torus args={[2.1, 0.05, 16, 100]} rotation={[-Math.PI/3, 0, 0]}>
                    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
                </Torus>
            </group>

            {/* Outer Geometric Shell (Laser Cut feel) */}
            <Icosahedron args={[2.8, 0]}>
                 <meshStandardMaterial 
                    color="#FFD700" 
                    metalness={1} 
                    roughness={0.1} 
                    wireframe 
                    transparent 
                    opacity={0.3}
                />
            </Icosahedron>

            {/* Inner Core (The Fire Source) */}
            <mesh ref={coreRef}>
                <Octahedron args={[0.8, 0]} />
                <meshStandardMaterial 
                    color={fireColor}
                    emissive={fireColor}
                    emissiveIntensity={isTransmuting ? 4 : 2}
                    toneMapped={false}
                />
            </mesh>

            {/* Internal Light casting shadows through the gaps */}
            <pointLight 
                position={[0, 0, 0]} 
                intensity={isTransmuting ? 10 : 5} 
                color={fireColor} 
                distance={15}
                castShadow
                shadow-bias={-0.0001}
            />
            
            {/* Embers / Stardust */}
            <Sparkles 
                scale={[4, 6, 4]} 
                count={hasTransmuted ? 150 : 80} 
                speed={hasTransmuted ? 0.2 : 0.5} 
                opacity={0.8} 
                color={emberColor} 
                size={hasTransmuted ? 10 : 6}
            />

            {/* TRANSMUTATION EXPLOSION */}
            {isTransmuting && (
                <Sparkles 
                    scale={[6, 8, 6]} 
                    count={400} 
                    speed={4} 
                    opacity={1} 
                    color="#ff8800" 
                    size={15}
                />
            )}

             {/* Label */}
            {!isActive && (
                <Text
                position={[0, 4, 0]}
                fontSize={0.15}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.2}
                >
                {hovered ? "ENTER LANTERN" : ""}
                </Text>
            )}
        </group>
      </Float>
      
      {/* Base Shadow Projection */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -5, 0]} receiveShadow>
         <circleGeometry args={[4, 64]} />
         <meshStandardMaterial color="#000000" transparent opacity={0.3} roughness={1} />
      </mesh>
    </group>
  );
}
