import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// This is the actual 3D component that loads the file
function Model() {
  const { scene } = useGLTF('/portfolio.glb'); 
  return <primitive object={scene} scale={1.5} />;
}

export default function ModelPage() {
  return (
    // 'h-screen' makes the canvas fill the entire screen
    // 'pt-20' adds padding to the top so the header doesn't cover the model
    <div className="w-full h-screen bg-gray-900 pt-20" style={{ height: '100vh', width: '200vh' }}>
      <Canvas camera={{ position: [10, 2, 5], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        
        {/* Controls to rotate/zoom */}
        <OrbitControls />
        
        {/* Environment adds realistic reflections */}
        <Environment preset="city" />

        {/* The Model with a loading fallback */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}