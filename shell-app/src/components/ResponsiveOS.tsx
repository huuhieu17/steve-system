"use client"

import { useState } from "react"
import { useDeviceType } from "@/hooks/useDeviceType"

// macOS Components
import SplashScreen from "./os/SplashScreen"
import LoginScreen from "./os/LoginScreen"
import Desktop from "./os/Desktop"

// iOS Components
import IOSSplashScreen from "./ios/IOSSplashScreen"
import IOSLockScreen from "./ios/IOSLockScreen"
import IOSDesktop from "./ios/IOSDesktop"

export default function ResponsiveOS() {
  const deviceType = useDeviceType()
  const [bootState, setBootState] = useState<"splash" | "login" | "desktop">("splash")
  const [username, setUsername] = useState("")

  // Default users with Guest account
  const [users] = useState([
    { id: "guest", name: "Guest", avatar: "", password: "" },
    { id: "user1", name: "Marcos", avatar: "", password: "password" },
    { id: "user2", name: "Admin", avatar: "", password: "admin123" },
  ])

  const handleSplashComplete = () => {
    setBootState("login")
  }

  const handleLogin = (username: string) => {
    setUsername(username)
    setBootState("desktop")
  }

  const handleLogout = () => {
    setBootState("login")
    setUsername("")
  }

  // Render iOS interface for mobile
  if (deviceType === "mobile") {
    return (
      <main className="h-screen w-full overflow-hidden">
        {bootState === "splash" && <IOSSplashScreen onComplete={handleSplashComplete} />}
        {bootState === "login" && <IOSLockScreen onUnlock={() => handleLogin("Guest")} />}
        {bootState === "desktop" && <IOSDesktop />}
      </main>
    )
  }

  // Render macOS interface for desktop
  return (
    <main className="h-screen w-full overflow-hidden">
      {bootState === "splash" && <SplashScreen onComplete={handleSplashComplete} />}
      {bootState === "login" && <LoginScreen onLogin={handleLogin} users={users} />}
      {bootState === "desktop" && <Desktop username={username} onLogout={handleLogout} />}
    </main>
  )
}
