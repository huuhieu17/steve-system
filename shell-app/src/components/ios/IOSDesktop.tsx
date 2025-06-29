"use client"

import { useState } from "react"
import DynamicWebApp from "../apps/DynamicWebApp"
import IOSHomeScreen from "./IOSHomeScreen"
import IOSCalculatorApp from "./apps/IOSCalculatorApp"
import IOSFinderApp from "./apps/IOSFinderApp"
import IOSMailApp from "./apps/IOSMailApp"
import IOSNotesApp from "./apps/IOSNotesApp"
import IOSSafariApp from "./apps/IOSSafariApp"
import IOSSettingsApp from "./apps/IOSSettingsApp"

export default function IOSDesktop() {
  const [currentApp, setCurrentApp] = useState<string | null>(null)

  const openApp = (appId: string) => {
    setCurrentApp(appId)
  }

  const closeApp = () => {
    setCurrentApp(null)
  }

  const renderApp = () => {
    switch (currentApp) {
      case "settings":
        return <IOSSettingsApp onClose={closeApp} />
      case "notes":
        return <IOSNotesApp onClose={closeApp} />
      case "calculator":
        return <IOSCalculatorApp onClose={closeApp} />
      case "files":
        return <IOSFinderApp onClose={closeApp} />
      case "photos":
        // return <IOSPhotosApp onClose={closeApp} />
        return <DynamicWebApp app={{
          id: 'photos',
          url: 'https://gallery.imsteve.dev',
          name: 'Xem Ảnh',
          type: "iframe",
          icon: 'film',
          color: "bg-blue-500",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "movies":
        // return <IOSPhotosApp onClose={closeApp} />
        return <DynamicWebApp app={{
          id: 'movies',
          url: 'https://movie.imsteve.dev',
          name: 'Xem Phim',
          type: "iframe",
          icon: 'film',
          color: "bg-blue-500",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "mail":
        return <IOSMailApp onClose={closeApp} />
      case "safari":
        return <IOSSafariApp onClose={closeApp} />
      default:
        return (
          <div className="h-screen w-full bg-white flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-2">{currentApp && currentApp?.charAt(0).toUpperCase() + currentApp?.slice(1)}</h2>
              <p className="text-gray-600 mb-4">Ứng dụng này đang được phát triển.</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={closeApp}>
                Quay lại
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      {currentApp ? renderApp() : <IOSHomeScreen onOpenApp={openApp} />}
    </div>
  )
}
