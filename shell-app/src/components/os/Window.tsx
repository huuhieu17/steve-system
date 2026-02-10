"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface WindowProps {
  id: string
  title: string
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  minSize?: { width: number; height: number }
  children: React.ReactNode
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onFocus: (id: string) => void
  isFocused: boolean
}

export default function Window({
  id,
  title,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 800, height: 500 },
  minSize = { width: 300, height: 200 },
  children,
  onClose,
  onMinimize,
  onFocus,
  isFocused,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size })

  const windowRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ width: 0, height: 0, x: 0, y: 0 })

  // Handle window dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const deltaX = e.clientX - dragStartRef.current.x
        const deltaY = e.clientY - dragStartRef.current.y

        setPosition((prev) => ({
          x: Math.max(0, prev.x + deltaX),
          y: Math.max(0, prev.y + deltaY),
        }))

        dragStartRef.current = { x: e.clientX, y: e.clientY }
      }

      if (isResizing && !isMaximized) {
        e.preventDefault()

        const deltaX = e.clientX - resizeStartRef.current.x
        const deltaY = e.clientY - resizeStartRef.current.y

        let newWidth = resizeStartRef.current.width
        let newHeight = resizeStartRef.current.height
        let newX = position.x
        let newY = position.y

        if (resizeDirection?.includes("e")) {
          newWidth = Math.max(minSize.width, resizeStartRef.current.width + deltaX)
        }
        if (resizeDirection?.includes("s")) {
          newHeight = Math.max(minSize.height, resizeStartRef.current.height + deltaY)
        }
        if (resizeDirection?.includes("w")) {
          const widthChange = resizeStartRef.current.x - e.clientX
          newWidth = Math.max(minSize.width, resizeStartRef.current.width + widthChange)
          if (newWidth !== resizeStartRef.current.width) {
            newX = resizeStartRef.current.x - widthChange - (newWidth - resizeStartRef.current.width)
          }
        }
        if (resizeDirection?.includes("n")) {
          const heightChange = resizeStartRef.current.y - e.clientY
          newHeight = Math.max(minSize.height, resizeStartRef.current.height + heightChange)
          if (newHeight !== resizeStartRef.current.height) {
            newY = resizeStartRef.current.y - heightChange - (newHeight - resizeStartRef.current.height)
          }
        }

        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
      document.body.style.cursor = "default"
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, isMaximized, minSize.height, minSize.width, position.x, position.y, resizeDirection])

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).dataset?.draggable === "true") {
      e.preventDefault()
      onFocus(id)
      setIsDragging(true)
      dragStartRef.current = { x: e.clientX, y: e.clientY }
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    onFocus(id)
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartRef.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    }
  }

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPreMaximizeState({ position, size })
      setIsMaximized(true)
    } else {
      setPosition(preMaximizeState.position)
      setSize(preMaximizeState.size)
      setIsMaximized(false)
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).dataset?.draggable === "true") {
      toggleMaximize()
    }
  }

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.focus()
    }
  }, [isFocused])

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-2xl overflow-hidden flex flex-col",
        isFocused ? "z-20" : "z-10",
        isMaximized ? "top-6 left-0 right-0 bottom-0 w-full h-[calc(100%-6px)]" : "",
      )}
      style={
        isMaximized
          ? undefined
          : {
              top: `${position.y}px`,
              left: `${position.x}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }
      }
      onClick={() => onFocus(id)}
      tabIndex={0}
    >
      {/* Window Title Bar */}
      <div
        className="z-[1000] h-8 bg-gray-100/80 border-b border-gray-200/50 flex items-center justify-between px-4"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={handleDoubleClick}
        data-draggable="true"
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600" onClick={() => onClose(id)} />
            <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600" onClick={() => onMinimize(id)} />
            <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600" onClick={toggleMaximize} />
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          {title}
        </div>
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Resize Handles (only when not maximized) */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />
        </>
      )}
    </div>
  )
}
