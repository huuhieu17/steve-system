"use client"

import { useEffect, useState } from "react"
import { Apple } from "lucide-react"

export default function IOSSplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
      <Apple className="w-20 h-20 text-white mb-12" />
      <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
