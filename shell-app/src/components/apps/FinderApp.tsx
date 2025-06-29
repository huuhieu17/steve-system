"use client"

import { useState } from "react"
import {
  Folder,
  FileText,
  ImageIcon,
  Music,
  Video,
  Search,
  ChevronRight,
  Grid2X2,
  List,
  SortAsc,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSystem } from "@/contexts/user-context"

interface FinderAppProps {
}

export default function FinderApp({ }: FinderAppProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useSystem();
  const sidebarItems = [
    { name: "Favorites", isHeader: true },
    { name: "AirDrop", icon: <Folder className="w-4 h-4" /> },
    { name: "Recents", icon: <Folder className="w-4 h-4" /> },
    { name: "Applications", icon: <Folder className="w-4 h-4" /> },
    { name: "Desktop", icon: <Folder className="w-4 h-4" /> },
    { name: "Documents", icon: <Folder className="w-4 h-4" /> },
    { name: "Downloads", icon: <Folder className="w-4 h-4" /> },
    { name: "Locations", isHeader: true },
    { name: "iCloud Drive", icon: <Folder className="w-4 h-4" /> },
    { name: `${user && user.username}'s MacBook`, icon: <Folder className="w-4 h-4" /> },
    { name: "Network", icon: <Folder className="w-4 h-4" /> },
  ]

  const files = [
    { name: "Documents", icon: <Folder className="w-6 h-6" />, type: "folder", size: "--", modified: "Today" },
    { name: "Photos", icon: <Folder className="w-6 h-6" />, type: "folder", size: "--", modified: "Yesterday" },
    { name: "Music", icon: <Folder className="w-6 h-6" />, type: "folder", size: "--", modified: "Last week" },
    { name: "Videos", icon: <Folder className="w-6 h-6" />, type: "folder", size: "--", modified: "Last month" },
    { name: "Project.pdf", icon: <FileText className="w-6 h-6" />, type: "file", size: "2.5 MB", modified: "Today" },
    {
      name: "Screenshot.png",
      icon: <ImageIcon className="w-6 h-6" />,
      type: "file",
      size: "1.2 MB",
      modified: "Yesterday",
    },
    { name: "Song.mp3", icon: <Music className="w-6 h-6" />, type: "file", size: "4.7 MB", modified: "Last week" },
    { name: "Movie.mp4", icon: <Video className="w-6 h-6" />, type: "file", size: "1.2 GB", modified: "Last month" },
    {
      name: "Presentation.pptx",
      icon: <FileText className="w-6 h-6" />,
      type: "file",
      size: "5.8 MB",
      modified: "Today",
    },
    {
      name: "Design.sketch",
      icon: <ImageIcon className="w-6 h-6" />,
      type: "file",
      size: "8.3 MB",
      modified: "Yesterday",
    },
    { name: "Code", icon: <Folder className="w-6 h-6" />, type: "folder", size: "--", modified: "Last week" },
    {
      name: "Archive.zip",
      icon: <FileText className="w-6 h-6" />,
      type: "file",
      size: "45.2 MB",
      modified: "Last month",
    },
  ]

  const filteredFiles = searchQuery
    ? files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : files

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50/80 border-r border-gray-200/50 p-2">
        <div className="space-y-1">
          {sidebarItems.map((item, index) =>
            item.isHeader ? (
              <div key={index} className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1 mt-2">
                {item.name}
              </div>
            ) : (
              <button
                key={index}
                className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 rounded"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ),
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-10 border-b border-gray-200/50 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">Home</div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <SortAsc className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Sắp xếp theo tên</DropdownMenuItem>
                <DropdownMenuItem>Sắp xếp theo ngày</DropdownMenuItem>
                <DropdownMenuItem>Sắp xếp theo kích thước</DropdownMenuItem>
                <DropdownMenuItem>Sắp xếp theo loại</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-gray-200/50">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm"
              className="pl-8 h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Files */}
        <div className="flex-1 p-4 overflow-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-6 gap-4">
              {filteredFiles.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                      item.type === "folder" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 group-hover:text-blue-600">{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-2 px-2 py-1 text-xs font-medium text-gray-500 border-b border-gray-200">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-4">Date Modified</div>
              </div>
              {filteredFiles.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 px-2 py-1 text-sm hover:bg-blue-50 rounded cursor-pointer"
                >
                  <div className="col-span-6 flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <div className="col-span-2 text-gray-600">{item.size}</div>
                  <div className="col-span-4 text-gray-600">{item.modified}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
