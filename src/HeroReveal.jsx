import React, { useState } from 'react';

export default function HeroReveal() {
  // 1. State to track where the mouse is pointing
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 2. Update coordinates whenever the mouse moves over this container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden cursor-crosshair bg-slate-950"
      onMouseMove={handleMouseMove}
    >
      {/* =========================================
          LAYER 1: THE BOTTOM "SECURITY" PAGE (Dark) 
          ========================================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 font-mono text-emerald-500 z-0">
         <h1 className="text-5xl md:text-7xl font-bold mb-4">root@goldyeti:~#</h1>
         <p className="text-xl md:text-2xl opacity-80">Executing hybrid_defense.sh...</p>
         
         {/* Fake terminal output to look cool */}
         <div className="mt-8 text-sm opacity-50 space-y-2 text-left w-full max-w-2xl">
            <p>[+] Analyzing frontend vulnerabilities... 0 found.</p>
            <p>[+] Hardening React components...</p>
            <p>[+] Penetration testing in progress...</p>
         </div>
      </div>

      {/* =========================================
          LAYER 2: THE TOP "DESIGN" PAGE (Light) 
          ========================================= */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-slate-900 p-10 z-10 pointer-events-none transition-opacity"
        style={{
          // THE MAGIC: This creates a transparent circle at the mouse (x, y)
          // 'transparent 150px' = size of the hole
          // 'black 170px' = softens the edge of the flashlight
          WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 170px)`,
          maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 170px)`
        }}
      >
         <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 text-center">
            Beautifully <br/> Crafted.
         </h1>
         <p className="text-xl md:text-2xl font-light text-center max-w-2xl">
            Clean interfaces and intuitive user experiences.
         </p>
         
         <p className="absolute bottom-10 text-sm font-semibold tracking-widest uppercase text-gray-400 animate-pulse">
            Hover to inspect security layer
         </p>
      </div>

    </div>
  );
}