import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Desert() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]} 
      receiveShadow
    >
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial 
        color="#2a1a10" /* Dark Brown Earth - Lighter than void */
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}
