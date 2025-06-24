"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export interface DynamicApp {
  id: string
  name: string
  type: "iframe" | "component" | "micro-frontend"
  url?: string
  componentPath?: string
  icon: string
  color: string
  width?: number
  height?: number
  allowFullscreen?: boolean
  sandbox?: string
  props?: Record<string, any>
}

interface DynamicAppManagerProps {
  apps: DynamicApp[]
  onAddApp: (app: DynamicApp) => void
  onUpdateApp: (id: string, app: DynamicApp) => void
  onDeleteApp: (id: string) => void
}

export default function DynamicAppManager({ apps, onAddApp, onUpdateApp, onDeleteApp }: DynamicAppManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<DynamicApp | null>(null)
  const [formData, setFormData] = useState<Partial<DynamicApp>>({
    name: "",
    type: "iframe",
    url: "",
    componentPath: "",
    icon: "🌐",
    color: "bg-blue-500",
    width: 800,
    height: 600,
    allowFullscreen: true,
    sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
    props: {},
  })

  const resetForm = () => {
    setFormData({
      name: "",
      type: "iframe",
      url: "",
      componentPath: "",
      icon: "🌐",
      color: "bg-blue-500",
      width: 800,
      height: 600,
      allowFullscreen: true,
      sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
      props: {},
    })
    setEditingApp(null)
  }

  const handleSubmit = () => {
    if (!formData.name) return

    const app: DynamicApp = {
      id: editingApp?.id || `app-${Date.now()}`,
      name: formData.name!,
      type: formData.type!,
      url: formData.url,
      componentPath: formData.componentPath,
      icon: formData.icon!,
      color: formData.color!,
      width: formData.width,
      height: formData.height,
      allowFullscreen: formData.allowFullscreen,
      sandbox: formData.sandbox,
      props: formData.props,
    }

    if (editingApp) {
      onUpdateApp(editingApp.id, app)
    } else {
      onAddApp(app)
    }

    setIsOpen(false)
    resetForm()
  }

  const handleEdit = (app: DynamicApp) => {
    setFormData(app)
    setEditingApp(app)
    setIsOpen(true)
  }

  const predefinedApps = [
    {
      name: "YouTube",
      type: "iframe" as const,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      icon: "📺",
      color: "bg-red-500",
    },
    {
      name: "Google Maps",
      type: "iframe" as const,
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326!2d106.6297!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
      icon: "🗺️",
      color: "bg-green-500",
    },
    {
      name: "CodePen",
      type: "iframe" as const,
      url: "https://codepen.io/pen/",
      icon: "💻",
      color: "bg-gray-800",
    },
    {
      name: "Figma",
      type: "iframe" as const,
      url: "https://www.figma.com/embed",
      icon: "🎨",
      color: "bg-purple-500",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Thêm App Động</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingApp ? "Chỉnh sửa App" : "Thêm App Động"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="form">Tạo Mới</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="manage">Quản Lý</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên App</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên app"
                />
              </div>

              <div>
                <Label htmlFor="type">Loại App</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iframe">Web App (iframe)</SelectItem>
                    <SelectItem value="component">React Component</SelectItem>
                    <SelectItem value="micro-frontend">Micro Frontend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.type === "iframe" && (
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            )}

            {(formData.type === "component" || formData.type === "micro-frontend") && (
              <div>
                <Label htmlFor="componentPath">Component Path</Label>
                <Input
                  id="componentPath"
                  value={formData.componentPath}
                  onChange={(e) => setFormData({ ...formData, componentPath: e.target.value })}
                  placeholder="@/components/MyComponent hoặc https://micro-frontend-url.com"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🌐"
                />
              </div>

              <div>
                <Label htmlFor="color">Màu nền</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                    <SelectItem value="bg-red-500">Red</SelectItem>
                    <SelectItem value="bg-green-500">Green</SelectItem>
                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                    <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                    <SelectItem value="bg-pink-500">Pink</SelectItem>
                    <SelectItem value="bg-gray-800">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="fullscreen"
                  checked={formData.allowFullscreen}
                  onChange={(e) => setFormData({ ...formData, allowFullscreen: e.target.checked })}
                />
                <Label htmlFor="fullscreen">Fullscreen</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Chiều rộng (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: Number.parseInt(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="height">Chiều cao (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            {formData.type === "iframe" && (
              <div>
                <Label htmlFor="sandbox">Sandbox Permissions</Label>
                <Textarea
                  id="sandbox"
                  value={formData.sandbox}
                  onChange={(e) => setFormData({ ...formData, sandbox: e.target.value })}
                  placeholder="allow-scripts allow-same-origin allow-forms"
                  rows={2}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>{editingApp ? "Cập nhật" : "Thêm App"}</Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {predefinedApps.map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center text-white`}>
                      {template.icon}
                    </div>
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{template.url}</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      const app: DynamicApp = {
                        id: `app-${Date.now()}`,
                        ...template,
                        width: 800,
                        height: 600,
                        allowFullscreen: true,
                        sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
                      }
                      onAddApp(app)
                      setIsOpen(false)
                    }}
                  >
                    Thêm App
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <div className="space-y-2">
              {apps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${app.color} rounded-lg flex items-center justify-center text-white`}>
                      {app.icon}
                    </div>
                    <div>
                      <div className="font-medium">{app.name}</div>
                      <div className="text-sm text-gray-500">{app.type}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(app)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDeleteApp(app.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {apps.length === 0 && <div className="text-center py-8 text-gray-500">Chưa có app nào được thêm</div>}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
