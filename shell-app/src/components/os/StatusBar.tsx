import { useSystem } from "@/contexts/user-context"
import { useWindowManager } from "@/hooks/useWindowManager"
import { Battery, Bell, Volume2, Wifi } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface StatusBarProps {
  onOpenSettings: () => void
}

export default function StatusBar({ onOpenSettings }: StatusBarProps) {
  const windowManager = useWindowManager();
  const startRef = useRef<HTMLDivElement>(null);
  const { user, handleLogout } = useSystem()
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  )
  const [date, setDate] = useState(
    new Date().toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    }),
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
      setDate(
        now.toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
        }),
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  //  handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (startRef.current && !startRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [startRef])

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium z-50">
      <div className="flex items-center space-x-4 relative" ref={startRef}>
        <div className="font-bold">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer hover:bg-white/10 rounded px-1 flex items-center gap-2">
            <span className="text-xl"></span>
            {user ? user.username : ''}
          </div>
          {isMenuOpen && (
            <div className="absolute left-0 top-6 w-72 bg-white backdrop-blur-md rounded-lg text-gray-700 shadow-xl border border-white/10 p-2 text-sm">
              <div className="space-y-1 font-normal text-sm">
                <button className=" cursor-pointer w-full text-left p-1 hover:bg-black/5 rounded">
                  <div className="">About this system</div>
                </button>
                <hr className="border-t border-black/10" />
                <button onClick={() => {
                  onOpenSettings();
                  setIsMenuOpen(false)
                }} className=" cursor-pointer w-full text-left p-1 hover:bg-black/5 rounded">
                  <div className="">System Preferences</div>
                </button>
                <button className=" cursor-pointer w-full text-left p-1 hover:bg-black/5 rounded">
                  <div className="">App Store...</div>
                </button>
                <hr className="border-t border-black/10" />
                <button onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false)
                }} className=" cursor-pointer w-full text-left p-1 hover:bg-black/5 rounded">
                  <div className="">Log out {user && user.username} ...</div>
                </button>
              </div>
            </div>
          )}
        </div>
        <span onClick={() => windowManager.openWindow('finder')}>Finder</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            className="flex items-center space-x-1 hover:bg-white/10 rounded px-1"
          >
            <Bell className="w-3.5 h-3.5" />
          </button>

          {/* {isMenuOpen && (
            <div className="absolute right-0 top-6 w-72 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-3 text-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Thông báo</h3>
                <button className="text-xs text-blue-400">Xóa tất cả</button>
              </div>
              <div className="space-y-2">
                <div className="p-2 hover:bg-white/5 rounded">
                  <div className="font-medium">Cập nhật hệ thống</div>
                  <div className="text-xs text-gray-400">Có bản cập nhật mới cho macOS</div>
                </div>
                <div className="p-2 hover:bg-white/5 rounded">
                  <div className="font-medium">Lời nhắc</div>
                  <div className="text-xs text-gray-400">Cuộc họp lúc 15:00</div>
                </div>
              </div>
            </div>
          )} */}
        </div>

        <button>
          <Wifi className="w-4 h-4" />
        </button>
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span>{date}</span>
        <span>{time}</span>
        {/* <div
          className="flex items-center space-x-1 hover:bg-white/10 rounded px-1 cursor-pointer"
          onClick={onOpenSettings}
        >
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px]">
            {user && user.username.charAt(0).toUpperCase()}
          </div>
          <span>{user && user.username}</span>
        </div> */}
      </div>
    </div>
  )
}
