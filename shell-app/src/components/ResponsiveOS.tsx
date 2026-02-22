"use client"

import { useDeviceType } from "@/hooks/useDeviceType"

// macOS Components
import Desktop from "./os/Desktop"
import LoginScreen from "./os/LoginScreen"
import SplashScreen from "./os/SplashScreen"

// iOS Components
import { useSystem } from "@/contexts/user-context"
import IOSDesktop from "./ios/IOSDesktop"
import IOSLockScreen from "./ios/IOSLockScreen"
import IOSSplashScreen from "./ios/IOSSplashScreen"

export default function ResponsiveOS() {
  const deviceType = useDeviceType()
  const {setBootState, bootState} = useSystem();

  const handleSplashComplete = () => {
    setBootState("login")
  }

  const handleLogin = () => {
    setBootState("desktop")
  }

  // Render iOS interface for mobile
  if (deviceType === "mobile") {
    return (
      <main className="h-screen w-full overflow-hidden">
        {bootState === "splash" && <IOSSplashScreen onComplete={handleSplashComplete} />}
        {bootState === "login" && <IOSLockScreen onUnlock={() => handleLogin()} />}
        {bootState === "desktop" && <IOSDesktop />}
      </main>
    )
  }

  // Render macOS interface for desktop
  return (
    <main className="h-screen w-full overflow-hidden">
      {bootState === "splash" && <SplashScreen onComplete={handleSplashComplete} />}
      {bootState === "login" && <LoginScreen onLogin={handleLogin} />}
      {bootState === "desktop" && <Desktop />}
    </main>
  )
}
