import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Loader } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/portfolio.glb'); 
  return <primitive object={scene} scale={10} />;
}

export default function ModelPage() {
  return (
    <div className="w-full h-screen bg-gray-900 pt-20">
      
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
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
        containerStyles={{ background: '#111827' }} // Tailwind gray-900
        innerStyles={{ width: '300px', height: '10px', background: '#374151' }} // Bar container
        barStyles={{ background: '#3b82f6', height: '10px' }} // Blue bar
        dataStyles={{ color: '#9ca3af', fontSize: '14px' }} // Text style
      />
    </div>
  );
}