"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the structure of a sticky note object
interface StickyNote {
  _id: string;
  email: string;
  content: string;
  color: string;
  tags: string[];
  createdAt: string;
}

export default function NotesDisplay() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  // Fetch notes from the server and extract tags
  const fetchNotesAndExtractTags = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stickynotes");
      const data = await response.json();

      // Assuming data is an array of sticky notes
      const fetchedNotes: StickyNote[] = data; // Explicitly typing data as StickyNote[]

      setNotes(fetchedNotes);

      // Extract all tags from all notes and remove duplicates
      const allTags = fetchedNotes.flatMap((note) => note.tags);
      const uniqueTags = Array.from(new Set(allTags)); // Remove duplicate tags
      setTags(uniqueTags);
    } catch (error) {
      console.error("Failed to fetch notes or tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotesAndExtractTags();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-50 text-black">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : tags?.length === 0 ? (
        <p className="text-center">No tags available.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-blue-200 text-black p-2 rounded">
              {tag}
            </Badge>
          ))}
        </ul>
      )}
    </div>
  );
}
