"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader } from "lucide-react";
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
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Notes() {
  const { data: session } = useSession(); // Get the user session
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Fetch notes from the server based on the user's email
  const fetchNotes = async () => {
    if (!session?.user?.email) return; // Ensure the user is logged in
    setLoading(true);
    try {
      const response = await fetch(
        `/api/notes/getNotes?email=${session.user.email}`
      );
      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchNotes();
    }
  }, [session?.user?.email]);

  // Create a new note
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !session?.user?.email ||
      title.trim() === "" ||
      description.trim() === ""
    )
      return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes/createNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        await fetchNotes();
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to create note:", await response.json());
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        console.error("Failed to delete note:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Edit a note
  const editNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  // Update a note
  const updateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${editingNote._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        await fetchNotes();
        setEditingNote(null);
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to update note:", await response.json());
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <Card className="mb-8 bg-slate-50">
        <CardHeader>
          <CardTitle>Create a New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addNote} className="space-y-4">
            <Input
              className="bg-white border-none"
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              className="bg-white border-none"
              placeholder="Note description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <Button
              type="submit"
              className="w-full bg-[#03addc] border-none hover:bg-[#03addc]"
              disabled={loading}
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Note
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin h-8 w-8 text-[#03addc]" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No notes found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note._id} className="bg-slate-50">
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{note.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => editNote(note)}
                      className="bg-[#0d6efd] text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
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
                        placeholder="Note description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-[#03addc] hover:bg-[#03addc]"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Update Note"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => deleteNote(note._id)}
                  disabled={deletingId === note._id}
                  className="bg-[#dc3545] text-white"
                >
                  {deletingId === note._id ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
