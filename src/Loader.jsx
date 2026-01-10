import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50 fov-24">
      <div className="w-64 space-y-2">
        {/* Progress Bar Container */}
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          {/* Moving Bar */}
          <div 
            className="h-full bg-blue-500 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Text Percentage */}
        <p className="text-center text-sm font-medium text-gray-400">
          {progress.toFixed(0)}% loaded
        </p>
      </div>
    </div>
  )
}