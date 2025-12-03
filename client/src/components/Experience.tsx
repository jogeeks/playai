import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Machine } from './Machine';
import { Desert } from './Desert';
import { Suspense } from 'react';

export function Experience() {
  return (
    <div className="w-full h-screen bg-[#0a0500]">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting - Significantly Boosted for Visibility */}
        <hemisphereLight intensity={1} groundColor="#111111" color="#443322" />
        <ambientLight intensity={0.8} color="#aa8866" />
        
        {/* Golden Rim Light */}
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffaa55" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4466aa" />
        
        {/* Divine Spotlight from Above */}
        <spotLight 
            position={[0, 20, 0]} 
            angle={0.6} 
            penumbra={0.5} 
            intensity={5} 
            castShadow 
            color="#ffcc88"
            distance={50}
        />

        <Suspense fallback={null}>
          {/* World */}
          <color attach="background" args={['#080503']} /> {/* Dark warm brown-black */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={0.5} />
          
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
