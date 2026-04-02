import { useState, useEffect, useRef } from 'react';

export default function CyclingText({
  words = ['word1', 'word2'],
  interval = 2500,
  className = '',
  wrapperClassName = '',
  direction = 'up',
}) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [phase, setPhase] = useState('idle');
  const currentRef = useRef(0);
  const wrapperRef = useRef(null);
  const currentSpanRef = useRef(null);
  const nextSpanRef = useRef(null);
  const exitY   = direction === 'up' ? '-115%' : '115%';  // current slides this way out
  const enterY  = direction === 'up' ? '115%'  : '-115%'; // next comes from this direction

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentRef.current + 1) % words.length;

      // Lock wrapper width to current word before switching
      if (wrapperRef.current && currentSpanRef.current) {
        wrapperRef.current.style.width = `${currentSpanRef.current.offsetWidth}px`;
      }

      setNext(nextIndex);
      setPhase('switching');

      // Animate wrapper width to next word width
      setTimeout(() => {
        if (wrapperRef.current && nextSpanRef.current) {
          wrapperRef.current.style.width = `${nextSpanRef.current.offsetWidth}px`;
        }
      }, 50);

      // After animation done — snap reset with rAF to guarantee a frame
      setTimeout(() => {
        currentRef.current = nextIndex;
        setCurrent(nextIndex);
        setPhase('reset');

        // Wait exactly one frame then go idle
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {   // double rAF = guaranteed paint
            setPhase('idle');
            if (wrapperRef.current) {
              wrapperRef.current.style.width = 'auto';
            }
          });
        });
      }, 520);

    }, interval);

    return () => clearInterval(timer);
  }, []);

  const t = 'transform 0.5s cubic-bezier(0.76,0,0.24,1), opacity 0.4s ease';

  return (
    <span
      ref={wrapperRef}
      className={`relative align-bottom ${wrapperClassName}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'bottom',
        clipPath: 'inset(-0.2em 0)',   // negative inset = extra room for font
        transition: 'width 0.5s cubic-bezier(0.76,0,0.24,1)', // smooth width change
      }}
    >
      {/* Current word — slides out up */}
      <span
        ref={currentSpanRef}
        className={className}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          padding: '0.1em 0',
          transform: phase === 'switching' ? `translateY(${exitY})` : 'translateY(0%)',
          opacity: phase === 'switching' ? 0 : 1,
          transition: phase === 'reset' ? 'none' : t,
          position: phase === 'switching' ? 'absolute' : 'relative',
        }}
      >
        {words[current]}
      </span>

      {/* Next word — slides in from below */}
      <span
        ref={nextSpanRef}
        className={className}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          padding: '0.1em 0',
          transform: phase === 'switching' ? 'translateY(0%)' : `translateY(${enterY})`,
          opacity: phase === 'switching' ? 1 : 0,
          transition: phase === 'reset' ? 'none' : t,
          position: phase === 'switching' ? 'relative' : 'absolute',
        }}
      >
        {words[next]}
      </span>
    </span>
  );
}