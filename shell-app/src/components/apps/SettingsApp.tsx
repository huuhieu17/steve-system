"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useSystem } from "@/contexts/user-context"
import { Globe, LogOut, Monitor, User, Volume2, VolumeX, Wifi } from "lucide-react"
import { type ReactNode, useState } from "react"
import DynamicAppManager, { type DynamicApp } from "./DynamicAppManager"

// Thêm props cho dynamic apps
interface SettingsAppProps {
  dynamicApps?: DynamicApp[]
  onAddApp?: (app: DynamicApp) => void
  onUpdateApp?: (id: string, app: DynamicApp) => void
  onDeleteApp?: (id: string) => void
}

interface SettingsSectionProps {
  title: string
  description: string
  children: ReactNode
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-sm p-5 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-800">{title}</h2>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      {children}
    </div>
  )
}

interface SettingsRowProps {
  title: string
  description?: string
  children: ReactNode
}

function SettingsRow({ title, description, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200/70 bg-white/80 px-4 py-3">
      <div>
        <div className="font-medium text-zinc-800">{title}</div>
        {description && <div className="text-sm text-zinc-500">{description}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsApp({
  dynamicApps,
  onAddApp,
  onUpdateApp,
  onDeleteApp,
}: SettingsAppProps) {
  const { user, handleLogout } = useSystem();

  const [volume, setVolume] = useState(75)
  const [darkMode, setDarkMode] = useState(false)
  // const [notifications, setNotifications] = useState(true)
  const [wifi, setWifi] = useState(true)
  const [activeTab, setActiveTab] = useState("general");

  const settingsCategories = [
    { id: "general", name: "General", icon: <Globe className="w-5 h-5" /> },
    { id: "appearance", name: "Appearance", icon: <Monitor className="w-5 h-5" /> },
    // { id: "notifications", name: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "sound", name: "Sound", icon: <Volume2 className="w-5 h-5" /> },
    { id: "network", name: "Network", icon: <Wifi className="w-5 h-5" /> },
    // { id: "security", name: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "users", name: "Users", icon: <User className="w-5 h-5" /> },
    { id: "apps", name: "Apps", icon: <Globe className="w-5 h-5" /> },
  ]

  const activeCategoryName = settingsCategories.find((category) => category.id === activeTab)?.name || "Settings"

  return (
    <div className="h-full flex bg-gradient-to-b from-zinc-100 to-zinc-200/70">
      <div className="w-56 border-r border-white/70 bg-white/65 backdrop-blur-xl p-3">
        <div className="px-2 pb-3">
          <div className="text-xs uppercase tracking-wide text-zinc-500">System Settings</div>
        </div>
        <div className="space-y-1">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-xl transition-all duration-150 ${
                activeTab === category.id
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-zinc-700 hover:bg-zinc-200/80"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-4">
        <div className="rounded-2xl border border-white/80 bg-white/75 backdrop-blur-xl px-5 py-4 shadow-sm">
          <h1 className="text-xl font-semibold text-zinc-800">{activeCategoryName}</h1>
          <p className="text-sm text-zinc-500">Tinh chỉnh hệ thống.</p>
        </div>

        {activeTab === "general" && (
          <div aria-label="general" className="space-y-4">
            <SettingsSection title="General Settings" description="Thiết lập hệ thống cơ bản.">
              <SettingsRow title="Language" description="System language setting">
                <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>French</option>
                </select>
              </SettingsRow>

              <SettingsRow title="Time Zone" description="Set your time zone">
                <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>UTC+07:00 - Ho Chi Minh</option>
                  <option>UTC+00:00 - London</option>
                  <option>UTC-08:00 - Los Angeles</option>
                </select>
              </SettingsRow>

              <SettingsRow title="Date Format" description="Choose your preferred date format">
                <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </SettingsRow>
            </SettingsSection>
          </div>
        )}

        {activeTab === "appearance" && (
          <div aria-label="appearance" className="space-y-4">
            <SettingsSection title="Appearance Settings" description="Điều chỉnh giao diện và kiểu hiển thị.">
              <SettingsRow title="Dark Mode" description="Enable dark mode for system UI">
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </SettingsRow>

              <div className="space-y-2">
                <div className="font-medium text-zinc-800">Accent Color</div>
                <div className="flex space-x-2">
                  {["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-red-500", "bg-green-500", "bg-yellow-500"].map(
                    (color) => (
                      <button key={color} className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm`} />
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium text-zinc-800">Text Size</div>
                <Slider defaultValue={[12]} max={20} min={8} step={1} />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </SettingsSection>
          </div>
        )}

        {activeTab === "sound" && (
          <div aria-label="sound" className="space-y-4">
            <SettingsSection title="Sound Settings" description="Âm lượng và âm thanh hệ thống.">
              <div className="space-y-2">
                <div className="font-medium text-zinc-800">Volume</div>
                <div className="flex items-center space-x-2 rounded-xl border border-zinc-200/70 bg-white/80 px-4 py-3">
                  <VolumeX className="w-4 h-4" />
                  <Slider
                    value={[volume]}
                    onValueChange={(vals) => setVolume(vals[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4" />
                  <span className="w-10 text-right text-sm text-zinc-700">{volume}%</span>
                </div>
              </div>

              <SettingsRow title="Sound Effects" description="Play sound effects for UI interactions">
                <Switch defaultChecked />
              </SettingsRow>

              <SettingsRow title="Startup Sound" description="Play sound when system starts">
                <Switch defaultChecked />
              </SettingsRow>
            </SettingsSection>
          </div>
        )}

        {activeTab === "network" && (
          <div aria-label="network" className="space-y-4">
            <SettingsSection title="Network Settings" description="Quản lý Wi-Fi và kết nối thiết bị.">
              <SettingsRow title="Wi-Fi" description="Connect to wireless networks">
                <Switch checked={wifi} onCheckedChange={setWifi} />
              </SettingsRow>

              {wifi && (
                <div className="border border-zinc-200/70 rounded-xl p-4 space-y-2 bg-white/80">
                  <div className="font-medium text-zinc-800">Available Networks</div>
                  <div className="space-y-2">
                    {["Steve Network", "Office Wi-Fi", "Guest Network"].map((network) => (
                      <div key={network} className="flex items-center justify-between p-2 hover:bg-zinc-100 rounded-lg">
                        <div className="flex items-center">
                          <Wifi className="w-4 h-4 mr-2" />
                          <span>{network}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <SettingsRow title="Bluetooth" description="Connect to Bluetooth devices">
                <Switch defaultChecked />
              </SettingsRow>
            </SettingsSection>
          </div>
        )}

        {activeTab === "users" && (
          <div aria-label="users" className="space-y-4">
            <SettingsSection title="User Settings" description="Thông tin tài khoản và đăng xuất.">
              <div className="flex items-center space-x-4 p-4 border border-zinc-200/70 rounded-xl bg-white/80">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {user && user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-lg">{user && user.username}</div>
                  <div className="text-sm text-zinc-500">Administrator</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="destructive" className="flex items-center space-x-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            </SettingsSection>
          </div>
        )}

        {activeTab === "apps" && (
          <div aria-label="apps" className="space-y-4">
            <SettingsSection title="Dynamic Apps Management" description="Quản lý các app mở rộng cho desktop.">
              <p className="text-sm text-zinc-600">
                Thêm các ứng dụng web, component React hoặc micro frontend vào desktop.
              </p>

              {onAddApp && onUpdateApp && onDeleteApp && (
                <DynamicAppManager
                  apps={dynamicApps || []}
                  onAddApp={onAddApp}
                  onUpdateApp={onUpdateApp}
                  onDeleteApp={onDeleteApp}
                />
              )}
            </SettingsSection>
          </div>
        )}
      </div>
    </div>
  )
}
