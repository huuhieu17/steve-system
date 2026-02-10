"use client"

import { useWindowManager } from "@/hooks/useWindowManager"
import DynamicWebApp from "../apps/DynamicWebApp"
import IOSHomeScreen from "./IOSHomeScreen"
import IOSCalculatorApp from "./apps/IOSCalculatorApp"
import IOSFinderApp from "./apps/IOSFinderApp"
import IOSMailApp from "./apps/IOSMailApp"
import IOSNotesApp from "./apps/IOSNotesApp"
import IOSSafariApp from "./apps/IOSSafariApp"
import IOSSettingsApp from "./apps/IOSSettingsApp"
import IOSComputerControlApp from "./apps/IOSComputerControlApp"
import IOSMovieApp from "./apps/IOSMovieApp"

export default function IOSDesktop() {
  const { currentIOSApp, setCurrentIOSApp } = useWindowManager();
  
  const openApp = (appId: string) => {
    setCurrentIOSApp(appId)
  }

  const closeApp = () => {
    setCurrentIOSApp(null)
  }

  const renderApp = () => {
    switch (currentIOSApp) {
      case "settings":
        return <IOSSettingsApp onClose={closeApp} />
      case "computer-control":
        return <IOSComputerControlApp onClose={closeApp} />
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
      case "comic":
        return <DynamicWebApp app={{
          id: 'comic',
          url: 'https://comic.imsteve.dev',
          name: 'Đọc Truyện',
          type: "iframe",
          icon: 'book-open',
          color: "bg-gradient-to-br from-yellow-400 to-red-500",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "facebook":
        return <DynamicWebApp app={{
          id: 'facebook',
          url: 'https://facebook.com/huuhieu2001',
          name: 'Facebook',
          type: "link",
          icon: 'facebook',
          color: "bg-blue-600",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "github":
        return <DynamicWebApp app={{
          id: 'github',
          url: 'https://github.com/huuhieu17',
          name: 'GitHub',
          type: "link",
          icon: 'github',
          color: "bg-gray-800",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "telegram":
        return <DynamicWebApp app={{
          id: 'telegram',
          url: 'https://t.me/huuhieu17',
          name: 'Telegram',
          type: "link",
          icon: 'telegram',
          color: "bg-blue-500",
          allowFullscreen: true,
        }} onClose={closeApp} />
      case "movie":
        return <IOSMovieApp onClose={closeApp} />
      default:
        return (
          <div className="h-screen w-full bg-white flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-2">{currentIOSApp && currentIOSApp?.charAt(0).toUpperCase() + currentIOSApp?.slice(1)}</h2>
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
      {currentIOSApp && currentIOSApp !== null ? renderApp() : <IOSHomeScreen onOpenApp={openApp} />}
    </div>
  )
}
