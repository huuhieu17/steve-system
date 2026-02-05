"use client"

import { Button } from "@/components/ui/button"
import { Code, ExternalLink, Globe, Maximize, Minimize, RefreshCw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { DynamicApp } from "./DynamicAppManager"

interface DynamicWebAppProps {
  app: DynamicApp
  onClose?: () => void
}

export default function DynamicWebApp({ app, onClose }: DynamicWebAppProps) {

  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isLoading])

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true)
      setError(null)
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const handleOpenExternal = () => {
    if (app.url) {
      window.open(app.url, "_blank")
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError("Không thể tải ứng dụng. Vui lòng kiểm tra URL hoặc kết nối mạng.")
  }

  if (app.type === "component") {
    return (
      <div className="h-full flex flex-col">
        <div className="h-10 bg-gray-100 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 ${app.color} rounded`}></div>
            <span className="text-sm font-medium">{app.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">React Component</h3>
            <p className="text-gray-500 mb-4">Component path: {app.componentPath}</p>
            <p className="text-sm text-gray-400">
              Tính năng import dynamic component sẽ được phát triển trong phiên bản tiếp theo.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (app.type === "micro-frontend") {
    return (
      <div className="h-full flex flex-col">
        <div className="h-10 bg-gray-100 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 ${app.color} rounded`}></div>
            <span className="text-sm font-medium">{app.name}</span>
          </div>
          <div className="flex items-center space-x-1">
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Micro Frontend</h3>
            <p className="text-gray-500 mb-4">URL: {app.componentPath}</p>
            <p className="text-sm text-gray-400">
              Tính năng micro frontend sẽ được phát triển trong phiên bản tiếp theo.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (app.type === "link" && app.url) {
    window.open(app.url, "_blank");
    if(onClose){
      onClose();
    }
  }

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      {/* Toolbar */}
      <div className="h-10 bg-gray-100 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 ${app.color} rounded`}></div>
          <span className="text-sm font-medium">{app.name}</span>
          {/* {app.url && <span className="text-xs text-gray-500 truncate max-w-xs">{app.url}</span>} */}
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleOpenExternal}>
            <ExternalLink className="w-4 h-4" />
          </Button>
          {app.allowFullscreen && (
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải {app.name}...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center p-8">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Lỗi tải ứng dụng</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={handleRefresh}>Thử lại</Button>
            </div>
          </div>
        )}

        {app.url && (
          <iframe
            ref={iframeRef}
            src={app.url}
            className="w-full h-full border-0"
            sandbox={app.sandbox}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={app.name}
            allow="fullscreen"
          />
        )}
      </div>
    </div>
  )
}
