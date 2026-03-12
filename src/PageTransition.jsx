import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ trigger, onComplete }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete(); // Tells Header/App that transition is done
      }
    });

    // We define the SVG path dimensions (100x100 relative)
    // Start: A flat line off-screen left
    // Mid: A curved "bulge" sweeping the screen
    // End: Flat line off-screen right
    const curve = 100;
    const flat = 0;

    tl.set(containerRef.current, { display: 'block' })
      .fromTo(pathRef.current, 
        { attr: { d: `M 0 0 V 100 Q 0 50 0 0` } }, 
        { 
          attr: { d: `M 0 0 V 100 Q ${curve} 50 0 0` }, 
          duration: 0.8, 
          ease: "power4.in" 
        }
      )
      .to(pathRef.current, { 
        attr: { d: `M 0 0 V 100 Q ${curve} 50 100 100 V 0 Z` }, 
        duration: 0.5, 
        ease: "power2.out" 
      })
      // At this point, the screen is black. 
      // This is where the scroll/navigation actually happens.
      .to(pathRef.current, { 
        attr: { d: `M 100 0 V 100 Q 100 50 100 0` }, 
        duration: 0.8, 
        ease: "power4.out" 
      })
      .set(containerRef.current, { display: 'none' });

  }, [trigger, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[300] hidden pointer-events-none">
      <svg className="w-full h-full fill-black">
        <path ref={pathRef} d="M 0 0 V 100 Q 0 50 0 0" />
      </svg>
    </div>
  );
}