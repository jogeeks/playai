import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Machine } from './Machine';
import { Desert } from './Desert';

export function Experience() {
  return (
    <div className="w-full h-screen bg-[#0a0500]">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        // Disable shadows for now to rule out shadow map issues
      >
        {/* Basic Lights */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        
        {/* Simple Background */}
        <color attach="background" args={['#111']} />

        {/* Grouping World */}
        <group>
           <Desert />
           <Machine />
        </group>

        {/* Debug Cube at Center - GUARANTEED VISIBILITY */}
        <mesh position={[2, 1, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="red" wireframe />
        </mesh>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
