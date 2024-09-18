"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Note {
  _id: string;
  content: string;
  color: string;
  tags: string[];
}

const COLORS = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-red-200",
  "bg-purple-200",
  "bg-pink-200",
];

export default function OrganizedFlexibleStickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteTags, setNewNoteTags] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const textAreaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {}
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/stickynotes");
      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const addNote = async () => {
    if (newNoteContent.trim() !== "") {
      const newNote = {
        content: newNoteContent,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        tags: newNoteTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      try {
        const response = await fetch("/api/stickynotes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });
        const result = await response.json();
        setNotes([...notes, { ...newNote, _id: result.noteId }]);
        setNewNoteContent("");
        setNewNoteTags("");
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to add note:", error);
      }
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch(`/api/stickynotes/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const updateNote = async (id: string, newContent: string) => {
    try {
      const updatedNote = {
        content: newContent,
      };
      await fetch(`/api/stickynotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, content: newContent } : note
        )
      );
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const adjustTextareaHeight = (id: string) => {
    const textarea = textAreaRefs.current[id];
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    notes.forEach((note) => adjustTextareaHeight(note._id));
  }, [notes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Organized Flexible Sticky Notes
      </h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="note-content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note Content
                </label>
                <textarea
                  id="note-content"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Enter your note"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                />
              </div>
              <div>
                <label
                  htmlFor="note-tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags (comma-separated)
                </label>
                <Input
                  id="note-tags"
                  type="text"
                  value={newNoteTags}
                  onChange={(e) => setNewNoteTags(e.target.value)}
                  placeholder="Enter tags, separated by commas"
                  className="mt-1"
                />
              </div>
              <Button onClick={addNote}>Add Note</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className={`${note.color} p-4 rounded-lg shadow-md relative flex flex-col mb-4 break-inside-avoid`}
          >
            <textarea
              ref={(el) => {
                textAreaRefs.current[note._id] = el;
              }}
              value={note.content}
              onChange={(e) => {
                updateNote(note._id, e.target.value);
                adjustTextareaHeight(note._id);
              }}
              className="w-full bg-transparent resize-none focus:outline-none mb-2 flex-grow"
              style={{ minHeight: "80px", overflow: "hidden" }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {note.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => deleteNote(note._id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
