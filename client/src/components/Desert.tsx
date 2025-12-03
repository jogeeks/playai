import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Desert() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle movement of the dunes over time? 
      // Or just static. Let's keep it static but distorted.
      // Actually, shifting the time uniform of distort material makes it look like shifting sands
      // (meshRef.current.material as any).time = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -1, 0]} 
      receiveShadow
    >
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial 
        color="#C76B38" /* Sand color */
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}
