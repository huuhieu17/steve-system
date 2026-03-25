"use client"

import {
  BookOpen,
  Computer,
  Facebook,
  Film,
  Gamepad2,
  Github,
  HardDrive,
  ImagesIcon as Photos,
  Settings,
  Send
} from "lucide-react"
import { useState } from "react"
import IOSDock from "./IOSDock"
import IOSStatusBar from "./IOSStatusBar"

interface IOSHomeScreenProps {
  onOpenApp: (appId: string) => void
}

export default function IOSHomeScreen({ onOpenApp }: IOSHomeScreenProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const apps = [
    [
      // // Page 1
      // { id: "phone", name: "Phone", icon: Phone, color: "bg-green-500" },
      // { id: "messages", name: "Messages", icon: MessageSquare, color: "bg-green-400" },
      // { id: "mail", name: "Mail", icon: Mail, color: "bg-blue-500" },
      { id: "photos", name: "Thư viện ảnh", icon: Photos, color: "bg-gradient-to-br from-red-400 to-pink-500" },
      { id: "movies", name: "Xem phim", icon: Film, color: "bg-gradient-to-br from-black-400 to-green-500" },
      { id: "comic", name: "Đọc truyện", icon: BookOpen, color: "bg-gradient-to-br from-yellow-400 to-red-500" },
      { id: "computer-control", name: "Điều khiển máy tính", icon: Computer, color: "bg-gradient-to-br from-purple-400 to-pink-500" },
      { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-500" },
      { id: "github", name: "Github", icon: Github, color: "bg-gray-800" },
      { id: "telegram", name: "Telegram", icon: Send, color: "bg-blue-400" },
      { id: "settings", name: "Cài đặt", icon: Settings, color: "bg-gray-500" },
      { id: "media_static_download", name: "Media Download", icon: HardDrive, color: "bg-gradient-to-br from-cyan-500 to-blue-600" },
      { id: "game2048", name: "2048 Game", icon: Gamepad2, color: "bg-gradient-to-br from-green-400 to-blue-600" },
      { id: "game-console", name: "Game Console", icon: Gamepad2, color: "bg-gradient-to-br from-purple-400 to-pink-500" },

    ],
  ]

  const dockApps = [
    // { id: "phone", name: "Phone", icon: Phone, color: "bg-green-500" },
    { id: "photos", name: "Thư viện ảnh", icon: Photos, color: "bg-gradient-to-br from-red-400 to-pink-500" },
    { id: "comic", name: "Đọc truyện", icon: BookOpen, color: "bg-gradient-to-br from-yellow-400 to-red-500" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-500" },
    { id: "github", name: "Github", icon: Github, color: "bg-gray-800" },
    { id: "telegram", name: "Telegram", icon: Send, color: "bg-blue-400" },
  ]

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden ios-safe-top ios-safe-bottom">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=400')] bg-cover bg-center opacity-30" />


      {/* Status Bar */}
      <IOSStatusBar />

      {/* App Grid */}
      <div className="pt-12 pb-24 px-6 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-6 h-full content-start">
          {apps[currentPage]?.map((app) => (
            <button key={app.id} className="flex flex-col items-center group z-10" onClick={() => {
              onOpenApp(app.id)
            }}>
              <div
                className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center shadow-ios group-active:scale-95 transition-transform ios-no-select`}
              >
                <app.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-xs mt-1 text-center font-medium drop-shadow-sm">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Page Indicators */}
        {apps.length > 1 && (
          <div className="absolute bottom-28 left-0 right-0 flex justify-center space-x-2">
            {apps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentPage === index ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dock */}
      <IOSDock apps={dockApps} onAppClick={onOpenApp} />
    </div>
  )
}
