"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { Code, AlertCircle } from "lucide-react"

interface ExternalComponentLoaderProps {
  componentPath: string
  props?: Record<string, any>
  fallback?: React.ReactNode
}

export default function ExternalComponentLoader({ componentPath, props = {}, fallback }: ExternalComponentLoaderProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if it's a URL (micro frontend)
        if (componentPath.startsWith("http")) {
          // For micro frontend, we would need to implement module federation
          // or dynamic script loading. For now, show a placeholder.
          setError("Micro frontend loading not implemented yet")
          return
        }

        // Try to dynamically import the component
        const module = await import(componentPath)
        const ImportedComponent = module.default || module[Object.keys(module)[0]]

        if (!ImportedComponent) {
          throw new Error("No component found in module")
        }

        setComponent(() => ImportedComponent)
      } catch (err) {
        console.error("Failed to load component:", err)
        setError(`Failed to load component: ${err instanceof Error ? err.message : "Unknown error"}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadComponent()
  }, [componentPath])

  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading component...</p>
          </div>
        </div>
      )
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Component Load Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-sm text-gray-500">
            <p>Component path: {componentPath}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Component Found</h3>
          <p className="text-gray-600">The specified component could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  )
}
