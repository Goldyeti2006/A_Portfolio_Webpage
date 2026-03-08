import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const logoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete // Tells App.jsx that the intro is done
    });

    // 1. Initial State: Logo starts large and centered
    gsap.set(logoRef.current, { 
      scale: 2, 
      opacity: 0,
      y: 50 
    });

    // 2. The Animation Sequence
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out"
    })
    .to(logoRef.current, {
      // These coordinates move it toward the header's center position
      y: "-42vh", 
      scale: 1,
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.5
    })
    .to(screenRef.current, {
      opacity: 0,
      duration: 0.8,
      pointerEvents: "none"
    }, "-=0.5"); // Start fading the screen slightly before the logo finishes moving

  }, [onComplete]);

  return (
    <div 
      ref={screenRef}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* The Animated Logo */}
      <img 
        ref={logoRef}
        src="/image.png" 
        alt="Loading..." 
        className="h-12 invert" 
      />
      
      {/* Optional: Subtle scanline effect for that cyber vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
}