"use client";

import { format } from "date-fns";
import { JournalEntry } from "../../../lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  entries: JournalEntry[];
  selectedEntry: JournalEntry | null;
  onSelectEntry: (entry: JournalEntry) => void;
}

export function Sidebar({
  entries,
  selectedEntry,
  onSelectEntry,
}: SidebarProps) {
  return (
    <div className="w-[250px] border-l bg-white">
      <ScrollArea className="h-screen">
        <div className="p-4">
          <h2 className="font-semibold text-gray-500 mb-4">Journal Entries</h2>
          <div className="space-y-2">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors",
                  "hover:bg-gray-100",
                  selectedEntry?.id === entry.id && "bg-gray-100"
                )}
              >
                <h3 className="font-medium text-gray-900 truncate">
                  {entry.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(entry.updatedAt, "PPP")}
                </p>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
