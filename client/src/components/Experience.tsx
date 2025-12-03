import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Machine } from './Machine';
import { ReflectiveOracle } from './ReflectiveOracle';
import { Desert } from './Desert';
import { Suspense } from 'react';

export function Experience() {
  return (
    <div className="w-full h-screen bg-[#87CEEB]">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Day Lighting */}
        <hemisphereLight intensity={0.6} groundColor="#E6C288" color="#87CEEB" />
        <ambientLight intensity={0.5} color="#ffffff" />
        
        {/* Sun Light */}
        <directionalLight 
            position={[50, 100, 50]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            color="#fffbe6"
        />
        {/* Fill Light */}
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#90d3ff" />

        {/* World */}
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 15, 60]} />
        
        {/* Sky Shader for nice sun/atmosphere */}
        <Sky 
            distance={450000} 
            sunPosition={[10, 10, 10]} 
            inclination={0.6} 
            azimuth={0.25} 
            turbidity={10}
            rayleigh={0.5}
        />
        
        <group>
           <Desert />
           <Machine />
           <ReflectiveOracle />
        </group>

        <OrbitControls 
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={3}
          maxDistance={20}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
