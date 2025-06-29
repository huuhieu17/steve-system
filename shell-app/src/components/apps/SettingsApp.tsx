"use client"

import { useState } from "react"
import { User, Shield, Wifi, Monitor, Bell, Globe, VolumeX, Volume2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DynamicAppManager, { type DynamicApp } from "./DynamicAppManager"
import { useSystem } from "@/contexts/user-context"

// Thêm props cho dynamic apps
interface SettingsAppProps {
  dynamicApps?: DynamicApp[]
  onAddApp?: (app: DynamicApp) => void
  onUpdateApp?: (id: string, app: DynamicApp) => void
  onDeleteApp?: (id: string) => void
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

  const settingsCategories = [
    { id: "general", name: "General", icon: <Globe className="w-5 h-5" /> },
    { id: "appearance", name: "Appearance", icon: <Monitor className="w-5 h-5" /> },
    { id: "notifications", name: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "sound", name: "Sound", icon: <Volume2 className="w-5 h-5" /> },
    { id: "network", name: "Network", icon: <Wifi className="w-5 h-5" /> },
    { id: "security", name: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "users", name: "Users", icon: <User className="w-5 h-5" /> },
  ]

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50/80 border-r border-gray-200/50 p-2">
        <div className="space-y-1">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-lg"
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">System Preferences</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="sound">Sound</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">General Settings</h2>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Language</div>
                  <div className="text-sm text-gray-500">System language setting</div>
                </div>
                <select className="px-3 py-1 border rounded-md">
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>French</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Time Zone</div>
                  <div className="text-sm text-gray-500">Set your time zone</div>
                </div>
                <select className="px-3 py-1 border rounded-md">
                  <option>UTC+07:00 - Ho Chi Minh</option>
                  <option>UTC+00:00 - London</option>
                  <option>UTC-08:00 - Los Angeles</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Date Format</div>
                  <div className="text-sm text-gray-500">Choose your preferred date format</div>
                </div>
                <select className="px-3 py-1 border rounded-md">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Appearance Settings</h2>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-500">Enable dark mode for system UI</div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Accent Color</div>
                <div className="flex space-x-2">
                  {["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-red-500", "bg-green-500", "bg-yellow-500"].map(
                    (color) => (
                      <button key={color} className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm`} />
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Text Size</div>
                <Slider defaultValue={[12]} max={20} min={8} step={1} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sound" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Sound Settings</h2>

              <div className="space-y-2">
                <div className="font-medium">Volume</div>
                <div className="flex items-center space-x-2">
                  <VolumeX className="w-4 h-4" />
                  <Slider
                    value={[volume]}
                    onValueChange={(vals) => setVolume(vals[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4" />
                  <span className="w-8 text-right text-sm">{volume}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sound Effects</div>
                  <div className="text-sm text-gray-500">Play sound effects for UI interactions</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Startup Sound</div>
                  <div className="text-sm text-gray-500">Play sound when system starts</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Network Settings</h2>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Wi-Fi</div>
                  <div className="text-sm text-gray-500">Connect to wireless networks</div>
                </div>
                <Switch checked={wifi} onCheckedChange={setWifi} />
              </div>

              {wifi && (
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="font-medium">Available Networks</div>
                  <div className="space-y-2">
                    {["Home Network", "Office Wi-Fi", "Guest Network"].map((network) => (
                      <div key={network} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
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

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Bluetooth</div>
                  <div className="text-sm text-gray-500">Connect to Bluetooth devices</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">User Settings</h2>

              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {user && user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-lg">{user && user.username}</div>
                  <div className="text-sm text-gray-500">Administrator</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="destructive" className="flex items-center space-x-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="apps" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Dynamic Apps Management</h2>
              <p className="text-sm text-gray-600">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
