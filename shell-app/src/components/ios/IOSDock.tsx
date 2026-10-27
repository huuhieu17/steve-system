"use client"

import type { AppId } from "@/types/window"
import Icon from "../Icon"

interface IOSDockProps {
  apps: {
    id: AppId
    name: string
    icon: AppId
    color: string
  }[]
  onAppClick: (appId: string) => void
}

export default function IOSDock({ apps, onAppClick }: IOSDockProps) {
  return (
    <div className="absolute bottom-2 left-2 right-2">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-2 border border-white/20">
        <div className="flex justify-center space-x-4">
          {apps.map((app) => (
            <button key={app.id} className="group" onClick={() => onAppClick(app.id)}>

              <Icon name={app.icon} size={28} className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
