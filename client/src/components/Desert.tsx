import { useRef } from 'react';
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
        color="#E6C288" /* Bright Sand Color */
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
