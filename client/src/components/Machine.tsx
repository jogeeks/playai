import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import * as THREE from 'three';

export function Machine() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { isNearMachine, setNearMachine } = useStore();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.2;
  });

  return (
    <group 
        ref={group} 
        position={[0, 1.5, 0]}
        onClick={() => setNearMachine(true)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
    >
      {/* Simple Cylinder - Basic Material to ignore lighting issues */}
      <mesh>
        <cylinderGeometry args={[1, 1, 3, 6]} />
        <meshBasicMaterial color={hovered ? "#ffaa00" : "#443322"} wireframe={false} />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh>
        <cylinderGeometry args={[1.05, 1.05, 3.1, 6]} />
        <meshBasicMaterial color="#ffaa55" wireframe />
      </mesh>
    </group>
  );
}
