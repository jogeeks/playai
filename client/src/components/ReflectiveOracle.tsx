import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, CubeCamera, Environment } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

export function ReflectiveOracle() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { activeMachine, setActiveMachine } = useStore();
  const isActive = activeMachine === 'oracle';

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.1;
    group.current.rotation.x += delta * 0.05;
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
    setActiveMachine('oracle');
  };

  return (
    <group position={[6, 2, 2]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group 
            ref={group}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {/* The Shiny Cube */}
            <CubeCamera resolution={256} frames={1}>
                {(texture) => (
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[2.5, 2.5, 2.5]} />
                        <meshStandardMaterial 
                            color="#ffffff"
                            metalness={1}
                            roughness={0}
                            envMap={texture}
                            envMapIntensity={1.5}
                        />
                    </mesh>
                )}
            </CubeCamera>

            {/* Inner Glow */}
            <pointLight position={[0, 0, 0]} intensity={isActive ? 2 : 0} color="#00ffff" distance={5} />

             {/* Label */}
            {!isActive && (
                <Text
                position={[0, 2, 0]}
                fontSize={0.15}
                color="#0088aa"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.2}
                >
                {hovered ? "CONSULT ORACLE" : ""}
                </Text>
            )}
        </group>
      </Float>
      
      {/* Base Reflection Pool */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.9, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial 
            color="#000000"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
        />
      </mesh>
    </group>
  );
}
