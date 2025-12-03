import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky, Environment } from '@react-three/drei';
import { Machine } from './Machine';
import { Desert } from './Desert';
import { useStore } from '../store';
import { Suspense } from 'react';

export function Experience() {
  const isNearMachine = useStore((state) => state.isNearMachine);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Environment */}
          <color attach="background" args={['#050510']} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} color="#4a4a6a" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff9900" />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00ffff" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
            color="#00ffff"
          />

          <Environment preset="city" />

          {/* World */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sky 
            distance={450000} 
            sunPosition={[0, -1, -10]} /* Night time / Sunset glow position */
            inclination={0} 
            azimuth={0.25} 
            turbidity={10}
            rayleigh={3}
            mieCoefficient={0.005}
            mieDirectionalG={0.7}
          />
          <fog attach="fog" args={['#050510', 5, 30]} />

          <Desert />
          <Machine />

          {/* Camera Controls */}
          <OrbitControls 
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={3}
            maxDistance={15}
            enablePan={false}
            // When near, lock camera somewhat or just let user explore?
            // Let's keep it free but constrained
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
