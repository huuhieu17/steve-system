"use client"

import { useState, useEffect } from "react"

import type { WindowManagerState } from "@/types/window"
import { windowManager } from "@/utils/windowManager"

export function useWindowManager() {
  const [state, setState] = useState<WindowManagerState>(windowManager.getState())

  useEffect(() => {
    const unsubscribe = windowManager.subscribe(setState)
    return unsubscribe
  }, [])

  return {
    ...state,
    openWindow: windowManager.openWindow.bind(windowManager),
    closeWindow: windowManager.closeWindow.bind(windowManager),
    minimizeWindow: windowManager.minimizeWindow.bind(windowManager),
    restoreWindow: windowManager.restoreWindow.bind(windowManager),
    focusWindow: windowManager.focusWindow.bind(windowManager),
    updateWindowPosition: windowManager.updateWindowPosition.bind(windowManager),
    updateWindowSize: windowManager.updateWindowSize.bind(windowManager),
    toggleMaximizeWindow: windowManager.toggleMaximizeWindow.bind(windowManager),
    getAppConfig: windowManager.getAppConfig.bind(windowManager),
    isAppOpen: windowManager.isAppOpen.bind(windowManager),
    getOpenApps: windowManager.getOpenApps.bind(windowManager),
  }
}
