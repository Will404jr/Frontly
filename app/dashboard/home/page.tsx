"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import News from "../../components/news";
import Finance from "../../components/finance";
import NotesDisplay from "../../components/notesDisplay";

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true); // Start loading
      try {
        const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        const response = await fetch(`/api/todos?date=${today}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-50 mt-5 text-black">
        <CardHeader>
          <CardTitle>News Feed</CardTitle>
          <CardDescription>
            Stay up-to-date with the latest news
          </CardDescription>
        </CardHeader>
        <CardContent>
          <News />
        </CardContent>
      </Card>

      <Link href="/dashboard/financeTracker">
        <Card className="bg-slate-50 overflow-y-auto h-42 mb-5 text-black">
          <CardHeader>
            <CardTitle>Finance</CardTitle>
            <CardDescription>
              Overview of your personal finances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Finance />
          </CardContent>
        </Card>
      </Link>

      {/* Wrap the Card with Link for To-Do navigation */}
      <Link href="/dashboard/todo">
        <Card className="bg-slate-50 overflow-y-auto h-42 mb-5 text-black cursor-pointer">
          <CardHeader>
            <CardTitle>To-Do List</CardTitle>
            <CardDescription>Manage your daily tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading todos...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : todos.length > 0 ? (
              <table className="w-full">
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo._id}>
                      <td className="pr-4">{todo.text}</td>
                      <td
                        className={`${
                          todo.completed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {todo.completed ? "Completed" : "Not Completed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No todos for today</p>
            )}
          </CardContent>
        </Card>
      </Link>

      {/* Wrap the Card with Link for Stickies navigation */}
      <Link href="/dashboard/notes">
        <Card className="bg-slate-50 overflow-y-auto h-42 mb-5 text-black cursor-pointer">
          <CardHeader>
            <CardTitle>Stickies</CardTitle>
            <CardDescription>Available tags</CardDescription>
          </CardHeader>
          <CardContent>
            <NotesDisplay />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Home;
