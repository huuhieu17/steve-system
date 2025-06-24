"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import IOSApp from "../IOSApp"

interface IOSNotesAppProps {
  onClose: () => void
}

export default function IOSNotesApp({ onClose }: IOSNotesAppProps) {
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Notes", content: "Discuss project timeline", date: "Today" },
    { id: 2, title: "Shopping List", content: "Milk, Eggs, Bread", date: "Yesterday" },
    { id: 3, title: "Ideas", content: "New app features", date: "Last week" },
  ])

  const [selectedNote, setSelectedNote] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = searchQuery
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : notes

  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: "Just now",
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote.id)
  }

  if (selectedNote) {
    const note = notes.find((n) => n.id === selectedNote)
    return (
      <IOSApp title={note?.title || "Note"} onClose={() => setSelectedNote(null)}>
        <div className="p-4 h-full">
          <textarea
            className="w-full h-full resize-none border-none focus:outline-none bg-transparent text-lg"
            value={note?.content || ""}
            onChange={(e) => {
              setNotes(notes.map((n) => (n.id === selectedNote ? { ...n, content: e.target.value } : n)))
            }}
            placeholder="Start writing..."
          />
        </div>
      </IOSApp>
    )
  }

  return (
    <IOSApp title="Notes" onClose={onClose}>
      <div className="h-full flex flex-col">
        {/* Search */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes"
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 border-b border-gray-100 active:bg-gray-50"
              onClick={() => setSelectedNote(note.id)}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
                <span className="text-xs text-gray-500 ml-2">{note.date}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{note.content || "No content"}</p>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" onClick={addNewNote}>
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>
    </IOSApp>
  )
}
