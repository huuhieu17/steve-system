"use client"

import { useState, useEffect } from "react"
import { ChevronUp, Camera, Flashlight } from "lucide-react"

interface IOSLockScreenProps {
  onUnlock: () => void
}

export default function IOSLockScreen({ onUnlock }: IOSLockScreenProps) {
  const [time, setTime] = useState(new Date())
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSlideUp = () => {
    setIsSliding(true)
    setTimeout(() => {
      onUnlock()
    }, 300)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />

      {/* Status Bar */}
      <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-white text-sm font-medium z-20">
        <div>{time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1.5 bg-white rounded-sm m-0.5" />
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="absolute top-1/4 left-0 right-0 text-center text-white">
        <div className="text-6xl font-light mb-2">
          {time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-lg font-medium">
          {time.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="absolute bottom-32 left-6 right-6 flex justify-between">
        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Flashlight className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide to Unlock */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
        <div className="text-white text-sm mb-4">Vuốt lên để mở khóa</div>
        <button
          className={`w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-300 ${
            isSliding ? "transform translate-y-[-100px] opacity-0" : ""
          }`}
          onClick={handleSlideUp}
        >
          <ChevronUp className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  )
}
