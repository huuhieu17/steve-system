"use client"

import { useState } from "react"
import { FileText, Plus, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotesApp() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Notes", content: "Discuss project timeline and deliverables", date: "Today" },
    { id: 2, title: "Shopping List", content: "Milk, Eggs, Bread, Fruits", date: "Yesterday" },
    { id: 3, title: "Ideas", content: "New app features to implement", date: "Last week" },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

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
    setSelectedNoteId(newNote.id)
  }

  const updateNoteContent = (content: string) => {
    setNotes(notes.map((note) => (note.id === selectedNoteId ? { ...note, content } : note)))
  }

  const updateNoteTitle = (title: string) => {
    setNotes(notes.map((note) => (note.id === selectedNoteId ? { ...note, title } : note)))
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNoteId === id) {
      setSelectedNoteId(notes[0]?.id || 0)
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50/80 border-r border-gray-200/50 flex flex-col">
        <div className="p-2 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium">Notes</h2>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={addNewNote}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes"
              className="pl-8 h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-3 border-b border-gray-200/50 cursor-pointer ${
                selectedNoteId === note.id ? "bg-blue-50" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="flex justify-between items-start">
                <div className="font-medium truncate">{note.title}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 truncate">{note.content || "No content"}</div>
              <div className="text-xs text-gray-400 mt-1">{note.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-gray-200/50">
              <Input
                type="text"
                className="text-lg font-medium border-none p-0 focus-visible:ring-0"
                value={selectedNote.title}
                onChange={(e) => updateNoteTitle(e.target.value)}
                placeholder="Note Title"
              />
              <div className="text-xs text-gray-400 mt-1">{selectedNote.date}</div>
            </div>
            <div className="flex-1 p-4">
              <textarea
                className="w-full h-full resize-none border-none focus:outline-none bg-transparent"
                value={selectedNote.content}
                onChange={(e) => updateNoteContent(e.target.value)}
                placeholder="Start writing..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p>No note selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
