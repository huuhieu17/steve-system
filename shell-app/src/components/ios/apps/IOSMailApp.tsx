"use client"

import { useState } from "react"
import { Search, Edit, Archive, Trash2, Reply, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import IOSApp from "../IOSApp"

interface IOSMailAppProps {
  onClose: () => void
}

export default function IOSMailApp({ onClose }: IOSMailAppProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const emails = [
    {
      id: "1",
      sender: "Apple",
      subject: "Your App Store receipt",
      preview: "Thank you for your purchase. Here's your receipt for...",
      time: "9:41 AM",
      isRead: false,
      isStarred: false,
    },
    {
      id: "2",
      sender: "GitHub",
      subject: "Security alert: New sign-in",
      preview: "We noticed a new sign-in to your account from...",
      time: "8:30 AM",
      isRead: true,
      isStarred: true,
    },
    {
      id: "3",
      sender: "Marcos Team",
      subject: "Project Update",
      preview: "The latest updates on the macOS interface project...",
      time: "Yesterday",
      isRead: true,
      isStarred: false,
    },
    {
      id: "4",
      sender: "Newsletter",
      subject: "Weekly Tech News",
      preview: "This week's top stories in technology and development...",
      time: "Yesterday",
      isRead: false,
      isStarred: false,
    },
  ]

  const filteredEmails = searchQuery
    ? emails.filter(
        (email) =>
          email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.subject.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : emails

  if (selectedEmail) {
    const email = emails.find((e) => e.id === selectedEmail)
    return (
      <IOSApp title={email?.sender || "Email"} onClose={() => setSelectedEmail(null)}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-1">{email?.subject}</h2>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>From: {email?.sender}</span>
              <span>{email?.time}</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <div className="prose max-w-none">
              <p>Dear User,</p>
              <p>{email?.preview}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                Best regards,
                <br />
                {email?.sender}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-center space-x-8">
              <Button variant="ghost" size="icon">
                <Archive className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Reply className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </IOSApp>
    )
  }

  return (
    <IOSApp title="Mail" onClose={onClose} showBackButton={false}>
      <div className="h-full flex flex-col">
        {/* Search */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search emails"
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-auto">
          {filteredEmails.map((email) => (
            <button
              key={email.id}
              className="w-full p-4 border-b border-gray-100 text-left active:bg-gray-50"
              onClick={() => setSelectedEmail(email.id)}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${!email.isRead ? "text-blue-600" : "text-gray-900"}`}>
                    {email.sender}
                  </span>
                  {email.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>
                <span className="text-sm text-gray-500">{email.time}</span>
              </div>
              <div className={`font-medium mb-1 ${!email.isRead ? "text-gray-900" : "text-gray-600"}`}>
                {email.subject}
              </div>
              <div className="text-sm text-gray-500 truncate">{email.preview}</div>
              {!email.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
            </button>
          ))}
        </div>

        {/* Compose Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Edit className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </IOSApp>
  )
}
