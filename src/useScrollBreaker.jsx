import { useEffect, useRef } from 'react';

let GLOBAL_BROKEN = false; // ← outside everything, no closure issues
let GLOBAL_LAST_TIME = 0;

export function useScrollBreaker(lenisRef, sectionIds, pauseDuration = 200) {
  const lastScroll = useRef(0);

  useEffect(() => {
    let cleanup;

    const init = () => {
      if (!lenisRef || !lenisRef.current) return false;
      const lenis = lenisRef.current;

      const getThresholds = () =>
        sectionIds
          .map(id => document.getElementById(id))
          .filter(Boolean)
          .map(el => ({ id: el.id, top: el.offsetTop }))
          .filter(({ top }) => top > 100);

      const handleScroll = ({ scroll }) => {
        if (GLOBAL_BROKEN) return;
        if (Date.now() - GLOBAL_LAST_TIME < 1500) return;

        const direction = scroll > lastScroll.current ? 'down' : 'up';
        lastScroll.current = scroll;

        const crossed = getThresholds().find(({ top }) => {
          const buffer = top < 800 ? 40 : 30;
          return Math.abs(scroll - top) < buffer;
        });

       if (crossed) {
  GLOBAL_BROKEN = true;
  GLOBAL_LAST_TIME = Date.now();

  // Snap exactly to section top, then freeze
  lenis.scrollTo(crossed.top, { 
    immediate: true,  // no animation, just snap
    force: true       // override any ongoing scroll
  });
  
  // Small delay so the snap renders before stopping
  setTimeout(() => lenis.stop(), 16); // one frame later

  setTimeout(() => {
    lenis.start();
    GLOBAL_BROKEN = false;
  }, pauseDuration);
}
      };

      lenis.on('scroll', handleScroll);
      return () => lenis.off('scroll', handleScroll);
    };

    const interval = setInterval(() => {
      const result = init();
      if (result) { cleanup = result; clearInterval(interval); }
    }, 100);

    return () => { clearInterval(interval); cleanup?.(); };
  }, []);
}