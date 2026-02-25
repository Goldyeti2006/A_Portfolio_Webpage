import React, { useRef, useLayoutEffect } from 'react';
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
      {/* We add your loaded model here */}
      <primitive object={scene} />
    </group>
  );
}


// --- 2. THE MAIN SECTION (HTML + Scroll Logic) ---
export default function ESP32ProjectSection() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const scrollProgress = useRef(0);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=300%", // Controls how long the user has to scroll to finish the animation
          pin: true,
          scrub: 1, // Matches your original scrub smoothness
          onUpdate: (self) => {
            // Send the scroll percentage (0 to 1) to the 3D scene
            scrollProgress.current = self.progress;
          },
        }
      });

      // Text fade-in animation
      tl.fromTo(textContainerRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        0.5
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-[#121212] overflow-hidden">
      
      {/* THE 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas>
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
        <div className="max-w-xl bg-black/50 p-8 rounded-xl backdrop-blur-md border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-4">
            ESP32 Architecture
          </h2>
          <p className="text-gray-300">
            This is where your project details appear as the board rotates into its final top-down view.
          </p>
        </div>
      </div>

    </section>
  );
}