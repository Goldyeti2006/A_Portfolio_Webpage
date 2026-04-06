import React, { useState, useEffect, useRef } from 'react';

// --- SUB-COMPONENT: Live Scrolling Terminal Logs ---
const LiveTerminal = () => {
  const [logs, setLogs] = useState([]);
  
  const scriptLines = [
    "[INFO] Initiating network traffic analysis...",
    "[WARN] High latency detected on port 443.",
    "[ACTION] Routing traffic through WAF proxy...",
    "Analyzing packet headers for malformed payloads...",
    "[ALERT] TCP SYN flood signature detected.",
    "Source IP: 192.168.1.104 - Action: BLOCK",
    "Source IP: 45.33.32.156 - Action: BLOCK",
    "[OK] Traffic normalized. Resuming standard protocol.",
    "Awaiting new connections..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs(prevLogs => {
        const newLogs = [...prevLogs, scriptLines[currentIndex % scriptLines.length]];
        return newLogs.slice(-5); 
      });
      currentIndex++;
    }, 1200); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm text-emerald-500/80 mt-4">
      {logs.map((log, idx) => (
        <div key={idx} className="mb-1">{`> ${log}`}</div>
      ))}
      <div className="animate-pulse mt-1">{`> _`}</div>
    </div>
  );
};


// --- MAIN COMPONENT ---
// Notice we added { isXRayActive } right here:
export default function HeroReveal({ isXRayActive, mousePos }) {
  const containerRef = useRef(null);

  // This function decides if the hole punch exists or not
  const getMaskStyle = () => {
    if (!isXRayActive) return { maskImage: 'none', WebkitMaskImage: 'none' };

    return {
      WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 180px)`,
      maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 180px)`
    };
  };

  return (
    <div ref={containerRef} // 3. Attach the ref here
      className="relative w-full h-screen overflow-hidden cursor-crosshair bg-[#0a0a0a]"
    >
      {/* =========================================
          LAYER 1: THE SECURITY BACKEND (Dark) 
          ========================================= */}
      <div className="absolute inset-0 z-0 p-8">
        
        {/* PANEL A: Raw Page Source Code */}
        <div className="absolute top-10 right-10 opacity-20 font-mono text-[10px] md:text-xs text-gray-400 max-w-sm overflow-hidden select-none">
          <pre>{`
        import { useState, useEffect } from 'react';
        import gsap from 'gsap';

        export default function SecurityCore() {
          const interceptTraffic = (req, res) => {
            if (req.headers['x-forwarded-for']) {
              blockIP(req.ip);
              return res.status(403).send('Forbidden');
            }
          };
          
          // Initialize defense grid
          useEffect(() => {
            system.arm();
          }, []);
        }
          `}</pre>
        </div>
        <div className="absolute bottom-10 left-10 opacity-20 font-mono text-[10px] md:text-xs text-gray-400 max-w-sm overflow-hidden select-none">01010100 01101000 01100101 01110010 01100101 00100000 01100001 01110010 01100101 00100000 01101101 01110101 01101100 01110100 01101001 01110000 01101100 01100101 00100000 01100101 01100001 01110011 01110100 01100101 01110010 00100000 01100101 01100111 01100111 01110011 00100000 01100110 01101111 01110010 00100000 01110101 00100000 01100001 01101100 01101111 01101110 01100111 00100000 01110100 01101000 01100101 00100000 01110111 01100001 01111001</div>
        {/* PANEL B: Static Nmap Scan */}
        <div className="absolute top-1/3 left-10 md:left-32 font-mono text-emerald-400">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-2">root@goldyeti:~# nmap -sV -p- target.local</h2>
          <div className="text-sm md:text-base opacity-70">
            <p>Starting Nmap 7.93 ( https://nmap.org )</p>
            <p>Nmap scan report for target.local (10.0.0.5)</p>
            <p>Host is up (0.0020s latency).</p>
            <br />
            <p>PORT     STATE SERVICE VERSION</p>
            <p>22/tcp   open  ssh     OpenSSH 8.2p1</p>
            <p>80/tcp   open  http    nginx 1.18.0</p>
            <p>443/tcp  open  ssl/http nginx</p>
            <br />
            <p>Service detection performed. Please report any incorrect results.</p>
          </div>
        </div>

        {/* PANEL C: Live DDoS Monitor */}
        <div className="absolute bottom-10 right-10 md:right-32 w-full max-w-md bg-black/50 p-4 border border-emerald-500/30 rounded-md">
           <div className="text-emerald-500 font-bold border-b border-emerald-500/30 pb-2 mb-2">
             [ACTIVE] active_defense.sh
           </div>
           <LiveTerminal />
        </div>
      </div>

      {/* =========================================
          LAYER 2: THE DESIGN FRONTEND (Light) 
          ========================================= */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF3E1] text-slate-900 p-10 z-10 pointer-events-none transition-all duration-700"
        style={getMaskStyle()}
      >
       <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <span 
            className="text-[8px] md:text-[12px] tracking-widest uppercase font-mono text-gray-500"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'upright'
            }}
          >
            D I S C I P L I N E
          </span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <span 
            className="text-[8px] md:text-[12px] tracking-widest uppercase font-mono text-gray-500"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'upright'
            }}
          >
            O B S E S S I O N
          </span>
        </div>
         <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 text-center">
            Securely Designed <br/><p className='text-[#FF3831] text-4xl md:text-6xl'> & </p> Creatively Hardened.
         </h1>
         <p className="text-xl md:text-2xl font-light text-center max-w-2xl text-gray-600">
            Clean interfaces masking impenetrable architecture.
         </p>
         
         {/* Only show the hint if the X-Ray is actually on */}
         {isXRayActive && (
             <p className="absolute bottom-10 text-sm font-semibold tracking-widest uppercase text-gray-400 animate-pulse">
                Click the top rune logo to disable X-Ray
             </p>
         )}
      </div>

    </div>
  );
}