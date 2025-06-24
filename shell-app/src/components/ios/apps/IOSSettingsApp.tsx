"use client"

import { useState } from "react"
import {
  User,
  Wifi,
  Bluetooth,
  Bell,
  Moon,
  Shield,
  Globe,
  Volume2,
  Battery,
  ChevronRight,
  Smartphone,
  Eye,
  Palette,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import IOSApp from "../IOSApp"

interface IOSSettingsAppProps {
  onClose: () => void
  username?: string
  onLogout?: () => void
}

export default function IOSSettingsApp({ onClose, username = "Guest", onLogout }: IOSSettingsAppProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [volume, setVolume] = useState([75])
  const [brightness, setBrightness] = useState([80])

  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [newAccountData, setNewAccountData] = useState({ username: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")

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

    alert(`Tài khoản ${newAccountData.username} đã được tạo thành công!`)
    setShowCreateAccount(false)
    setNewAccountData({ username: "", password: "", confirmPassword: "" })
    setError("")
  }

  if (selectedSection === "wifi") {
    return (
      <IOSApp title="Wi-Fi" onClose={() => setSelectedSection(null)}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Wi-Fi</span>
            <Switch checked={wifiEnabled} onCheckedChange={setWifiEnabled} />
          </div>

          {wifiEnabled && (
            <div className="space-y-3">
              <div className="text-sm text-gray-500 uppercase tracking-wide">Available Networks</div>
              {["Home Network", "Office Wi-Fi", "Guest Network", "iPhone của Marcos"].map((network, index) => (
                <div key={network} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">{network}</div>
                      {index === 0 && <div className="text-sm text-gray-500">Connected</div>}
                    </div>
                  </div>
                  {index === 0 ? (
                    <div className="text-blue-500 text-sm">✓</div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </IOSApp>
    )
  }

  if (selectedSection === "bluetooth") {
    return (
      <IOSApp title="Bluetooth" onClose={() => setSelectedSection(null)}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Bluetooth</span>
            <Switch checked={bluetoothEnabled} onCheckedChange={setBluetoothEnabled} />
          </div>

          {bluetoothEnabled && (
            <div className="space-y-3">
              <div className="text-sm text-gray-500 uppercase tracking-wide">My Devices</div>
              {["AirPods Pro", "Magic Keyboard", "Magic Mouse"].map((device) => (
                <div key={device} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bluetooth className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">{device}</div>
                      <div className="text-sm text-gray-500">Connected</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </IOSApp>
    )
  }

  if (selectedSection === "display") {
    return (
      <IOSApp title="Display & Brightness" onClose={() => setSelectedSection(null)}>
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="space-y-2">
              <div className="font-medium">Brightness</div>
              <div className="flex items-center space-x-3">
                <Eye className="w-4 h-4 text-gray-400" />
                <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} className="flex-1" />
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-medium">Text Size</div>
              <div className="grid grid-cols-3 gap-2">
                {["Small", "Medium", "Large"].map((size) => (
                  <button key={size} className="p-3 border rounded-lg text-center hover:bg-gray-50">
                    <div className={`${size === "Small" ? "text-sm" : size === "Large" ? "text-lg" : "text-base"}`}>
                      Aa
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{size}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IOSApp>
    )
  }

  if (selectedSection === "sounds") {
    return (
      <IOSApp title="Sounds & Haptics" onClose={() => setSelectedSection(null)}>
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Volume</div>
              <div className="flex items-center space-x-3">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                <Volume2 className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-medium">Ringtones & Alerts</div>
              {["Ringtone", "Text Tone", "New Mail", "Calendar Alerts"].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{item}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">Default</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="font-medium">System Haptics</div>
              <div className="flex items-center justify-between">
                <span>System Haptics</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </IOSApp>
    )
  }

  if (selectedSection === "account") {
    return (
      <IOSApp title="Account" onClose={() => setSelectedSection(null)}>
        <div className="p-4 space-y-6">
          {username === "Guest" ? (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-medium text-yellow-800">Guest Account</h3>
                </div>
                <p className="text-sm text-yellow-700 mb-3">
                  Bạn đang sử dụng tài khoản khách. Tạo tài khoản để lưu cài đặt và dữ liệu cá nhân.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCreateAccount(true)}>
                  Tạo tài khoản mới
                </Button>
              </div>

              {showCreateAccount && (
                <div className="space-y-4">
                  <h3 className="font-medium">Tạo tài khoản mới</h3>

                  <Input
                    type="text"
                    value={newAccountData.username}
                    onChange={(e) => setNewAccountData({ ...newAccountData, username: e.target.value })}
                    placeholder="Tên người dùng"
                  />

                  <Input
                    type="password"
                    value={newAccountData.password}
                    onChange={(e) => setNewAccountData({ ...newAccountData, password: e.target.value })}
                    placeholder="Mật khẩu"
                  />

                  <Input
                    type="password"
                    value={newAccountData.confirmPassword}
                    onChange={(e) => setNewAccountData({ ...newAccountData, confirmPassword: e.target.value })}
                    placeholder="Xác nhận mật khẩu"
                  />

                  {error && <div className="text-red-600 text-sm">{error}</div>}

                  <div className="flex space-x-2">
                    <Button onClick={handleCreateAccount} className="flex-1">
                      Tạo tài khoản
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateAccount(false)} className="flex-1">
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-lg">{username}</div>
                  <div className="text-sm text-gray-500">Apple ID</div>
                </div>
              </div>

              <div className="space-y-3">
                {["Media & Purchases", "Find My", "iCloud", "Screen Time"].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>

              {onLogout && (
                <Button variant="destructive" onClick={onLogout} className="w-full">
                  Đăng xuất
                </Button>
              )}
            </div>
          )}
        </div>
      </IOSApp>
    )
  }

  // Main Settings Screen
  const settingsGroups: any = [
    {
      items: [
        {
          icon: <User className="w-6 h-6 text-white" />,
          iconBg: "bg-gray-500",
          title: username,
          subtitle: username === "Guest" ? "Tap to create account" : "Apple ID, iCloud, Media & Purchases",
          hasArrow: true,
          onTap: () => setSelectedSection("account"),
        },
      ],
    },
    {
      items: [
        {
          icon: <Wifi className="w-6 h-6 text-white" />,
          iconBg: "bg-blue-500",
          title: "Wi-Fi",
          subtitle: wifiEnabled ? "Home Network" : "Off",
          hasArrow: true,
          onTap: () => setSelectedSection("wifi"),
        },
        {
          icon: <Bluetooth className="w-6 h-6 text-white" />,
          iconBg: "bg-blue-600",
          title: "Bluetooth",
          subtitle: bluetoothEnabled ? "On" : "Off",
          hasArrow: true,
          onTap: () => setSelectedSection("bluetooth"),
        },
        {
          icon: <Smartphone className="w-6 h-6 text-white" />,
          iconBg: "bg-green-500",
          title: "Cellular",
          hasArrow: true,
        },
      ],
    },
    {
      items: [
        {
          icon: <Bell className="w-6 h-6 text-white" />,
          iconBg: "bg-red-500",
          title: "Notifications",
          hasArrow: true,
          toggle: { value: notifications, onChange: setNotifications },
        },
        {
          icon: <Volume2 className="w-6 h-6 text-white" />,
          iconBg: "bg-red-600",
          title: "Sounds & Haptics",
          hasArrow: true,
          onTap: () => setSelectedSection("sounds"),
        },
        {
          icon: <Moon className="w-6 h-6 text-white" />,
          iconBg: "bg-purple-600",
          title: "Do Not Disturb",
          hasArrow: true,
        },
      ],
    },
    {
      items: [
        {
          icon: <Eye className="w-6 h-6 text-white" />,
          iconBg: "bg-blue-500",
          title: "Display & Brightness",
          hasArrow: true,
          onTap: () => setSelectedSection("display"),
        },
        {
          icon: <Palette className="w-6 h-6 text-white" />,
          iconBg: "bg-purple-500",
          title: "Wallpaper",
          hasArrow: true,
        },
      ],
    },
    {
      items: [
        {
          icon: <Globe className="w-6 h-6 text-white" />,
          iconBg: "bg-gray-500",
          title: "General",
          hasArrow: true,
        },
        {
          icon: <Shield className="w-6 h-6 text-white" />,
          iconBg: "bg-gray-600",
          title: "Privacy & Security",
          hasArrow: true,
        },
        {
          icon: <Battery className="w-6 h-6 text-white" />,
          iconBg: "bg-green-500",
          title: "Battery",
          hasArrow: true,
        },
      ],
    },
  ]

  return (
    <IOSApp title="Settings" onClose={onClose} showBackButton={false}>
      <div className="bg-gray-100 min-h-full">
        {settingsGroups.map((group: any, groupIndex: number) => (
          <div key={groupIndex} className="mb-8">
            <div className="bg-white rounded-xl mx-4 overflow-hidden">
              {group.items.map((item: any, itemIndex: number) => (
                <button
                  key={itemIndex}
                  className={`w-full flex items-center p-4 ${
                    itemIndex < group.items.length - 1 ? "border-b border-gray-100" : ""
                  } active:bg-gray-50`}
                  onClick={item.onTap}
                >
                  <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                    {item.icon}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    {item.subtitle && <div className="text-sm text-gray-500">{item.subtitle}</div>}
                  </div>

                  {item.toggle ? (
                    <Switch
                      checked={item.toggle.value}
                      onCheckedChange={item.toggle.onChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : item.hasArrow ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </IOSApp>
  )
}
