import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

export function Temple() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { activeMachine, setActiveMachine, isReleasing } = useStore();
  const isActive = activeMachine === 'temple';

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

  return (
    <group position={[0, 2, -8]}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {/* Temple Structure - Simple Wooden Pagoda Style */}
            
            {/* Base */}
            <mesh position={[0, -1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[3, 3.5, 0.5, 8]} />
                <meshStandardMaterial color="#5d4037" roughness={0.9} />
            </mesh>

            {/* Pillars */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[2 * Math.cos(i * Math.PI/2), 0.5, 2 * Math.sin(i * Math.PI/2)]}>
                    <cylinderGeometry args={[0.2, 0.2, 3, 8]} />
                    <meshStandardMaterial color="#3e2723" roughness={1} />
                </mesh>
            ))}

            {/* Roof 1 */}
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[4, 1.5, 4]} />
                <meshStandardMaterial color="#8d6e63" roughness={1} />
            </mesh>

            {/* Roof 2 (Top) */}
            <mesh position={[0, 3, 0]}>
                <coneGeometry args={[3, 1.5, 4]} />
                <meshStandardMaterial color="#8d6e63" roughness={1} />
            </mesh>
            
            {/* Central Fire / Light */}
            <pointLight position={[0, 0, 0]} intensity={isReleasing ? 5 : 1} color="#ff4400" distance={8} />
            
            {/* Embers always rising */}
            <Sparkles 
                position={[0, 1, 0]} 
                scale={[2, 4, 2]} 
                count={50} 
                speed={0.4} 
                opacity={0.6} 
                color="#ffaa00" 
                size={5}
            />

            {/* BURNING EFFECT when releasing */}
            {isReleasing && (
                <Sparkles 
                    position={[0, 4, 0]} 
                    scale={[3, 8, 3]} 
                    count={200} 
                    speed={2} 
                    opacity={0.8} 
                    color="#ff2200" 
                    size={10}
                />
            )}

             {/* Label */}
            {!isActive && (
                <Text
                position={[0, 4.5, 0]}
                fontSize={0.15}
                color="#8d6e63"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.2}
                >
                {hovered ? "ENTER TEMPLE" : ""}
                </Text>
            )}
        </group>
      </Float>
    </group>
  );
}
