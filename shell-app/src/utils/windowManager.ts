import React from "react"
import type { WindowState, WindowManagerState, AppConfig, WindowPosition, WindowSize } from "@/types/window"
import { APP_CONFIGS } from "@/constants/list-app"

export class WindowManager {
  private state: WindowManagerState = {
    windows: [],
    focusedWindowId: null,
    nextZIndex: 10,
  }

  private listeners: Array<(state: WindowManagerState) => void> = []

  constructor() {
    this.state = {
      windows: [],
      focusedWindowId: null,
      nextZIndex: 10,
    }
  }

  // Subscribe to state changes
  subscribe(listener: (state: WindowManagerState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  // Get current state
  getState(): WindowManagerState {
    return { ...this.state }
  }

  // Open a new window
  openWindow(appId: string, customProps?: Record<string, any>, dynamicConfig?: any): string {
    const appConfig = dynamicConfig ?? APP_CONFIGS[appId as keyof typeof APP_CONFIGS];
    if (!appConfig) {
      throw new Error(`App config not found for ${appId}`)
    }

    // Check if window already exists and is minimized
    const existingWindow = this.state.windows.find((w) => w.appId === appId && w.isMinimized)
    if (existingWindow) {
      this.restoreWindow(existingWindow.id)
      return existingWindow.id
    }

    // Check if window is already open and focused
    const openWindow = this.state.windows.find((w) => w.appId === appId && !w.isMinimized)
    if (openWindow) {
      this.focusWindow(openWindow.id)
      return openWindow.id
    }

    // Create new window
    const windowId = `${appId}-${Date.now()}`
    const position = this.calculateWindowPosition(appConfig.defaultPosition)

    const newWindow: WindowState = {
      id: windowId,
      appId,
      title: appConfig.name,
      icon: appConfig.icon,
      content: React.createElement(appConfig.component, {
        ...appConfig.props,
        ...customProps,
      }),
      position,
      size: { ...appConfig.defaultSize },
      minSize: { ...appConfig.minSize },
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      zIndex: this.state.nextZIndex,
    }

    this.state = {
      ...this.state,
      windows: [...this.state.windows, newWindow],
      focusedWindowId: windowId,
      nextZIndex: this.state.nextZIndex + 1,
    }

    this.notify()
    return windowId
  }

  // Close window
  closeWindow(windowId: string) {
    this.state = {
      ...this.state,
      windows: this.state.windows.filter((w) => w.id !== windowId),
      focusedWindowId:
        this.state.focusedWindowId === windowId ? this.getTopVisibleWindow()?.id || null : this.state.focusedWindowId,
    }
    this.notify()
  }

  // Minimize window
  minimizeWindow(windowId: string) {
    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) => (w.id === windowId ? { ...w, isMinimized: true, isFocused: false } : w)),
      focusedWindowId:
        this.state.focusedWindowId === windowId ? this.getTopVisibleWindow()?.id || null : this.state.focusedWindowId,
    }
    this.notify()
  }

  // Restore window
  restoreWindow(windowId: string) {
    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) =>
        w.id === windowId
          ? { ...w, isMinimized: false, isFocused: true, zIndex: this.state.nextZIndex }
          : { ...w, isFocused: false },
      ),
      focusedWindowId: windowId,
      nextZIndex: this.state.nextZIndex + 1,
    }
    this.notify()
  }

  // Focus window
  focusWindow(windowId: string) {
    const window = this.state.windows.find((w) => w.id === windowId)
    if (!window || window.isMinimized) return

    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) =>
        w.id === windowId ? { ...w, isFocused: true, zIndex: this.state.nextZIndex } : { ...w, isFocused: false },
      ),
      focusedWindowId: windowId,
      nextZIndex: this.state.nextZIndex + 1,
    }
    this.notify()
  }

  // Update window position
  updateWindowPosition(windowId: string, position: WindowPosition) {
    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) => (w.id === windowId ? { ...w, position } : w)),
    }
    this.notify()
  }

  // Update window size
  updateWindowSize(windowId: string, size: WindowSize) {
    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) => (w.id === windowId ? { ...w, size } : w)),
    }
    this.notify()
  }

  // Toggle maximize window
  toggleMaximizeWindow(windowId: string) {
    this.state = {
      ...this.state,
      windows: this.state.windows.map((w) => (w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w)),
    }
    this.notify()
  }

  // Get windows by app
  getWindowsByApp(appId: string): WindowState[] {
    return this.state.windows.filter((w) => w.appId === appId)
  }

  // Get visible windows
  getVisibleWindows(): WindowState[] {
    return this.state.windows.filter((w) => !w.isMinimized)
  }

  // Get top visible window
  private getTopVisibleWindow(): WindowState | undefined {
    const visibleWindows = this.getVisibleWindows()
    return visibleWindows.reduce(
      (top, current) => {
        return !top || current.zIndex > top.zIndex ? current : top
      },
      undefined as WindowState | undefined,
    )
  }

  // Calculate window position to avoid overlap
  private calculateWindowPosition(defaultPosition: WindowPosition): WindowPosition {
    const existingWindows = this.getVisibleWindows()
    const position = { ...defaultPosition }

    // Simple cascade positioning
    const cascade = existingWindows.length * 30
    position.x += cascade
    position.y += cascade

    // Keep window on screen
    const maxX = window.innerWidth - 400 // Minimum window width
    const maxY = window.innerHeight - 300 // Minimum window height

    if (position.x > maxX) position.x = 50
    if (position.y > maxY) position.y = 50

    return position
  }

  // Get app config
  getAppConfig(appId: string): AppConfig | undefined {
    return APP_CONFIGS[appId as keyof typeof APP_CONFIGS]
  }

  // Check if app is open
  isAppOpen(appId: string): boolean {
    return this.state.windows.some((w) => w.appId === appId && !w.isMinimized)
  }

  // Get all apps that are open
  getOpenApps(): string[] {
    return [...new Set(this.state.windows.filter((w) => !w.isMinimized).map((w) => w.appId))]
  }
}

// Singleton instance
export const windowManager = new WindowManager()
