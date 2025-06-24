"use client"

import { useState } from "react"
import { ImageIcon, Video, Heart, Share, Trash2, Grid3X3, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import IOSApp from "../IOSApp"

interface IOSPhotosAppProps {
  onClose: () => void
}

export default function IOSPhotosApp({ onClose }: IOSPhotosAppProps) {
  const [selectedTab, setSelectedTab] = useState("library")
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const photos = Array.from({ length: 20 }, (_, i) => ({
    id: `photo-${i}`,
    type: i % 5 === 0 ? "video" : "photo",
    thumbnail: `/placeholder.svg?height=200&width=200&text=Photo${i + 1}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }))

  const albums = [
    { name: "Recents", count: 20, thumbnail: photos[0].thumbnail },
    { name: "Favorites", count: 5, thumbnail: photos[1].thumbnail },
    { name: "Screenshots", count: 8, thumbnail: photos[2].thumbnail },
    { name: "Videos", count: 4, thumbnail: photos[3].thumbnail },
  ]

  if (selectedPhoto) {
    const photo = photos.find((p) => p.id === selectedPhoto)
    return (
      <IOSApp title="" onClose={() => setSelectedPhoto(null)} showBackButton={false}>
        <div className="h-full bg-black flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={photo?.thumbnail || "/placeholder.svg"}
              alt="Photo"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="p-4 bg-black/50 backdrop-blur-md">
            <div className="flex justify-center space-x-8">
              <Button variant="ghost" size="icon" className="text-white">
                <Share className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Heart className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Trash2 className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </IOSApp>
    )
  }

  return (
    <IOSApp title="Photos" onClose={onClose} showBackButton={false}>
      <div className="h-full flex flex-col">
        {/* Tab Bar */}
        <div className="flex bg-gray-50 border-b border-gray-200">
          {[
            { id: "library", name: "Library", icon: Grid3X3 },
            { id: "albums", name: "Albums", icon: ImageIcon },
            { id: "search", name: "Search", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex flex-col items-center py-3 ${
                selectedTab === tab.id ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {selectedTab === "library" && (
            <div className="p-2">
              <div className="grid grid-cols-3 gap-1">
                {photos.map((photo) => (
                  <button key={photo.id} className="aspect-square relative" onClick={() => setSelectedPhoto(photo.id)}>
                    <img
                      src={photo.thumbnail || "/placeholder.svg"}
                      alt="Photo"
                      className="w-full h-full object-cover rounded"
                    />
                    {photo.type === "video" && (
                      <div className="absolute bottom-1 right-1">
                        <Video className="w-4 h-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "albums" && (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">My Albums</h3>
                <div className="grid grid-cols-2 gap-4">
                  {albums.map((album) => (
                    <div key={album.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img
                        src={album.thumbnail || "/placeholder.svg"}
                        alt={album.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <div className="font-medium">{album.name}</div>
                        <div className="text-sm text-gray-500">{album.count} items</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "search" && (
            <div className="p-4 text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Search Photos</h3>
              <p className="text-gray-500">Search your photos by date, location, or content.</p>
            </div>
          )}
        </div>
      </div>
    </IOSApp>
  )
}
