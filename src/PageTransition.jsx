import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ isTriggered, onCover, onComplete }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  
  // 1. MAGIC FIX: Store the functions in a ref so they update silently 
  // without triggering the GSAP useEffect to restart.
  const callbacks = useRef({ onCover, onComplete });
  
  useEffect(() => {
    callbacks.current = { onCover, onComplete };
  }, [onCover, onComplete]);

  useEffect(() => {
    if (!isTriggered) return;

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({ 
        // 2. Call the ref version of onComplete
        onComplete: () => callbacks.current.onComplete?.() 
      });

      // 3. Added 'opacity: 1' here to guarantee it never gets stuck invisible
      tl.set(containerRef.current, { display: 'block', opacity: 1 })

        .fromTo(pathRef.current,
          { attr: { d: 'M -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 C -10 110 -10 110 -10 110 Z' } },
          { attr: { d: 'M -10 -10 C 50 -60 50 -60 110 -10 C 160 50 160 50 110 110 C 50 160 50 160 -10 110 C -60 50 -60 50 -10 -10 Z' },
            duration: 1.4, ease: 'power3.inOut' }
        )

        // 4. Call the ref version of onCover
        .call(() => callbacks.current.onCover?.())

        .to(pathRef.current, { duration: 0.15 })
        .to(containerRef.current, { duration: 0.6, opacity: 0 })
        .set(containerRef.current, { display: 'none', opacity: 1 });
    });

    return () => ctx.revert(); 
    
  }, [isTriggered]); // 5. CRITICAL: Removed onCover and onComplete from this array!

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