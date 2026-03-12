import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. THE 3D SCENE (Where your math goes) ---
function ESP32Scene({ scrollProgress }) {
  // Load YOUR specific model
  const { scene } = useGLTF('/model1.glb');
  const modelRef = useRef();
  
  // Get access to the R3F camera
  const { camera } = useThree();

  // Set your initial camera position exactly once when the component loads
  useLayoutEffect(() => {
    camera.position.set(2.39086, 0.257327, 15.7938);
    camera.rotation.set(3.14/2, 0, 3.13);
  }, [camera]);

  // The Render Loop (Replaces your requestAnimationFrame)
  useFrame(() => {
    const p = scrollProgress.current; // Value from 0.0 to 1.0 based on scroll

    if (modelRef.current) {
      // --- A. CAMERA MOVEMENT ---
      // Interpolate from your start X to your end X
      camera.position.x = gsap.utils.interpolate(2.39086, 0.39086, p);
      // Interpolate from your start Z to your end Z
      camera.position.z = gsap.utils.interpolate(15.7938, 10.7938, p);
      
      // MAGIC TRICK: Keep camera pointed at model
      camera.lookAt(modelRef.current.position);

      // --- B. MODEL ROTATION ---
      // X rotates to 90 degrees (Math.PI / 2)
      modelRef.current.rotation.x = gsap.utils.interpolate(0, Math.PI / 2, p);
      // Y spins a full 360 degrees (2 * Math.PI)
      modelRef.current.rotation.y = gsap.utils.interpolate(0, 2 * Math.PI, p);
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}


// --- 2. THE MAIN SECTION (HTML + Scroll Logic) ---
export default function ESP32ProjectSection() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const scrollProgress = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: '200px' } // Start loading 200px before it's visible
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  let ctx; // Declare ctx outside so cleanup can reach it

  const timer = setTimeout(() => {
    // Guard: if refs aren't ready yet, bail out
    if (!sectionRef.current || !textContainerRef.current) return;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=125%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        }
      });
      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        0.5
      );
    }, sectionRef);

    ScrollTrigger.refresh(); // Outside ctx, runs after registration
  }, 300);

  // Proper cleanup: cancel the timer AND revert GSAP
  return () => {
    clearTimeout(timer);
    ctx?.revert();
  };
}, []);
  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-[#121212] overflow-hidden">
      
      {/* THE 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas  gl={{ alpha: true,
            powerPreference: "high-performance",
            antialias: false
         }} 
          frameloop="always" 
          onCreated={({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault(); // Allows context to be restored
    });
          }}
          >
          {/* Matches your Ambient Light setup */}
          <ambientLight intensity={1.0} color={0x404040} />
          <Environment preset="city" /> 
          
          <ESP32Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* THE HTML TEXT OVERLAY */}
      <div 
        ref={textContainerRef}
        className="absolute inset-0 z-10 flex flex-col justify-center items-start p-10 md:p-20 pointer-events-none opacity-0"
      >
        <div className="max-w-xl bg-black/50 p-8 rounded-xl backdrop-blur-md border border-white/10 text-white">
         <h3 className="text-2xl font-bold mb-2">Twiny: BLE-Controlled Rogue AP</h3>
         
         <p className="project-pitch mb-4">
           <strong>Hybrid Hardware & Mobile Security Tool</strong><br />
           A custom Flutter app and ESP32 firmware combo that demonstrates "Evil Twin" Wi-Fi attacks using a stealthy Bluetooth Command & Control (C2) channel.
         </p>

         <div className="project-section mb-4">
           <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Tech Stack</h4>
           <ul className="list-disc pl-5">
             <li><strong>Frontend:</strong> Flutter (Dart), flutter_blue_plus</li>
             <li><strong>Hardware:</strong> ESP32 (C++), Async Web Server, DNS Server</li>
             <li><strong>Protocols:</strong> BLE (GATT), 802.11 AP, HTTP/DNS Spoofing</li>
           </ul>
         </div>

         <div className="project-section mb-4">
           <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Key Features</h4>
           <ul className="list-disc pl-5">
             <li><strong>Out-of-Band C2:</strong> Triggers the Wi-Fi attack over Bluetooth, keeping the network radio completely hidden from web scanners.</li>
             <li><strong>Captive Portal:</strong> Uses DNS spoofing to trap devices and force them to a localized, responsive login page.</li>
             <li><strong>Real-Time Exfiltration:</strong> Captures credentials and streams them instantly to the mobile app via BLE notifications.</li>
           </ul>
         </div>

         <p className="project-concepts mb-4 text-sm text-gray-300">
           <strong>Concepts Mastered:</strong> Man-in-the-Middle (MITM) mechanics, Mobile-to-Hardware integration, and Wireless Authentication vulnerabilities.
         </p>

         <p className="project-disclaimer text-xs text-gray-500 italic mt-6 border-t border-gray-700 pt-2">
           Disclaimer: Developed strictly for educational purposes and ethical security research in isolated environments.
         </p>
        </div>
      </div>

    </section>
  );
}
useGLTF.preload('/model1.glb');