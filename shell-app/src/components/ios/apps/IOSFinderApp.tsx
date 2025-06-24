"use client"

import { useState } from "react"
import {
  Folder,
  FileText,
  ImageIcon,
  Music,
  Video,
  Search,
  Grid3X3,
  List,
  Download,
  Star,
  Clock,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import IOSApp from "../IOSApp"

interface IOSFinderAppProps {
  onClose: () => void
}

export default function IOSFinderApp({ onClose }: IOSFinderAppProps) {
  const [currentPath, setCurrentPath] = useState("Browse")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const locations = [
    { id: "recent", name: "Recents", icon: Clock, color: "text-blue-500" },
    { id: "favorites", name: "Favorites", icon: Star, color: "text-yellow-500" },
    { id: "icloud", name: "iCloud Drive", icon: Folder, color: "text-blue-500" },
    { id: "downloads", name: "Downloads", icon: Download, color: "text-green-500" },
    { id: "trash", name: "Recently Deleted", icon: Trash2, color: "text-red-500" },
  ]

  const folders = [
    { id: "documents", name: "Documents", icon: Folder, type: "folder", size: "--", modified: "Today" },
    { id: "photos", name: "Photos", icon: Folder, type: "folder", size: "--", modified: "Yesterday" },
    { id: "music", name: "Music", icon: Folder, type: "folder", size: "--", modified: "Last week" },
    { id: "videos", name: "Videos", icon: Folder, type: "folder", size: "--", modified: "Last month" },
  ]

  const files = [
    { id: "project", name: "Project.pdf", icon: FileText, type: "file", size: "2.5 MB", modified: "Today" },
    { id: "screenshot", name: "Screenshot.png", icon: ImageIcon, type: "file", size: "1.2 MB", modified: "Yesterday" },
    { id: "song", name: "Song.mp3", icon: Music, type: "file", size: "4.7 MB", modified: "Last week" },
    { id: "movie", name: "Movie.mp4", icon: Video, type: "file", size: "1.2 GB", modified: "Last month" },
  ]

  const allItems = [...folders, ...files]
  const filteredItems = searchQuery
    ? allItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allItems

  if (selectedFolder) {
    return (
      <IOSApp title={selectedFolder} onClose={() => setSelectedFolder(null)}>
        <div className="p-4">
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Folder is Empty</h3>
            <p className="text-gray-500">This folder doesn't contain any files yet.</p>
          </div>
        </div>
      </IOSApp>
    )
  }

  return (
    <IOSApp title="Files" onClose={onClose} showBackButton={false}>
      <div className="h-full flex flex-col">
        {/* Search */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search files"
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{currentPath}</h2>
          <div className="flex space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {!searchQuery && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Locations</h3>
              <div className="space-y-2 mb-6">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm active:bg-gray-50"
                  >
                    <location.icon className={`w-5 h-5 ${location.color} mr-3`} />
                    <span className="font-medium">{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4">
            {!searchQuery && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Files</h3>}

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm active:bg-gray-50"
                    onClick={() => item.type === "folder" && setSelectedFolder(item.name)}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                        item.type === "folder" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-center">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.modified}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm active:bg-gray-50"
                    onClick={() => item.type === "folder" && setSelectedFolder(item.name)}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        item.type === "folder" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.modified} • {item.size}
                      </div>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </IOSApp>
  )
}
