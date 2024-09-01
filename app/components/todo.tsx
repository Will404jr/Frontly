"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Component() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    const newNote: Note = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addNote} className="space-y-4">
            <Input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Note
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => editNote(note)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={updateNote} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Note title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Note content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                    />
                    <Button type="submit" className="w-full">
                      Update Note
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => deleteNote(note.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
