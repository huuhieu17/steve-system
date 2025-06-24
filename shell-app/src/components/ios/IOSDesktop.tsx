"use client"

import { useState } from "react"
import IOSHomeScreen from "./IOSHomeScreen"
import IOSSettingsApp from "./apps/IOSSettingsApp"
import IOSNotesApp from "./apps/IOSNotesApp"
import IOSCalculatorApp from "./apps/IOSCalculatorApp"

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
      default:
        return (
          <div className="h-screen w-full bg-white flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-2">{currentApp?.charAt(0).toUpperCase() + currentApp?.slice(1)}</h2>
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
