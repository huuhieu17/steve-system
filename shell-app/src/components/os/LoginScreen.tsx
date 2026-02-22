"use client"

import { useState, useTransition } from "react"
import { User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { consoleService } from "@/services/console.service"
import { useSystem } from "@/contexts/user-context"
import { Spinner } from "@radix-ui/themes"
interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { user, fetchUserData } = useSystem();
  const [showOtherAccountLogin, setShowOtherAccountLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [newAccountData, setNewAccountData] = useState({ username: "", password: "", confirmPassword: "", email: "" })
  const [isLogging, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Guest account login (no password required)
  const handleLogin = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    onLogin()
  }

  const handleError = (message: string) => {
    setError(message);
    setIsSubmitting(false);
    return;
  }

  // Other account login (requires username/password)
  const handleOtherAccountLogin = async () => {
    setError("")
    setIsSubmitting(true);
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
      setIsSubmitting(false);
      fetchUserData();
      onLogin();
    } catch (err) {
      handleError("Tên người dùng hoặc mật khẩu không đúng");
      return;
    }

  }

  const handleCreateAccount = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]\\/~`+=;']).{8,}$/;

    if (!newAccountData.username.trim()) {
      handleError("Vui lòng nhập tên người dùng");
      setIsSubmitting(false);
      return;
    }

    if (!newAccountData.email.trim()) {
      handleError("Vui lòng nhập email");
      setIsSubmitting(false);
      return;
    }

    if (!newAccountData.password.trim()) {
      handleError("Vui lòng nhập mật khẩu");
      setIsSubmitting(false);
      return;
    }

    // ✅ validate password mạnh
    if (!passwordRegex.test(newAccountData.password)) {
      handleError(
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      setIsSubmitting(false);
      return;
    }

    if (newAccountData.password !== newAccountData.confirmPassword) {
      handleError("Mật khẩu xác nhận không khớp");
      setIsSubmitting(false);
      return;
    }

    try {
      const registerData = await consoleService.register(
        newAccountData.username,
        newAccountData.password,
        newAccountData.email
      );

      const { data } = registerData;
      const { code, message } = data;

      if (!data || code !== 200) {
        handleError(message || "Đăng ký thất bại");
        setIsSubmitting(false);
        return;
      }

      loginAfterCreateAccount();
    } catch (err) {
      handleError("Đăng ký thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginAfterCreateAccount = () => {
    setUsername(newAccountData.username);
    setPassword(newAccountData.password);
    setShowCreateAccount(false);
    setShowOtherAccountLogin(true);
    setError("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
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
            {isSubmitting ?
              (
                <div className="text-gray-400 text-sm text-center flex items-center justify-center gap-2"><Spinner size="3" /> Đang tạo tài khoản... </div>
              ) : (
                <h2 className="text-white text-xl font-semibold text-center mb-6">Tạo tài khoản mới</h2>
              )}

            <Input
              type="text"
              value={newAccountData.username}
              onChange={(e) => setNewAccountData({ ...newAccountData, username: e.target.value })}
              placeholder="Tên người dùng"
              className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
            />

            <Input
              type="email"
              value={newAccountData.email}
              onChange={(e) => setNewAccountData({ ...newAccountData, email: e.target.value })}
              placeholder="Email"
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
            {isSubmitting || isLogging ?
              (
                <div className="text-gray-400 text-sm text-center flex items-center justify-center gap-2"><Spinner size="3" /> Đang đăng nhập với {username}... </div>
              ) : (
                <h2 className="text-white text-xl font-semibold text-center mb-6">Đăng nhập tài khoản</h2>
              )}

            {!isSubmitting && !isLogging && (
              <>
                <div className="relative">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên người dùng"
                    className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
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
              </>
            )}
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
              <h2 className="text-white text-xl font-semibold mb-2">{user?.username || "Guest"}</h2>
              <p className="text-gray-400 text-sm text-center">{user ? `Xin chào ${user.lastName ?? ""} ${user.firstName ?? ""} đã quay trở lại` : "Tài khoản khách - Không cần mật khẩu"}</p>
            </div>

            <div className="space-y-3">
              {isSubmitting || isLogging ?
                (
                  <div className="text-gray-400 text-sm text-center flex items-center justify-center gap-2"><Spinner size="3" /> Đang đăng nhập... </div>
                ) :
                (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
                    onClick={() => {
                      startTransition(() => {
                        handleLogin();
                      });
                    }}
                  >
                    Tiếp tục với {user?.username || "Guest"}
                  </Button>
                )}

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

          </div>
        )}
      </div>
    </div>
  )
}
