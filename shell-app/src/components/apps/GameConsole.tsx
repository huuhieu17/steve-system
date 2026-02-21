"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GAME_LIST } from "@/constants/list-game"
import GameApp from "./GameApp"
import { Gamepad2, Search, ArrowLeft } from "lucide-react"
import type { AppId } from "@/types/window"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GameConsoleProps {
  appId: AppId
}

export default function GameConsole({ appId }: GameConsoleProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Get all game names from GAME_LIST
  const gameNames = useMemo(() => {
    return Object.keys(GAME_LIST).sort()
  }, [])

  // Filter games based on search query
  const filteredGames = useMemo(() => {
    return gameNames.filter((game) =>
      game.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [gameNames, searchQuery])

  // If a game is selected, show the game player
  if (selectedGame) {
    const gameConfig = GAME_LIST[selectedGame as keyof typeof GAME_LIST]
    return (
      <div className="w-full h-full flex flex-col bg-gray-900">
        {/* Header with exit button */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-white" />
            <h2 className="text-white text-lg font-bold">{selectedGame}</h2>
          </div>
          <Button
            onClick={() => {
              setSelectedGame(null)
              setSearchQuery("")
            }}
            variant="outline"
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách game
          </Button>
        </div>

        {/* Game player */}
        <div className="flex-1 overflow-hidden">
          <GameApp gameConfig={gameConfig} appId={appId} />
        </div>
      </div>
    )
  }

  // Show game selection screen
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Gamepad2 className="w-8 h-8 text-white" />
          <h1 className="text-white text-2xl font-bold">Game Console</h1>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Tìm kiếm trò chơi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Games Grid */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredGames.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400 text-lg">Không tìm thấy trò chơi nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGames.map((gameName) => (
                <Button
                  key={gameName}
                  onClick={() => setSelectedGame(gameName)}
                  className="h-auto flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <Gamepad2 className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-center text-sm font-semibold line-clamp-2 whitespace-normal">
                    {gameName}
                  </span>
                  <span className="text-xs text-white/70 mt-1">
                    Click để chơi
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="bg-black/50 border-t border-white/10 p-4 text-center text-gray-400 text-sm">
        {filteredGames.length} games available
      </div>
    </div>
  )
}
