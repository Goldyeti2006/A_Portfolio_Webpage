import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ isTriggered, onComplete }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
  if (!isTriggered) return;

  const tl = gsap.timeline({ onComplete });

  // ALL frames: M x y  L x y  L x y  Q cx cy x y  Z
  // (0,0)=top-left  (100,0)=top-right
  // (0,100)=bottom-left  (100,100)=bottom-right

tl.set(containerRef.current, { display: 'block' })

  // Collapsed at bottom-left
  .fromTo(pathRef.current,
    { attr: { d: 'M 0 100  L 0 100  L 0 100  Q 0 100 0 100  Z' } },
    // Leading edge bows RIGHT (Q x=140 pushes curve outward beyond the screen)
    { attr: { d: 'M 0 0  L 0 100  L 100 100  Q 140 50 100 0  Z' },
      duration: 0.7, ease: 'power3.in' }
  )

  // Full screen — flatten the bow
  .to(pathRef.current,
    { attr: { d: 'M 0 0  L 0 100  L 100 100  Q 100 50 100 0  Z' },
      duration: 0.15, ease: 'none' }
  )

  // Exit: left side peels away, right bows LEFT as it leaves
  .to(pathRef.current,
    { attr: { d: 'M 0 0  L 0 100  L 60 100  Q -40 50 60 0  Z' },
      duration: 0.45, ease: 'power3.in' }
  )

  // Collapse to top-right
  .to(pathRef.current,
    { attr: { d: 'M 100 0  L 100 0  L 100 0  Q 100 0 100 0  Z' },
      duration: 0.45, ease: 'power3.out' }
  )

  .set(containerRef.current, { display: 'none' });
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