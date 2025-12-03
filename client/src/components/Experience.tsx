import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Machine } from './Machine';
import { Desert } from './Desert';
import { Suspense } from 'react';

export function Experience() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#4a4a6a" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff9900" />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#00ffff" />
        <spotLight 
            position={[0, 15, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
            color="#00ffff"
        />

        <Suspense fallback={null}>
          {/* World */}
          <color attach="background" args={['#050510']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <group>
             <Desert />
             <Machine />
          </group>

          <OrbitControls 
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={3}
            maxDistance={20}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
