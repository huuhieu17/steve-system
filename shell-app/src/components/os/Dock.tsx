"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PlusCircle } from "lucide-react"

interface DockItem {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  isOpen?: boolean
}

interface DockProps {
  items: DockItem[]
  onItemClick: (id: string) => void
  onAddItem?: () => void
}

export default function Dock({ items, onItemClick, onAddItem }: DockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
        <div className="flex items-end space-x-1">
          {items.map((app) => (
            <TooltipProvider key={app.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative ${
                      hoveredItem === app.id ? "scale-125" : ""
                    } ${app.color} hover:scale-110 transition-all duration-200 shadow-lg rounded-xl w-12 h-12`}
                    onMouseEnter={() => setHoveredItem(app.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => onItemClick(app.id)}
                  >
                    {app.icon}
                    {app.isOpen && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{app.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

          {onAddItem && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-500/50 hover:scale-110 transition-all duration-200 shadow-lg rounded-xl w-12 h-12"
                    onClick={onAddItem}
                  >
                    <PlusCircle className="w-6 h-6 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Thêm ứng dụng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  )
}
