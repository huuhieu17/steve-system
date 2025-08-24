"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Share,
  Bookmark,
  Plus,
  X,
  Search,
  Shield,
  Download,
  MoreHorizontal,
  CircleX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWindowManager } from "@/hooks/useWindowManager"

interface SafariTab {
  id: string
  title: string
  url: string
  favicon?: string
  isLoading: boolean
  canGoBack: boolean
  canGoForward: boolean
}

interface SafariAppProps {
  onClose?: () => void
  isMobile?: boolean
}

export default function SafariAppOptimized({ onClose, isMobile = false }: SafariAppProps) {

  const windowManager = useWindowManager();

  const [tabs, setTabs] = useState<SafariTab[]>([
    {
      id: "tab-1",
      title: "New Tab",
      url: "about:blank",
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    },
  ])
  const [activeTabId, setActiveTabId] = useState("tab-1")
  const [addressBarValue, setAddressBarValue] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  // Persistent iframe refs for each tab
  const tabRefs = useRef<Record<string, HTMLIFrameElement | null>>({})
  const tabContainers = useRef<Record<string, HTMLDivElement | null>>({})

  const bookmarks = [
    { name: "Apple", url: "https://www.apple.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
    { name: "MDN", url: "https://developer.mozilla.org" },
    { name: "Vercel", url: "https://vercel.com" },
  ]

  const quickLinks = [
    { name: "Google", url: "https://www.google.com", color: "bg-blue-500" },
    { name: "YouTube", url: "https://www.youtube.com", color: "bg-red-500" },
    { name: "Twitter", url: "https://twitter.com", color: "bg-blue-400" },
    { name: "Reddit", url: "https://www.reddit.com", color: "bg-orange-500" },
    { name: "Wikipedia", url: "https://www.wikipedia.org", color: "bg-gray-600" },
    { name: "CodePen", url: "https://codepen.io", color: "bg-gray-800" },
  ]

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  useEffect(() => {
    if (activeTab) {
      setAddressBarValue(activeTab.url === "about:blank" ? "" : activeTab.url)
    }
  }, [activeTab])

  const createNewTab = useCallback((url = "about:blank") => {
    const newTab: SafariTab = {
      id: `tab-${Date.now()}`,
      title: "New Tab",
      url,
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    }
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
  }, [])

  const closeTab = useCallback(
    (tabId: string) => {
      if (tabs.length === 1) {
        onClose?.()
        return
      }

      // Clean up refs
      delete tabRefs.current[tabId]
      delete tabContainers.current[tabId]

      const newTabs = tabs.filter((tab) => tab.id !== tabId)
      setTabs(newTabs)

      if (activeTabId === tabId) {
        setActiveTabId(newTabs[newTabs.length - 1].id)
      }
    },
    [tabs, activeTabId, onClose],
  )

  const navigateToUrl = useCallback(
    (url: string) => {
      if (!url.trim()) return

      let finalUrl = url
      if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("about:")) {
        if (url.includes(".") && !url.includes(" ")) {
          finalUrl = `https://${url}`
        } else {
          finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`
        }
      }

      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId ? { ...tab, url: finalUrl, isLoading: true, title: "Loading..." } : tab,
        ),
      )

      // Update iframe src directly to avoid re-creation
      const iframe = tabRefs.current[activeTabId]
      if (iframe) {
        iframe.src = finalUrl
      }
    },
    [activeTabId],
  )

  const handleAddressBarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigateToUrl(addressBarValue)
  }

  const handleIframeLoad = useCallback((tabId: string) => {
    const iframe = tabRefs.current[tabId]
    if (iframe) {
      try {
        const url = iframe.src
        const title = new URL(url).hostname || "Untitled"

        setTabs((prev) => prev.map((tab) => (tab.id === tabId ? { ...tab, isLoading: false, title } : tab)))
      } catch (error) {
        setTabs((prev) => prev.map((tab) => (tab.id === tabId ? { ...tab, isLoading: false, title: "Untitled" } : tab)))
      }
    }
  }, [])

  const refreshPage = useCallback(() => {
    const iframe = tabRefs.current[activeTabId]
    if (iframe && activeTab?.url !== "about:blank") {
      setTabs((prev) => prev.map((tab) => (tab.id === activeTabId ? { ...tab, isLoading: true } : tab)))
      iframe.src = iframe.src
    }
  }, [activeTabId, activeTab])

  const goHome = useCallback(() => {
    navigateToUrl("about:blank")
  }, [navigateToUrl])

  const goBack = useCallback(() => {
    const iframe = tabRefs.current[activeTabId]
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.history.back()
    }
  }, [activeTabId])

  const goForward = useCallback(() => {
    const iframe = tabRefs.current[activeTabId]
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.history.forward()
    }
  }, [activeTabId])

  const closeSafari = () => {
    windowManager.setCurrentIOSApp(null);
  }

  if (isMobile) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Compact Mobile Safari Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 pt-4">
          {/* Compact navigation row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={!activeTab?.canGoBack}
                onClick={goBack}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!activeTab?.canGoForward}
                onClick={goForward}
                className="h-8 w-8 p-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={refreshPage} className="h-8 w-8 p-0">
                <RefreshCw className={`w-4 h-4 ${activeTab?.isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => createNewTab()} className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => closeSafari()} className="h-8 w-8 p-0">
                <CircleX className="w-4 h-4"  />
              </Button>
            </div>
          </div>

          {/* Compact address bar */}
          <form onSubmit={handleAddressBarSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={addressBarValue}
                onChange={(e) => setAddressBarValue(e.target.value)}
                placeholder="Search or enter website"
                className="pl-10 pr-16 bg-white rounded-full h-9 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-3 rounded-full text-xs"
              >
                Go
              </Button>
            </div>
          </form>

          {/* Tab indicators for mobile */}
          {tabs.length > 1 && (
            <div className="flex items-center justify-center mt-2 space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`w-2 h-2 rounded-full ${tab.id === activeTabId ? "bg-blue-500" : "bg-gray-300"}`}
                  onClick={() => setActiveTabId(tab.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content with persistent tabs */}
        <div className="flex-1 relative">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              ref={(el) => {
                tabContainers.current[tab.id] = el
              }}
              className={`absolute inset-0 ${tab.id === activeTabId ? "block" : "hidden"}`}
            >
              {tab.url === "about:blank" ? (
                <div className="h-full bg-gray-50 p-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Safari</h2>
                    <p className="text-gray-600 text-sm">Start browsing the web</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold mb-2">Bookmarks</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {bookmarks.slice(0, 4).map((bookmark) => (
                          <button
                            key={bookmark.name}
                            className="p-2 bg-white rounded-lg shadow-sm text-left active:bg-gray-50"
                            onClick={() => navigateToUrl(bookmark.url)}
                          >
                            <div className="font-medium text-sm">{bookmark.name}</div>
                            <div className="text-xs text-gray-500 truncate">{bookmark.url}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-2">Quick Links</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {quickLinks.slice(0, 6).map((link) => (
                          <button
                            key={link.name}
                            className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm active:bg-gray-50"
                            onClick={() => navigateToUrl(link.url)}
                          >
                            <div className={`w-8 h-8 ${link.color} rounded-lg mb-1`}></div>
                            <span className="text-xs font-medium">{link.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  ref={(el) => {
                    tabRefs.current[tab.id] = el
                  }}
                  src={tab.url}
                  className="w-full h-full border-0"
                  onLoad={() => handleIframeLoad(tab.id)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
                  title={`Safari - ${tab.title}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Compact Mobile Bottom Bar */}
        <div className="bg-gray-50 border-t border-gray-200 p-1">
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Desktop Safari remains the same but with persistent tabs
  return (
    <div className="h-full flex flex-col">
      {/* Desktop Safari Toolbar */}
      <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4">
        <div className="flex items-center space-x-2 mr-4">
          <Button variant="ghost" size="sm" disabled={!activeTab?.canGoBack} onClick={goBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" disabled={!activeTab?.canGoForward} onClick={goForward}>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={refreshPage}>
            <RefreshCw className={`w-4 h-4 ${activeTab?.isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={goHome}>
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleAddressBarSubmit} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={addressBarValue}
              onChange={(e) => setAddressBarValue(e.target.value)}
              placeholder="Search or enter website name"
              className="pl-10 pr-4 bg-white rounded-lg"
            />
          </div>
        </form>

        <div className="flex items-center space-x-2 ml-4">
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsPrivate(!isPrivate)}>
                {isPrivate ? "Exit Private Browsing" : "New Private Window"}
              </DropdownMenuItem>
              <DropdownMenuItem>Bookmarks</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-2">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center px-3 py-2 max-w-xs cursor-pointer border-r border-gray-200 ${
                tab.id === activeTabId ? "bg-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <div className="flex-1 truncate">
                <span className="text-sm">{tab.title}</span>
              </div>
              {tabs.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-5 w-5 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" className="ml-2" onClick={() => createNewTab()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content with persistent tabs */}
      <div className="flex-1 relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            ref={(el) => {
              tabContainers.current[tab.id] = el
            }}
            className={`absolute inset-0 ${tab.id === activeTabId ? "block" : "hidden"}`}
          >
            {tab.url === "about:blank" ? (
              <div className="h-full bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Safari</h2>
                    <p className="text-gray-600">Start browsing the web</p>
                  </div>

                  <Tabs defaultValue="bookmarks" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                      <TabsTrigger value="reading-list">Reading List</TabsTrigger>
                    </TabsList>

                    <TabsContent value="bookmarks" className="mt-6">
                      <div className="grid grid-cols-4 gap-4">
                        {quickLinks.map((link) => (
                          <button
                            key={link.name}
                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            onClick={() => navigateToUrl(link.url)}
                          >
                            <div className={`w-12 h-12 ${link.color} rounded-lg mb-3`}></div>
                            <span className="font-medium">{link.name}</span>
                            <span className="text-sm text-gray-500 truncate w-full">{link.url}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Bookmarks</h3>
                        <div className="space-y-2">
                          {bookmarks.map((bookmark) => (
                            <button
                              key={bookmark.name}
                              className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
                              onClick={() => navigateToUrl(bookmark.url)}
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                              <div>
                                <div className="font-medium">{bookmark.name}</div>
                                <div className="text-sm text-gray-500">{bookmark.url}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📚</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No History</h3>
                        <p className="text-gray-500">Your browsing history will appear here.</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="reading-list" className="mt-6">
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📖</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reading List Items</h3>
                        <p className="text-gray-500">Save articles to read later.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <iframe
                ref={(el) => {
                  tabRefs.current[tab.id] = el
                }}
                src={tab.url}
                className="w-full h-full border-0"
                onLoad={() => handleIframeLoad(tab.id)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
                title={`Safari - ${tab.title}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
