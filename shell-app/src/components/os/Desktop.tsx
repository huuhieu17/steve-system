"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Folder, FileText, Settings, Mail, MessageSquare, Terminal, Globe, Coffee, FileCode } from "lucide-react"
import StatusBar from "./StatusBar"
import Dock from "./Dock"
import Window from "./Window"
import SettingsApp from "../apps/SettingsApp"
import FinderApp from "../apps/FinderApp"
import NotesApp from "../apps/NotesApp"
import CalculatorApp from "../apps/CalculatorApp"
import type { DynamicApp } from "../apps/DynamicAppManager"
import DynamicWebApp from "../apps/DynamicWebApp"
import SafariAppOptimized from "../apps/SafariApp"

interface DesktopProps {
  username: string
  onLogout: () => void
}

export default function Desktop({ username, onLogout }: DesktopProps) {
  const [windows, setWindows] = useState<
    {
      id: string
      app: string
      title: string
      icon: React.ReactNode
      content: React.ReactNode
      isMinimized: boolean
    }[]
  >([])

  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null)
  const [dockItems, setDockItems] = useState([
    { id: "finder", name: "Finder", icon: <Folder className="w-6 h-6 text-white" />, color: "bg-blue-500" },
    { id: "mail", name: "Mail", icon: <Mail className="w-6 h-6 text-white" />, color: "bg-blue-600" },
    {
      id: "safari",
      name: "Safari",
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    { id: "messages", name: "Messages", icon: <MessageSquare className="w-6 h-6 text-white" />, color: "bg-green-500" },
    { id: "notes", name: "Notes", icon: <FileText className="w-6 h-6 text-white" />, color: "bg-yellow-500" },
    { id: "calculator", name: "Calculator", icon: <Coffee className="w-6 h-6 text-white" />, color: "bg-gray-600" },
    { id: "terminal", name: "Terminal", icon: <Terminal className="w-6 h-6 text-white" />, color: "bg-black" },
    {
      id: "settings",
      name: "System Preferences",
      icon: <Settings className="w-6 h-6 text-white" />,
      color: "bg-gray-500",
    },
  ])

  const [desktopIcons] = useState([
    { id: "documents", name: "Documents", icon: <Folder className="w-10 h-10 text-blue-500" /> },
    { id: "downloads", name: "Downloads", icon: <Folder className="w-10 h-10 text-blue-500" /> },
    { id: "applications", name: "Applications", icon: <Folder className="w-10 h-10 text-blue-500" /> },
    { id: "project", name: "My Project", icon: <FileCode className="w-10 h-10 text-blue-600" /> },
  ])

  const [dynamicApps, setDynamicApps] = useState<DynamicApp[]>([])

  const handleAddDynamicApp = (app: DynamicApp) => {
    setDynamicApps([...dynamicApps, app])

    // Thêm vào dock
    const newDockItem = {
      id: app.id,
      name: app.name,
      icon: <span className="text-lg">{app.icon}</span>,
      color: app.color,
    }
    setDockItems([...dockItems, newDockItem])
  }

  const handleUpdateDynamicApp = (id: string, updatedApp: DynamicApp) => {
    setDynamicApps(dynamicApps.map((app) => (app.id === id ? updatedApp : app)))

    // Cập nhật dock item
    setDockItems(
      dockItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name: updatedApp.name,
              icon: <span className="text-lg">{updatedApp.icon}</span>,
              color: updatedApp.color,
            }
          : item,
      ),
    )
  }

  const handleDeleteDynamicApp = (id: string) => {
    setDynamicApps(dynamicApps.filter((app) => app.id !== id))
    setDockItems(dockItems.filter((item) => item.id !== id))

    // Đóng window nếu đang mở
    setWindows(windows.filter((w) => w.id !== id))
  }

  const openWindow = (appId: string) => {
    // Check if it's a dynamic app
    const dynamicApp = dynamicApps.find((app) => app.id === appId)
    if (dynamicApp) {
      const existingWindowIndex = windows.findIndex((w) => w.app === appId && w.isMinimized)

      if (existingWindowIndex !== -1) {
        const updatedWindows = [...windows]
        updatedWindows[existingWindowIndex].isMinimized = false
        setWindows(updatedWindows)
        setFocusedWindowId(updatedWindows[existingWindowIndex].id)
        return
      }

      const openWindow = windows.find((w) => w.app === appId && !w.isMinimized)
      if (openWindow) {
        setFocusedWindowId(openWindow.id)
        return
      }

      const windowId = `${appId}-${Date.now()}`
      const newWindow = {
        id: windowId,
        app: appId,
        title: dynamicApp.name,
        icon: <span className="text-sm">{dynamicApp.icon}</span>,
        content: <DynamicWebApp app={dynamicApp} onClose={() => closeWindow(windowId)} />,
        isMinimized: false,
      }

      setWindows([...windows, newWindow])
      setFocusedWindowId(windowId)
      return
    }

    // Check if window is already open but minimized
    const existingWindowIndex = windows.findIndex((w) => w.app === appId && w.isMinimized)

    if (existingWindowIndex !== -1) {
      // Restore the minimized window
      const updatedWindows = [...windows]
      updatedWindows[existingWindowIndex].isMinimized = false
      setWindows(updatedWindows)
      setFocusedWindowId(updatedWindows[existingWindowIndex].id)
      return
    }

    // Check if window is already open
    const openWindow = windows.find((w) => w.app === appId && !w.isMinimized)
    if (openWindow) {
      setFocusedWindowId(openWindow.id)
      return
    }

    // Create a new window
    const windowId = `${appId}-${Date.now()}`
    let newWindow

    switch (appId) {
      case "finder":
        newWindow = {
          id: windowId,
          app: appId,
          title: "Finder",
          icon: <Folder className="w-4 h-4" />,
          content: <FinderApp username={username} />,
          isMinimized: false,
        }
        break
      case "settings":
        newWindow = {
          id: windowId,
          app: appId,
          title: "System Preferences",
          icon: <Settings className="w-4 h-4" />,
          content: (
            <SettingsApp
              username={username}
              onLogout={onLogout}
              dynamicApps={dynamicApps}
              onAddApp={handleAddDynamicApp}
              onUpdateApp={handleUpdateDynamicApp}
              onDeleteApp={handleDeleteDynamicApp}
            />
          ),
          isMinimized: false,
        }
        break
      case "notes":
        newWindow = {
          id: windowId,
          app: appId,
          title: "Notes",
          icon: <FileText className="w-4 h-4" />,
          content: <NotesApp />,
          isMinimized: false,
        }
        break
      case "calculator":
        newWindow = {
          id: windowId,
          app: appId,
          title: "Calculator",
          icon: <Coffee className="w-4 h-4" />,
          content: <CalculatorApp />,
          isMinimized: false,
        }
        break
      case "safari":
        newWindow = {
          id: windowId,
          app: appId,
          title: "Safari",
          icon: <Globe className="w-4 h-4" />,
          content: <SafariAppOptimized onClose={() => closeWindow(windowId)} />,
          isMinimized: false,
        }
        break
      default:
        newWindow = {
          id: windowId,
          app: appId,
          title: appId.charAt(0).toUpperCase() + appId.slice(1),
          icon: <Globe className="w-4 h-4" />,
          content: (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-xl font-bold mb-2">Ứng dụng {appId.charAt(0).toUpperCase() + appId.slice(1)}</h2>
                <p className="text-gray-600">Ứng dụng này đang được phát triển.</p>
              </div>
            </div>
          ),
          isMinimized: false,
        }
    }

    setWindows([...windows, newWindow])
    setFocusedWindowId(windowId)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id))
    if (focusedWindowId === id) {
      const remainingWindows = windows.filter((w) => w.id !== id && !w.isMinimized)
      setFocusedWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))

    const visibleWindows = windows.filter((w) => w.id !== id && !w.isMinimized)
    setFocusedWindowId(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null)
  }

  const focusWindow = (id: string) => {
    setFocusedWindowId(id)
  }

  const handleDockItemClick = (id: string) => {
    openWindow(id)
  }

  const handleAddDockItem = () => {
    // In a real app, this would open a dialog to select an app
    alert("Tính năng thêm ứng dụng vào Dock sẽ được phát triển sau!")
  }

  const handleOpenSettings = () => {
    openWindow("settings")
  }

  // Update dock items to show which apps are open
  useEffect(() => {
    setDockItems((prev) =>
      prev.map((item) => ({
        ...item,
        isOpen: windows.some((w) => w.app === item.id && !w.isMinimized),
      })),
    )
  }, [windows])

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />

      {/* Status Bar */}
      <StatusBar username={username} onOpenSettings={handleOpenSettings} />

      {/* Desktop Icons */}
      <div className="absolute top-10 left-4 space-y-6">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center w-20 group cursor-pointer"
            onDoubleClick={() => (icon.id === "applications" ? openWindow("finder") : null)}
          >
            <div className="p-2 rounded-lg group-hover:bg-white/10">{icon.icon}</div>
            <span className="text-xs text-white text-center mt-1 px-1 py-0.5 rounded group-hover:bg-blue-500">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map(
        (window) =>
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              icon={window.icon}
              initialPosition={{ x: 100 + windows.indexOf(window) * 30, y: 50 + windows.indexOf(window) * 30 }}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              isFocused={focusedWindowId === window.id}
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
