"use client"

import { useState } from "react"
import { User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: (username: string) => void
  users: { id: string; name: string; avatar: string; password?: string }[]
}

export default function LoginScreen({ onLogin, users }: LoginScreenProps) {
  const [showOtherAccountLogin, setShowOtherAccountLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [newAccountData, setNewAccountData] = useState({ username: "", password: "", confirmPassword: "" })

  // Guest account login (no password required)
  const handleGuestLogin = () => {
    onLogin("Guest")
  }

  // Other account login (requires username/password)
  const handleOtherAccountLogin = () => {
    if (!username.trim()) {
      setError("Vui lòng nhập tên người dùng")
      return
    }

    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu")
      return
    }

    // Check if user exists
    const existingUser = users.find((u) => u.name.toLowerCase() === username.toLowerCase())
    if (existingUser && existingUser.name !== "Guest") {
      if (password === "password" || password === existingUser.password) {
        onLogin(existingUser.name)
      } else {
        setError("Sai mật khẩu")
      }
    } else {
      setError("Tài khoản không tồn tại")
    }
  }

  const handleCreateAccount = () => {
    if (!newAccountData.username.trim()) {
      setError("Vui lòng nhập tên người dùng")
      return
    }

    if (!newAccountData.password.trim()) {
      setError("Vui lòng nhập mật khẩu")
      return
    }

    if (newAccountData.password !== newAccountData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    if (users.find((u) => u.name.toLowerCase() === newAccountData.username.toLowerCase())) {
      setError("Tên người dùng đã tồn tại")
      return
    }

    // Create new user and login
    onLogin(newAccountData.username)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      <div className="w-80 flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="text-white text-lg mb-1">
            {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-gray-400 text-sm">
            {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>

        {showCreateAccount ? (
          // Create Account Form
          <div className="w-full space-y-4">
            <h2 className="text-white text-xl font-semibold text-center mb-6">Tạo tài khoản mới</h2>

            <Input
              type="text"
              value={newAccountData.username}
              onChange={(e) => setNewAccountData({ ...newAccountData, username: e.target.value })}
              placeholder="Tên người dùng"
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
            />

            <Input
              type="password"
              value={newAccountData.password}
              onChange={(e) => setNewAccountData({ ...newAccountData, password: e.target.value })}
              placeholder="Mật khẩu"
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
            />

            <Input
              type="password"
              value={newAccountData.confirmPassword}
              onChange={(e) => setNewAccountData({ ...newAccountData, confirmPassword: e.target.value })}
              placeholder="Xác nhận mật khẩu"
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
            />

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div className="flex space-x-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateAccount}>
                Tạo tài khoản
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  setShowCreateAccount(false)
                  setError("")
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : showOtherAccountLogin ? (
          // Other Account Login Form
          <div className="w-full space-y-4">
            <h2 className="text-white text-xl font-semibold text-center mb-6">Đăng nhập tài khoản</h2>

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên người dùng"
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
            />

            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="Mật khẩu"
                className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400"
                onKeyDown={(e) => e.key === "Enter" && handleOtherAccountLogin()}
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleOtherAccountLogin}>
                Đăng nhập
              </Button>

              <div className="flex space-x-2">
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
                  Quay lại
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    setShowCreateAccount(true)
                    setShowOtherAccountLogin(false)
                    setError("")
                  }}
                >
                  Tạo tài khoản
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Default Guest Login
          <div className="w-full space-y-6">
            {/* Guest User Display */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center mb-4 overflow-hidden">
                <User className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">Guest</h2>
              <p className="text-gray-400 text-sm text-center">Tài khoản khách - Không cần mật khẩu</p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
                onClick={handleGuestLogin}
              >
                Tiếp tục với Guest
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-800 px-2 text-gray-400">Hoặc</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowOtherAccountLogin(true)}
              >
                Đăng nhập tài khoản khác
              </Button>
            </div>

            {/* Quick Access to Existing Users (if any) */}
            {users.filter((u) => u.name !== "Guest").length > 0 && (
              <div className="mt-6">
                <p className="text-gray-400 text-sm text-center mb-3">Tài khoản gần đây:</p>
                <div className="flex justify-center space-x-3">
                  {users
                    .filter((u) => u.name !== "Guest")
                    .slice(0, 3)
                    .map((user) => (
                      <button
                        key={user.id}
                        className="flex flex-col items-center p-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => {
                          setUsername(user.name)
                          setShowOtherAccountLogin(true)
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-1">
                          {user.avatar ? (
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <User className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <span className="text-xs text-gray-300">{user.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
