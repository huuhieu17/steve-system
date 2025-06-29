"use client"

import {
  Calculator,
  Files,
  Film,
  Globe,
  StickyNoteIcon as Notes,
  ImagesIcon as Photos,
  Settings
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
      { id: "photos", name: "Thư viện ảnh", icon: Photos, color: "bg-gradient-to-br from-yellow-400 to-orange-500" },
      { id: "movies", name: "Xem phim", icon: Film, color: "bg-gradient-to-br from-black-400 to-red-500" },
      { id: "safari", name: "Safari", icon: Globe, color: "bg-blue-400" },
      // { id: "music", name: "Music", icon: Music, color: "bg-red-500" },
      // { id: "camera", name: "Camera", icon: Camera, color: "bg-gray-600" },
     
      // { id: "clock", name: "Clock", icon: Clock, color: "bg-black" },
      // { id: "weather", name: "Weather", icon: Weather, color: "bg-blue-600" },
      // { id: "maps", name: "Maps", icon: Maps, color: "bg-green-600" },
      // { id: "calendar", name: "Calendar", icon: Calendar, color: "bg-red-600" },
      { id: "notes", name: "Notes", icon: Notes, color: "bg-yellow-400" },
      // { id: "contacts", name: "Contacts", icon: Contacts, color: "bg-gray-500" },
      { id: "calculator", name: "Calculator", icon: Calculator, color: "bg-gray-800" },
      { id: "settings", name: "Settings", icon: Settings, color: "bg-gray-600" },
      { id: "files", name: "Files", icon: Files, color: "bg-blue-500" },
    ],
  ]

  const dockApps = [
    // { id: "phone", name: "Phone", icon: Phone, color: "bg-green-500" },
    { id: "photos", name: "Photos", icon: Photos, color: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { id: "safari", name: "Safari", icon: Globe, color: "bg-blue-400" },
    { id: "notes", name: "Notes", icon: Notes, color: "bg-yellow-400" },
    { id: "calculator", name: "Calculator", icon: Calculator, color: "bg-gray-800" },
    { id: "settings", name: "Settings", icon: Settings, color: "bg-gray-600" },
    // { id: "messages", name: "Messages", icon: MessageSquare, color: "bg-green-400" },
    // { id: "music", name: "Music", icon: Music, color: "bg-red-500" },
  ]

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden ios-safe-top ios-safe-bottom">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=400')] bg-cover bg-center opacity-30" />

      {/* Dynamic Island */}
      {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" /> */}

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
