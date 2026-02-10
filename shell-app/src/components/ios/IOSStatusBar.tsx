"use client"

import { Wifi } from "lucide-react"
import { useState, useEffect } from "react"

export default function IOSStatusBar() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-white text-sm font-semibold z-20">
      <div>{time}</div>
      <div className="flex items-center space-x-1">
        {/* Signal bars */}
        <div>
          <Wifi className="w-6 h-5" />
        </div>
        <div className="flex space-x-0.5 rotate-180">
          <div className="w-1 h-4 bg-white rounded-full" />
          <div className="w-1 h-3 bg-white rounded-full" />
          <div className="w-1 h-2 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
     
      </div>
    </div>
  )
}
