import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Loader } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/portfolio.glb'); 
  if (!window.alreadyLoaded) {
    throw new Promise((resolve) => {
      setTimeout(() => {
        window.alreadyLoaded = true;
        resolve();
      }, 3000); // 3000ms = 3 seconds
    });
  }
  return <primitive object={scene} scale={0.5} />;
}

export default function ModelPage() {
  return (
    <div className="w-full h-screen bg-gray-900 pt-20">
      
      <Canvas camera={{ position: [0, 2, -3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>

      {/* Put this OUTSIDE the Canvas. It automatically detects R3F loading. */}
      <Loader 
        containerStyles={{ background: '#fafafc',
    zIndex: 1000, /* <--- Force it to the top */
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%' }} // Tailwind gray-900
        innerStyles={{ width: '300px', height: '10px', background: '#eeeeee' }} // Bar container
        barStyles={{ background: '#3b82f6', height: '10px' }} // Blue bar
        dataStyles={{ color: '#9ca3af', fontSize: '14px' }} // Text style
      />
    </div>
  );
}