"use client"

import { APP_CONFIGS, DOCK_APPS } from "@/constants/list-app"
import { useWindowManager } from "@/hooks/useWindowManager"
import { AppId } from "@/types/window"
import { useState } from "react"
import Dock from "./Dock"
import StatusBar from "./StatusBar"
import Window from "./Window"

interface DesktopProps {
}

export default function Desktop({ }: DesktopProps) {
  const windowManager = useWindowManager()

  const [desktopApps] = useState<any>([
    APP_CONFIGS.movies,
    APP_CONFIGS.photos,
    APP_CONFIGS.computer_control,
    APP_CONFIGS.comic,
    APP_CONFIGS.facebook,
    APP_CONFIGS.telegram,
    APP_CONFIGS.github,
    APP_CONFIGS.movie,
  ])

  const handleDockItemClick = (appId: string) => {
    
    windowManager.openWindow(appId)
  }

  const handleAddDockItem = () => {
    alert("Tính năng thêm ứng dụng vào Dock sẽ được phát triển sau!")
  }

  const handleOpenSettings = () => {
    windowManager.openWindow(AppId.SETTINGS)
  }

  // Convert dock apps to dock items format
  const dockItems = DOCK_APPS.map((appId) => {
    const config = APP_CONFIGS[appId]
    return {
      id: appId,
      name: config.name,
      icon: config.icon,
      color: config.color,
      isOpen: windowManager.isAppOpen(appId),
    }
  })

  
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />

      {/* Status Bar */}
      <StatusBar onOpenSettings={handleOpenSettings} />

      {/* Desktop Icons */}
      <div className="absolute top-10 left-4 space-y-6">
        {desktopApps.map((app: any) => (
          <div
            key={app.id}
            className="flex flex-col items-center w-20 group cursor-pointer"
            onClick={() => ( windowManager.openWindow(app.id))}
          >
            <div className="p-2 rounded-lg group-hover:bg-white/10">{app.icon}</div>
            <span className="text-xs text-white text-center mt-1 px-1 py-0.5 rounded group-hover:bg-blue-500">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windowManager.windows.map(
        (window) =>
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              initialPosition={window.position}
              initialSize={window.size}
              minSize={window.minSize}
              onClose={windowManager.closeWindow}
              onMinimize={windowManager.minimizeWindow}
              onFocus={windowManager.focusWindow}
              isFocused={window.isFocused}
            >
              {window.content}
            </Window>
          ),
      )}

      {/* Dock */}
      <Dock items={dockItems} onItemClick={handleDockItemClick} onAddItem={handleAddDockItem} />
    </div>
  )
}
