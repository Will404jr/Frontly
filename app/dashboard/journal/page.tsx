"use client";

import { useEffect, useState } from "react";
import { JournalEntry } from "../../../lib/types";
import { EntryDialog } from "./entry-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sidebar } from "./sidebar";
import { EntryContent } from "./entry-content";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/entries");
      if (!response.ok) throw new Error("Failed to fetch entries");
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        id: entry._id,
        createdAt: new Date(entry.createdAt),
        updatedAt: new Date(entry.updatedAt),
      }));

      setEntries(formattedEntries);
      if (formattedEntries.length > 0 && !selectedEntry) {
        setSelectedEntry(formattedEntries[0]);
      }
    } catch (error) {
      console.error("Failed to fetch entries:", error);
      toast({
        title: "Error",
        description: "Failed to load journal entries. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: { title: string; content: string }) => {
    try {
      if (!data.title.trim() || !data.content.trim()) {
        toast({
          title: "Error",
          description: "Title and content are required.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        editingEntry ? `/api/entries/${editingEntry.id}` : "/api/entries",
        {
          method: editingEntry ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to save entry");

      await fetchEntries();
      setIsDialogOpen(false);
      setEditingEntry(undefined);

      toast({
        title: "Success",
        description: `Entry ${
          editingEntry ? "updated" : "created"
        } successfully.`,
      });
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error",
        description: "Failed to save entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete entry");

      if (selectedEntry?.id === id) {
        setSelectedEntry(entries.find((entry) => entry.id !== id) || null);
      }

      await fetchEntries();
      toast({
        title: "Success",
        description: "Entry deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewEntry = () => {
    setEditingEntry(undefined);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex ">
      <main className="flex-1 flex">
        <div className="flex-1 max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Journal</h1>
            <Button onClick={handleNewEntry} className="bg-[#6366f1]">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>

          {selectedEntry ? (
            <EntryContent
              entry={selectedEntry}
              onEdit={() => {
                setEditingEntry(selectedEntry);
                setIsDialogOpen(true);
              }}
              onDelete={() => handleDelete(selectedEntry.id)}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              {entries.length === 0
                ? "No entries yet. Click 'New Entry' to create your first journal entry."
                : "Select an entry from the sidebar to view its content."}
            </div>
          )}
        </div>

        <Sidebar
          entries={entries}
          selectedEntry={selectedEntry}
          onSelectEntry={setSelectedEntry}
        />
      </main>

      <EntryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        entry={editingEntry}
        onSave={handleSave}
      />
    </div>
  );
}
