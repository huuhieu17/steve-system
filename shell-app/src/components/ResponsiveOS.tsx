import { useState } from "react"

// macOS Components
import SplashScreen from "./os/SplashScreen"
import LoginScreen from "./os/LoginScreen"
import Desktop from "./os/Desktop"

// iOS Components
import IOSSplashScreen from "./ios/IOSSplashScreen"
import IOSLockScreen from "./ios/IOSLockScreen"
import IOSDesktop from "./ios/IOSDesktop"
import { useDeviceType } from "@/hooks/useDeviceType"

export default function ResponsiveOS() {
  const deviceType = useDeviceType()
  const [bootState, setBootState] = useState<"splash" | "login" | "desktop">("splash")
  const [username, setUsername] = useState("")

  const users = [
    { id: "user1", name: "Steve", avatar: "" },
    { id: "user2", name: "Guest", avatar: "" },
  ]

  const handleSplashComplete = () => {
    setBootState("login")
  }

  const handleLogin = (username?: string) => {
    if (username) setUsername(username)
    setBootState("desktop")
  }

  const handleLogout = () => {
    setBootState("login")
  }

  // Render iOS interface for mobile
  if (deviceType === "mobile") {
    return (
      <main className="h-screen w-full overflow-hidden">
        {bootState === "splash" && <IOSSplashScreen onComplete={handleSplashComplete} />}
        {bootState === "login" && <IOSLockScreen onUnlock={() => handleLogin("Marcos")} />}
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
