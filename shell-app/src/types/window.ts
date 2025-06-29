import type React from "react"
export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowState {
  id: string
  appId: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  position: WindowPosition
  size: WindowSize
  minSize: WindowSize
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
  zIndex: number
}

export interface AppConfig {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  category: AppCategory
  defaultSize: WindowSize
  minSize: WindowSize
  defaultPosition: WindowPosition
  component: React.ComponentType<any>
  props?: Record<string, any>
}

export enum AppCategory {
  SYSTEM = "system",
  PRODUCTIVITY = "productivity",
  MEDIA = "media",
  DEVELOPMENT = "development",
  UTILITIES = "utilities",
  GAMES = "games",
}

export enum AppId {
  FINDER = "finder",
  SETTINGS = "settings",
  NOTES = "notes",
  CALCULATOR = "calculator",
  TERMINAL = "terminal",
  SAFARI = "safari",
  MAIL = "mail",
  MESSAGES = "messages",
  MUSIC = "music",
  PHOTOS = "photos",
  CALENDAR = "calendar",
  CONTACTS = "contacts",
  MOVIES = "movies",
  DRIVE = "drive",
}

export interface WindowManagerState {
  windows: WindowState[]
  focusedWindowId: string | null
  nextZIndex: number
}
