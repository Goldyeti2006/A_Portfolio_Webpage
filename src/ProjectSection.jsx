import { useState, useRef,  useCallback } from 'react';
import { createPortal } from 'react-dom';
import ProjectFolder from './ProjectFolder';
import ESP32ProjectSection from './ESP32ProjectSection';
import './index.css';
import HoverPopup from './HoverPopup';
import CyclingText from './CyclingText';
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
        <div className="text-4xl md:text-5xl font-bold mb-12 flex flex-col md:flex-row items-center justify-center gap-3">
          <CyclingText words={['Projects' , 'Experiences' , 'lessons']}  className="text-6xl font-bold text-center text-[#FF3831]" direction='up'/>
           <span className="shrink-0 whitespace-nowrap text-6xl font-bold"> I've</span>
           <CyclingText words={[' built',' developed', 'learned']}  className="text-6xl font-bold text-center" direction='down'/></div>
       <ProjectFolder
  
        title="ESP32 Hardware Analysis"
        titleColor="#fffdd0"
        preview={makePreview({ 
          color: '#7171ff', 
          tag: 'An Evil Twin Simulation', 
          image: 'Esp32.webp', 
        })}
      > <div className="px-4 py-6 border border-white/20 gap-8">
        <ESP32ProjectSection />
        </div>
      </ProjectFolder>
      <ProjectFolder
        title="Project Feather"
        preview={makePreview({ 
          color: '#fc6100', 
          tag: 'A Lightweight Browser', 
          tagColor: '#222222',
          image: 'Feather.jpg', 
        })}
      >
        <div className="flex flex-col lg:flex-row items-start px-4 py-6 border border-white/20 gap-8">
        <div className="w-full lg:w-1/2 text-white">
        <h3 className="text-2xl font-bold mb-2">Feather: Privacy-First Minimal Browser</h3>

        <p className="project-pitch mb-4">
          <strong>Feather: High-Efficiency Rust Browser</strong><br />
          Memory-First Web Architecture
          A lightweight web browser built from the ground up in Rust, designed to eliminate "RAM bloat" through aggressive state serialization and intelligent tab hibernation.
        </p>

        <div className="project-section mb-4">
          <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Tech Stack</h4>
          <ul className="list-disc pl-5">
            <li><strong>Core Engine:</strong>Rust, Servo (WebRender), Winit</li>
            <li><strong>Memory Management:</strong>Custom LRU (Least Recently Used) Hibernation Logic</li>
            <li><strong>Frontend</strong> Slint UI</li>
            <li><strong>Parallelism:</strong> Rayon for multi-threaded CSS styling and layout</li>
          </ul>
        </div>

        <div className="project-section mb-4">
          <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Key Features</h4>
          <ul className="list-disc pl-5">
            <li><strong>Zero-Cost Hibernation:</strong>Automatically serializes inactive tab states to disk, reducing idle memory footprint by up to 90%.</li>
            <li><strong>Ownership-Based Safety:</strong>Leverages Rust`s borrow checker to eliminate memory leaks and dangling pointers common in C++ browsers.</li>
            <li><strong>Aggressive Reclamation:</strong> A custom "Garbage Collector" for the UI that drops unused assets the millisecond focus shifts, keeping the system "Feather" light.</li>
            <li><strong>Instant-Snap Awakening: </strong>Optimized binary deserialization that brings hibernated tabs back to a fully interactive state in under 200ms.</li>
          </ul>
        </div>

        <p className="project-concepts mb-4 text-sm text-gray-300">
          <strong>Concepts Mastered:</strong>Systems Programming in Rust, RAII (Resource Acquisition Is Initialization), Asynchronous I/O, and Desktop Lifecycle Management
        </p>
        <button 
          onClick={() => window.open("https://github.com/Goldyeti2006/feather", "_blank")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
          className="px-5 py-2.5 
          bg-gray-800 
          border border-gray-600
           hover:bg-gray-700 
           text-white rounded-lg 
           transition-colors 
           font-semibold 
           flex items-center 
           gap-2
           hover:!translate-x-1 
           hover:!-translate-y-2 
           hover:!scale-[1.02] 
           hover:!shadow-lg 
           hover:!shadow-[#FF3831]/20"
        >
        Source Code
        </button>
        </div>
        <div className="bg-white/20 w-full lg:w-1/2 my-4">
        {/* Video right here - part of Feather's content */}
        <video width="100%" 
        preload="metadata" 
        className="rounded-lg"
        autoPlay 
        muted 
        loop >
          <source src="/feather.mp4" type="video/mp4" />
        </video>
        </div>
      </div>
      </ProjectFolder>
      <ProjectFolder
  title="Project Diomede"
  preview={makePreview({ 
    color: '#0ea5e9', // A clean, medical/tech blue
    tag: '3D Medical Viewer', 
    tagColor: '#ffffff',
    image: 'Docom.jpg', // Replace with your screenshot
  })}
>
  <div className="flex flex-col lg:flex-row items-start px-4 py-6 border border-white/20 gap-8">
    
    {/* LEFT SIDE: TEXT & LINKS */}
    <div className="w-full lg:w-1/2 text-white">
      <h3 className="text-2xl font-bold mb-2">Diomede: 3D DICOM Ecosystem</h3>

      <p className="project-pitch mb-4">
        <strong>Zero-Footprint Medical Imaging</strong><br />
        A high-performance web application engineered to render heavy 3D volumetric medical scans (CT/MRI) directly in the browser. Built as a Proof of Concept for Google Summer of Code 2026, it eliminates UI freezing through a strictly decoupled Python ingestion pipeline.
      </p>

      <div className="project-section mb-4">
        <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Tech Stack</h4>
        <ul className="list-disc pl-5">
          <li><strong>Frontend:</strong> React, Tailwind CSS, Web Workers</li>
          <li><strong>3D Rendering:</strong> Three.js (WebGL), Cornerstone.js</li>
          <li><strong>Backend & Data:</strong> Python (Flask), PostgreSQL, pydicom</li>
          <li><strong>Security:</strong> Google OAuth 2.0, JWT Session State</li>
        </ul>
      </div>

      <div className="project-section mb-4">
        <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Key Features</h4>
        <ul className="list-disc pl-5">
          <li><strong>Volumetric Raycasting:</strong> Extrudes 2D DICOM slices into fully manipulatable 3D WebGL models natively in the browser.</li>
          <li><strong>Decoupled Ingestion:</strong> An asynchronous Python worker pre-processes gigabytes of binary medical data to prevent main-thread blocking.</li>
          <li><strong>Aggressive Optimization:</strong> Utilizes dynamic imports and route-based code splitting to keep the initial JS payload under 400kB.</li>
        </ul>
      </div>

      <p className="project-concepts mb-6 text-sm text-gray-300">
        <strong>Concepts Mastered:</strong> WebGL Context Management, Medical Metadata Parsing, Full-Stack Architecture, and Secure Authentication Flows.
      </p>

      {/* CALL TO ACTION BUTTONS (The "Attractive" Addition) */}
      <div className="flex flex-wrap gap-4 mt-auto">
        <button 
          onClick={() => window.open("https://diomede-viewer.vercel.app/", "_blank")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
          className="px-5 py-2.5 
          bg-gray-800 
          border border-gray-600
           hover:bg-gray-700 
           text-white rounded-lg 
           transition-colors 
           font-semibold 
           flex items-center 
           gap-2
           hover:!translate-x-1 
           hover:!-translate-y-2 
           hover:!scale-[1.02] 
           hover:!shadow-lg 
           hover:!shadow-[#FF3831]/20"
        >
        Visit Site
        </button>
        <button 
          onClick={() => window.open("https://github.com/Goldyeti2006/diomede-viewer", "_blank")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
          className="px-5 py-2.5 
          bg-gray-800 
          border border-gray-600
           hover:bg-gray-700 
           text-white rounded-lg 
           transition-colors 
           font-semibold 
           flex items-center 
           gap-2
           hover:!translate-x-1 
           hover:!-translate-y-2 
           hover:!scale-[1.02] 
           hover:!shadow-lg 
           hover:!shadow-[#FF3831]/20"
        >
        Source Code
        </button>
      </div>
    </div>

    {/* RIGHT SIDE: MEDIA / VIDEO */}
      {/* Added a subtle glassmorphism border to make the video pop */}
      <div className="w-full lg:w-1/2 my-4">
      {/* Glassmorphism border for the visual catch */}
      <div className="bg-white/5 border border-white/10 p-2 rounded-xl shadow-2xl">
        <img src="/diomede.png"
                       className="rounded-lg object-cover"></img>
      </div>
    </div>
    
  </div>
</ProjectFolder>
<ProjectFolder
  title="Kobold: HTB Machine"
  preview={makePreview({ 
    color: '#10b981', // A clean, cyber/terminal emerald green
    tag: 'CTF Write-up', 
    tagColor: '#ffffff',
    image: 'CTF-popup.jpg', // Replace with your CTF cover or Arcane logo screenshot
  })}
>
  <div className="flex flex-col lg:flex-row items-start px-4 py-6 border border-white/20 gap-8">
    
    {/* LEFT SIDE: TEXT & LINKS */}
    <div className="w-full lg:w-1/2 text-white">
      <h3 className="text-2xl font-bold mb-2">Kobold: Advanced Web Exploitation</h3>

      <p className="project-pitch mb-4">
        <strong>White Box Penetration Testing Journey</strong><br />
        A comprehensive vulnerability analysis demonstrating advanced enumeration, source code auditing, and cryptographic exploitation against a custom Docker management platform (Arcane) built on a modern Go and SvelteKit stack.
      </p>

      <div className="project-section mb-4">
        <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Tech Stack & Recon</h4>
        <ul className="list-disc pl-5">
          <li><strong>Reconnaissance:</strong> Nmap (Full Port Fuzzing), OSINT, Git Commit Analysis</li>
          <li><strong>Web Exploitation:</strong> Burp Suite, Browser DevTools (SPA Chunk Analysis)</li>
          <li><strong>Target Architecture:</strong> Golang Backend, SvelteKit Frontend, Docker/GitOps</li>
          <li><strong>Vulnerabilities:</strong> JWT Cryptographic Forgery, API Security, Dev Secrets</li>
        </ul>
      </div>

      <div className="project-section mb-4">
        <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Attack Path Highlights</h4>
        <ul className="list-disc pl-5">
          <li><strong>Single Page Application (SPA) Recon:</strong> Deconstructed SvelteKit JavaScript chunks via browser Developer Tools to map hidden frontend routing and unauthenticated API endpoints.</li>
          <li><strong>White Box Source Code Review:</strong> Transitioned from Black Box testing to White Box auditing by locating the application's source code repository and analyzing backend Go logic.</li>
          <li><strong>Cryptographic Token Forgery:</strong> Discovered hardcoded development secrets (`JWT_SECRET`) deployed to production. Reverse-engineered the Go backend to forge an administrative JSON Web Token (JWT) and bypass authentication.</li>
        </ul>
      </div>

      <p className="project-concepts mb-6 text-sm text-gray-300">
        <strong>Concepts Mastered:</strong> White Box Penetration Testing, Secure Code Auditing, JWT Cryptographic Forgery, Container (Docker) Attack Surfaces, and SPA Vulnerability Analysis.
      </p>

      {/* CALL TO ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 mt-auto">
        <button 
          onClick={() => window.open("https://github.com/Goldyeti2006/My-CTF-Journey", "_blank")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
          className="px-5 py-2.5 
          bg-gray-800 
          border border-gray-600
           hover:bg-gray-700 
           text-white rounded-lg 
           transition-colors 
           font-semibold 
           flex items-center 
           gap-2
           hover:!translate-x-1 
           hover:!-translate-y-2 
           hover:!scale-[1.02] 
           hover:!shadow-lg 
           hover:!shadow-[#10b981]/20" /* Swapped to Emerald Green shadow */
        >
        Read Write-up
        </button>
      </div>
    </div>

    {/* RIGHT SIDE: MEDIA / VIDEO */}
    <div className="w-full lg:w-1/2 my-4">
      {/* Glassmorphism border for the visual catch */}
      <div className="bg-white/5 border border-white/10 p-2 rounded-xl shadow-2xl">
        <img src="/CTF.png" className="rounded-lg object-cover"></img>
      </div>
    </div>
    
  </div>
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