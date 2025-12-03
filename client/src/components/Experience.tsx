import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Machine } from './Machine';

export function Experience() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
      >
        {/* Basic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Simple Background */}
        <color attach="background" args={['#111']} />

        {/* The Machine */}
        <Machine />

        {/* Debug Cube to verify rendering */}
        <mesh position={[3, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
