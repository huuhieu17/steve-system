"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSystem } from "@/contexts/user-context"
import { consoleService } from "@/services/console.service"
import { Spinner } from "@radix-ui/themes/components/index"
import { Fingerprint, User } from "lucide-react"
import { useState } from "react"

interface IOSLockScreenProps {
  onUnlock: () => void
}

export default function IOSLockScreen({ onUnlock }: IOSLockScreenProps) {
  const { user, fetchUserData } = useSystem();
  const [time] = useState(new Date())
  const [showOtherAccountLogin, setShowOtherAccountLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleError = (message: string) => {
    setError(message);
    setIsUnlocking(false);
    return;
  }

  const handleGuestUnlock = () => {
    onUnlock()
  }

  const handleOtherAccountLogin = async () => {
    setError("")
    setIsUnlocking(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (!username.trim()) {
      handleError("Vui lòng nhập tên người dùng")
      return;
    }

    if (!password.trim()) {
      handleError("Vui lòng nhập mật khẩu")
      return;
    }
    try {
      const loginData = await consoleService.login(username, password);
      const { data } = loginData;

      const { code, message, data: loginResult } = data;
      const { authenticated } = loginResult || {};
      if (!data || code !== 200 || !authenticated) {
        handleError(message || "Tên người dùng hoặc mật khẩu không đúng");
      }
      setIsUnlocking(false);
      fetchUserData();
      onUnlock();
    } catch (err) {
      handleError("Tên người dùng hoặc mật khẩu không đúng");
      return;
    }

  }

  return (
    <div className="max-h-screen h-screen w-full bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden bg-gray-800">
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
          <span className="text-white text-sm font-medium">{user?.username || "Guest"}</span>
        </div>
      )}

      {/* Login Options */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-4">
        {showOtherAccountLogin ? (
          <div className="w-80 px-6 space-y-4">
            <div className="text-center mb-4">
              {isUnlocking ? (
                <div className="text-gray-400 text-sm text-center flex items-center justify-center gap-2"><Spinner size="3" /> Đang đăng nhập... </div>
              ) : (
                <h3 className="text-white text-lg font-medium">Đăng nhập tài khoản</h3>
              )}

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
            <div className="text-white text-sm mb-2">Mở khoá để truy cập các chức năng</div>
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-200 active:scale-95"
              onClick={handleGuestUnlock}
            >
              <Fingerprint className="w-8 h-8 text-white" />
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
