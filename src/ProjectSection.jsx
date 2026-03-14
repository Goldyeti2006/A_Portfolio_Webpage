import { useState, useRef,  useCallback } from 'react';
import { createPortal } from 'react-dom';
import ProjectFolder from './ProjectFolder';
import ESP32ProjectSection from './ESP32ProjectSection';
import './index.css';
import HoverPopup from './HoverPopup';
import CyclingText from './CyclingText';
import './index.css';

export default function ProjectsSection() {
  const [popup, setPopup] = useState(null);
  const lastPopupRef = useRef(null); // ← retains last data during exit
  const popupRef = useRef(null);

  const movePopup = useCallback((e) => {
    if (popupRef.current) {
      popupRef.current.style.left = (e.clientX + 24) + 'px';
      popupRef.current.style.top  = (e.clientY - 80) + 'px';
    }
  }, []);

  const makePreview = (item) => ({
    onEnter: (e) => { 
      lastPopupRef.current = item; // ← save before setting
      setPopup(item); 
      movePopup(e); 
    },
    onMove:  (e) => { movePopup(e); },
    onLeave: ()  => { setPopup(null); }, // lastPopupRef still has the data
  });

  // Use lastPopupRef for visuals — never goes null
  const displayData = popup || lastPopupRef.current;

  return (
    <div className="text-left p-6 text-[#fffdd0]">
        <div className="h-20 mt-4 flex text-6xl items-center justify-center text-[#FF3831]">~~~~~</div>
        <div className="text-4xl md:text-5xl font-bold mb-12">
          <CyclingText words={['Projects' , 'Experiences']}  className="text-6xl font-bold text-center text-[#FF3831]"/> <div> I've</div><CyclingText words={[' built',' developed']}  className="text-6xl font-bold text-center"/></div>
       <ProjectFolder
        title="ESP32 Hardware Analysis"
        titleColor="#fffdd0"
        preview={makePreview({ 
          color: '#1a1a2e', 
          tag: 'An Evil Twin Simulation', 
          image: 'Esp32.webp', 
        })}
      >
        <ESP32ProjectSection />
      </ProjectFolder>

      <ProjectFolder
        title="Project Feather"
        preview={makePreview({ 
          color: '#FF3831', 
          tag: 'A Lightweight Browser', 
          tagColor: '#222222',
          image: 'Feather.jpg', 
        })}
      >
        <div>...</div>
      </ProjectFolder>

      {createPortal(
        <div
          ref={popupRef}
          className="fixed pointer-events-none z-[999] rounded-2xl overflow-hidden
                     flex flex-col items-center justify-center gap-3 p-6
                     min-w-[180px] min-h-[160px]"
          style={{
            background: displayData?.color,  // ← always has a color
            willChange: 'transform',
            transformOrigin: 'top left',
            transform: popup
              ? 'perspective(600px) scale(1) rotateX(0deg) rotateY(0deg)'
              : 'perspective(600px) scale(0.3) rotateX(40deg) rotateY(-30deg)',
            opacity: popup ? 1 : 0,
            transition: popup
              ? 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.1s ease'
              : 'transform 0.2s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.2s ease 0.05s',
          }}
        >
          {displayData?.image && (
            <img src={displayData.image} alt="" className="w-28 h-auto object-contain" />
          )}
          {displayData?.tag && (
            <span className="rounded-full px-4 py-1 text-sm border border-white/20 text-white/70">
              {displayData.tag}
            </span>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}