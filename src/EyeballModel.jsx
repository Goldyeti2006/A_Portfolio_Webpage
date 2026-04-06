// In EyeballModel.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function EyeballModel() {
  const modelRef = useRef()
  const { scene } = useGLTF('/eye.glb')
  
  const startTime = useRef(Date.now())

useFrame(() => {
  const elapsed = (Date.now() - startTime.current) / 1000 // seconds
  
  if (elapsed < 3) {
    // First 3 seconds: rotate right
    modelRef.current.rotation.z += 0.005
  } else if (elapsed < 6) {
    // Next 3 seconds: rotate left
    modelRef.current.rotation.z -= 0.005
    modelRef.current.rotation.y -= 0.002 // slight up-down for more life
  } else {
    // After 6 seconds: idle float
    const time = Date.now() * 0.002
    modelRef.current.position.y = Math.sin(time) * 0.05
  }

  if (elapsed >= 12) {
     modelRef.current.rotation.y += 0.002
  }
  if (elapsed >= 15) {
     modelRef.current.rotation.y -= 0.002
  }
  if (elapsed >= 18) {
     modelRef.current.rotation.y -= 0.002
  }
  if (elapsed >= 21) {
     modelRef.current.rotation.y += 0.002
  }
})
  
  return <primitive ref={modelRef} object={scene} scale={1.5} />
}