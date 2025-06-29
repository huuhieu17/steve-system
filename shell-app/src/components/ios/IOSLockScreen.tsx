"use client"

import { useState, useEffect } from "react"
import { ChevronUp, Camera, Flashlight, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface IOSLockScreenProps {
  onUnlock: () => void
}

export default function IOSLockScreen({ onUnlock }: IOSLockScreenProps) {
  const [time, setTime] = useState(new Date())
  const [showOtherAccountLogin, setShowOtherAccountLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleGuestUnlock = () => {
    onUnlock()
  }

  const handleOtherAccountLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin")
      return
    }

    // Simple validation - in real app, check against backend
    if (username.toLowerCase() === "marcos" && password === "password") {
      onUnlock()
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-white text-sm font-medium z-20">
        <div>{time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1.5 bg-white rounded-sm m-0.5" />
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="absolute top-1/4 left-0 right-0 text-center text-white">
        <div className="text-6xl font-light mb-2">
          {time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-lg font-medium">
          {time.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* Guest Avatar */}
      {!showOtherAccountLogin && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
            <User className="w-10 h-10 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Guest</span>
        </div>
      )}

      {/* Quick Actions */}
      <div className="absolute bottom-32 left-6 right-6 flex justify-between">
        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Flashlight className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Login Options */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-4">
        {showOtherAccountLogin ? (
          <div className="w-80 px-6 space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-medium">Đăng nhập tài khoản</h3>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên người dùng"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="Mật khẩu"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
                onKeyDown={(e) => e.key === "Enter" && handleOtherAccountLogin()}
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div className="flex space-x-2">
              <Button
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20"
                onClick={handleOtherAccountLogin}
              >
                Đăng nhập
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  setShowOtherAccountLogin(false)
                  setError("")
                  setUsername("")
                  setPassword("")
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-white text-sm mb-2">Vuốt lên để tiếp tục với Guest</div>
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-200 active:scale-95"
              onClick={handleGuestUnlock}
            >
              <ChevronUp className="w-8 h-8 text-white" />
            </button>

            <Button
              variant="outline"
              className="mt-4 border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowOtherAccountLogin(true)}
            >
              Đăng nhập tài khoản khác
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
