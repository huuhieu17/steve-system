"use client"

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
        <div className="flex space-x-0.5">
          <div className="w-1 h-2 bg-white rounded-full" />
          <div className="w-1 h-3 bg-white rounded-full" />
          <div className="w-1 h-4 bg-white rounded-full" />
          <div className="w-1 h-4 bg-white rounded-full" />
        </div>
        {/* WiFi */}
        <div className="w-4 h-3 relative">
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full" />
          <div className="absolute bottom-0 left-1 w-1 h-2 bg-white rounded-full" />
          <div className="absolute bottom-0 left-2 w-1 h-3 bg-white rounded-full" />
        </div>
        {/* Battery */}
        <div className="w-6 h-3 border border-white rounded-sm relative">
          <div className="w-4 h-1.5 bg-white rounded-sm m-0.5" />
          <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm" />
        </div>
      </div>
    </div>
  )
}
