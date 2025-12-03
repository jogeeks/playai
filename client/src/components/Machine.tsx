import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import * as THREE from 'three';

export function Machine() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { setNearMachine } = useStore();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, 0, 0]}
      onClick={() => setNearMachine(true)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Simple Cylinder */}
      <mesh>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "cyan"} />
      </mesh>
    </group>
  );
}
