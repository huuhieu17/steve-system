"use client"

import { AppId } from "@/types/window"
import { useState } from "react"
import Icon from "../Icon"
import IOSDock from "./IOSDock"
import { useSystem } from "@/contexts/user-context"

interface IOSHomeScreenProps {
  onOpenApp: (appId: string) => void
}

export default function IOSHomeScreen({ onOpenApp }: IOSHomeScreenProps) {
  const { systemConfig } = useSystem()
  const [currentPage, setCurrentPage] = useState(0)

  const apps = [
    [
      // // Page 1
      // { id: "phone", name: "Phone", icon: Phone, color: "bg-green-500" },
      // { id: "messages", name: "Messages", icon: MessageSquare, color: "bg-green-400" },
      // { id: "mail", name: "Mail", icon: Mail, color: "bg-blue-500" },
      { id: AppId.PHOTOS, name: "Thư viện ảnh", icon: AppId.PHOTOS, color: "bg-gradient-to-br from-red-400 to-pink-500" },
      { id: AppId.MOVIES, name: "Xem phim", icon: AppId.MOVIES, color: "bg-gradient-to-br from-black-400 to-green-500" },
      { id: AppId.COMIC, name: "Đọc truyện", icon: AppId.COMIC, color: "bg-gradient-to-br from-yellow-400 to-red-500" },
      { id: AppId.LOCKET, name: "Locket", icon: AppId.LOCKET, color: "bg-gradient-to-br from-red-400 to-yellow-500" },
      { id: AppId.COMPUTER_CONTROL, name: "Điều khiển máy tính", icon: AppId.COMPUTER_CONTROL, color: "bg-gradient-to-br from-purple-400 to-pink-500" },
      { id: AppId.MEDIA_STATIC_DOWNLOAD, name: "Media Download", icon: AppId.MEDIA_STATIC_DOWNLOAD, color: "bg-gradient-to-br from-cyan-500 to-blue-600" },
      { id: AppId.GAME2048, name: "2048 Game", icon: AppId.GAME_CONSOLE, color: "bg-gradient-to-br from-green-400 to-blue-600" },
      { id: AppId.GAME_CONSOLE, name: "Game Console", icon: AppId.GAME_CONSOLE, color: "bg-gradient-to-br from-purple-400 to-pink-500" },
      
    ],
  ]

  const dockApps = [
    // { id: "phone", name: "Phone", icon: Phone, color: "bg-green-500" },
    { id: AppId.FACEBOOK, name: "Facebook", icon: AppId.FACEBOOK, color: "bg-blue-500" },
    { id: AppId.GITHUB, name: "Github", icon: AppId.GITHUB, color: "bg-gray-800" },
    { id: AppId.TELEGRAM, name: "Telegram", icon: AppId.TELEGRAM, color: "bg-blue-400" },
    { id: AppId.SETTINGS, name: "Cài đặt", icon: AppId.SETTINGS, color: "bg-gray-500" },
  ]

  return (
    <div 
      style={systemConfig && systemConfig.appearance.backgroundMobileUrl ? {
        backgroundImage: `url("${systemConfig.appearance.backgroundMobileUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      } : undefined}
      className="h-screen w-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden ios-safe-top ios-safe-bottom">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=400')] bg-cover bg-center opacity-30" />

      {/* App Grid */}
      <div className="pt-12 pb-24 px-6 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-6 h-full content-start">
          {apps[currentPage]?.map((app) => (
            <button key={app.id} className="flex flex-col items-center group z-10" onClick={() => {
              onOpenApp(app.id)
            }}>
                <Icon name={app.icon} size={28} className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-ios group-active:scale-95 transition-transform ios-no-select" />
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
