"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Note {
  _id: string;
  title: string;
}

export default function NotesDisplay() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notes from the server
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notes/getNotes");
      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-50">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center">No notes available.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <Card key={note._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{note.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
