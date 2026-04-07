import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ isTriggered,  onCover, onComplete }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
  if (!isTriggered) return;

  const tl = gsap.timeline({ onComplete });

  // ALL frames: M x y  L x y  L x y  Q cx cy x y  Z
  // (0,0)=top-left  (100,0)=top-right
  // (0,100)=bottom-left  (100,100)=bottom-right

tl.set(containerRef.current, { display: 'block' })

  .fromTo(pathRef.current,
    // Collapsed — all at BL corner (outside viewBox so no flash)
    { attr: { d: 'M -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 Z' } },

    // Corners as anchors, edges bow outward — guaranteed full coverage
    { attr: { d: 'M -10 -10 C 50 -60 50 -60 110 -10 C 160 50 160 50 110 110 C 50 160 50 160 -10 110 C -60 50 -60 50 -10 -10 Z' },
      duration: 1.4, ease: 'power3.inOut' }
  )

  .to(pathRef.current,
    { attr: { d: 'M -10 -10 C 50 -60 50 -60 110 -10 C 160 50 160 50 110 110 C 50 160 50 160 -10 110 C -60 50 -60 50 -10 -10 Z' },
      duration: 0.15, ease: 'none' }
  )

  .to(containerRef.current, {
    duration: 0.6,
    onComplete: () => onCover?.()
  })

  .set(containerRef.current, { display: 'none' })
  .call(() => onComplete());
}, [isTriggered, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[300] hidden pointer-events-none">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full fill-black"
      >
        <path ref={pathRef} d="M 0 100 L 0 100 L 0 100 Q 0 100 0 100 Z" />
      </svg>
    </div>
  );
}