"use client"

import { useState } from "react"
import { User, Wifi, Bluetooth, Bell, Moon, Shield, Globe, Volume2, Battery, ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import IOSApp from "../IOSApp"

interface IOSSettingsAppProps {
  onClose: () => void
}

export default function IOSSettingsApp({ onClose }: IOSSettingsAppProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const settingsGroups = [
    {
      items: [
        {
          icon: <User className="w-6 h-6 text-white" />,
          iconBg: "bg-gray-500",
          title: "Marcos",
          subtitle: "Apple ID, iCloud, Media & Purchases",
          hasArrow: true,
        },
      ],
    },
    {
      items: [
        {
          icon: <Wifi className="w-6 h-6 text-white" />,
          iconBg: "bg-blue-500",
          title: "Wi-Fi",
          subtitle: "Home Network",
          hasArrow: true,
          toggle: { value: wifiEnabled, onChange: setWifiEnabled },
        },
        {
          icon: <Bluetooth className="w-6 h-6 text-white" />,
          iconBg: "bg-blue-600",
          title: "Bluetooth",
          subtitle: "On",
          hasArrow: true,
          toggle: { value: bluetoothEnabled, onChange: setBluetoothEnabled },
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
          icon: <Volume2 className="w-6 h-6 text-white" />,
          iconBg: "bg-red-600",
          title: "Sounds & Haptics",
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
    {
      items: [
        {
          icon: <Globe className="w-6 h-6 text-white" />,
          iconBg: "bg-gray-500",
          title: "General",
          hasArrow: true,
        },
      ],
    },
  ]

  return (
    <IOSApp title="Settings" onClose={onClose}>
      <div className="bg-gray-100 min-h-full">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <div className="bg-white rounded-xl mx-4 overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-center p-4 ${
                    itemIndex < group.items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    {item.subtitle && <div className="text-sm text-gray-500">{item.subtitle}</div>}
                  </div>

                  {item.toggle ? (
                    <Switch checked={item.toggle.value} onCheckedChange={item.toggle.onChange} />
                  ) : item.hasArrow ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </IOSApp>
  )
}
