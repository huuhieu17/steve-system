"use client"

import type React from "react"

import { X, ChevronLeft } from "lucide-react"

interface IOSAppProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  showBackButton?: boolean
}

export default function IOSApp({ title, onClose, children, showBackButton = true }: IOSAppProps) {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Dynamic Island */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />

      {/* Header */}
      <div className="pt-8 pb-2 px-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        {showBackButton ? (
          <button className="flex items-center space-x-1 text-blue-500 font-medium" onClick={onClose}>
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
