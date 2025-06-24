"use client"

import { useState } from "react"
import { User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: (username: string) => void
  users: { id: string; name: string; avatar: string }[]
}

export default function LoginScreen({ onLogin, users }: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState(users[0]?.id || "")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    // In a real app, you would validate the password
    if (password === "password" || password === "") {
      const user = users.find((u) => u.id === selectedUser)
      onLogin(user?.name || "Guest")
    } else {
      setError("Sai mật khẩu. Hãy thử lại.")
      setPassword("")
    }
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

        <div className="w-full space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            {users.map((user) => (
              <button
                key={user.id}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  selectedUser === user.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-white">{user.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="Mật khẩu"
                className="pl-10 bg-white/10 border-white/10 text-white"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button className="w-full bg-white/10 hover:bg-white/20 text-white" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
