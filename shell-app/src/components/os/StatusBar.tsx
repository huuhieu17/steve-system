"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Volume2, Bell } from "lucide-react"

interface StatusBarProps {
  username: string
  onOpenSettings: () => void
}

export default function StatusBar({ username, onOpenSettings }: StatusBarProps) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  )
  const [date, setDate] = useState(
    new Date().toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    }),
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
      setDate(
        now.toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
        }),
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium z-50">
      <div className="flex items-center space-x-4">
        <div className="font-bold">🍎</div>
        <span>Finder</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            className="flex items-center space-x-1 hover:bg-white/10 rounded px-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Bell className="w-3.5 h-3.5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-6 w-72 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-3 text-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Thông báo</h3>
                <button className="text-xs text-blue-400">Xóa tất cả</button>
              </div>
              <div className="space-y-2">
                <div className="p-2 hover:bg-white/5 rounded">
                  <div className="font-medium">Cập nhật hệ thống</div>
                  <div className="text-xs text-gray-400">Có bản cập nhật mới cho macOS</div>
                </div>
                <div className="p-2 hover:bg-white/5 rounded">
                  <div className="font-medium">Lời nhắc</div>
                  <div className="text-xs text-gray-400">Cuộc họp lúc 15:00</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={onOpenSettings}>
          <Wifi className="w-4 h-4" />
        </button>
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span>{date}</span>
        <span>{time}</span>
        <div
          className="flex items-center space-x-1 hover:bg-white/10 rounded px-1 cursor-pointer"
          onClick={onOpenSettings}
        >
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px]">
            {username.charAt(0).toUpperCase()}
          </div>
          <span>{username}</span>
        </div>
      </div>
    </div>
  )
}
