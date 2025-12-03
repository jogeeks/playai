import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky, Html } from '@react-three/drei';
import { Machine } from './Machine';
import { Desert } from './Desert';
import { useStore } from '../store';
import { Suspense } from 'react';

function Loader() {
  return (
    <Html center>
      <div className="text-cyan-500 font-orbitron animate-pulse">
        INITIALIZING REALITY...
      </div>
    </Html>
  );
}

export function Experience() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<Loader />}>
          {/* Debug Box to ensure 3D is working */}
          <mesh position={[3, 2, 0]}>
             <boxGeometry />
             <meshStandardMaterial color="hotpink" />
          </mesh>

          {/* Lighting - simplified */}
          <ambientLight intensity={0.5} color="#4a4a6a" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ff9900" />
          <pointLight position={[-10, 5, -10]} intensity={1} color="#00ffff" />
          
          {/* World */}
          <color attach="background" args={['#050510']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Explicitly removed Environment to test if it was blocking */}
          
          <Desert />
          <Machine />

          <OrbitControls 
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={3}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
