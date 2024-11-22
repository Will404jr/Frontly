"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Flag,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const PRIORITY_LEVELS = {
  high: { color: "text-red-500", bgColor: "bg-red-200" },
  medium: { color: "text-yellow-500", bgColor: "bg-yellow-200" },
  low: { color: "text-green-500", bgColor: "bg-green-200" },
};

const VIEW_OPTIONS = {
  month: "Month",
  week: "Week",
  day: "Day",
};

type Todo = {
  _id: string;
  text: string;
  date: string;
  time: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
};

const CalendarTodo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [dueTime, setDueTime] = useState("");
  const [calendarView, setCalendarView] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Format date to YYYY-MM-DD for comparison
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Fetch todos for all dates in the current view
  const fetchTodos = async () => {
    try {
      const viewDates = getViewDates();
      const startDate = formatDate(viewDates[0]);
      const endDate = formatDate(viewDates[viewDates.length - 1]);

      const response = await fetch(
        `/api/todos?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch todos",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedDate, calendarView]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    if (isPastDate(selectedDate)) {
      toast({
        title: "Error",
        description: "Cannot add todos to past dates",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newTodo,
          date: formatDate(selectedDate),
          time: dueTime,
          priority: selectedPriority,
        }),
      });

      if (!response.ok) throw new Error("Failed to add todo");

      toast({
        title: "Success",
        description: "Task added successfully",
      });

      // Refresh todos
      fetchTodos();

      // Reset form
      setNewTodo("");
      setDueTime("");
      setSelectedPriority("medium");
      setShowAddTodo(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      // Update local state
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      toast({
        title: "Success",
        description: "Task deleted successfully",
      });

      // Update local state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  // Get dates for the current view
  const getViewDates = () => {
    const currentDate = new Date(selectedDate);
    switch (calendarView) {
      case "week": {
        const first = currentDate.getDate() - currentDate.getDay();
        return Array.from(
          { length: 7 },
          (_, i) =>
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              first + i
            )
        );
      }
      case "day":
        return [currentDate];
      default: // month
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Add days from previous month to fill the first week
        for (let i = 0; i < firstDay.getDay(); i++) {
          const date = new Date(year, month, -i);
          days.unshift(date);
        }

        // Add days of current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push(new Date(year, month, i));
        }

        // Add days from next month to complete the last week
        const remainingDays = 42 - days.length; // 6 weeks × 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
          days.push(new Date(year, month + 1, i));
        }

        return days;
    }
  };

  // Get todos for each day
  const getTodosForDay = (date: Date) => {
    return todos.filter((todo) => todo.date === formatDate(date));
  };

  const hasFutureTodos = (date: Date) => {
    const dayTodos = getTodosForDay(date);
    return !isPastDate(date) && dayTodos.length > 0;
  };

  const filteredTodos = todos
    .filter((todo) => todo.date === formatDate(selectedDate))
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.time !== b.time) return a.time > b.time ? 1 : -1;
      const priorityOrder: { [key in Todo["priority"]]: number } = {
        high: 0,
        medium: 1,
        low: 2,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {selectedDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                    {Object.entries(VIEW_OPTIONS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setCalendarView(key)}
                        className={`px-3 py-1 rounded-md ${
                          calendarView === key
                            ? "bg-white shadow-sm"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        if (calendarView === "month")
                          newDate.setMonth(newDate.getMonth() - 1);
                        else
                          newDate.setDate(
                            newDate.getDate() -
                              (calendarView === "week" ? 7 : 1)
                          );
                        setSelectedDate(newDate);
                      }}
                    >
                      ←
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        if (calendarView === "month")
                          newDate.setMonth(newDate.getMonth() + 1);
                        else
                          newDate.setDate(
                            newDate.getDate() +
                              (calendarView === "week" ? 7 : 1)
                          );
                        setSelectedDate(newDate);
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 h-[32rem]">
                {calendarView !== "day" &&
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-medium text-gray-500 py-4 border-b"
                      >
                        {day}
                      </div>
                    )
                  )}
                {getViewDates().map((day, index) => {
                  const isSelected =
                    formatDate(day) === formatDate(selectedDate);
                  const isPast = isPastDate(new Date(day));
                  const dayTodos = getTodosForDay(day);
                  const hasTodos = hasFutureTodos(day);
                  const isCurrentMonth =
                    day.getMonth() === selectedDate.getMonth();

                  return (
                    <button
                      key={day.getTime()}
                      onClick={() => setSelectedDate(new Date(day))}
                      className={`relative border-b border-r p-2 flex flex-col transition-colors
                        ${calendarView === "day" ? "col-span-7" : ""}
                        ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}
                        ${!isCurrentMonth ? "text-gray-400" : ""}
                        ${isPast ? "bg-gray-50" : ""}
                      `}
                    >
                      <div className={`flex items-center justify-between mb-2`}>
                        <span
                          className={`text-lg ${
                            isSelected ? "bg-blue-500 text-white" : ""
                          } w-8 h-8 flex items-center justify-center rounded-full
                            ${hasTodos ? "ring-2 ring-blue-500" : ""}
                          `}
                        >
                          {day.getDate()}
                        </span>
                        {dayTodos.length > 0 && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {dayTodos.length}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        {dayTodos.slice(0, 3).map((todo) => (
                          <div
                            key={todo._id}
                            className={`text-xs p-1 mb-1 rounded ${
                              PRIORITY_LEVELS[todo.priority].bgColor
                            } truncate`}
                          >
                            {todo.text}
                          </div>
                        ))}
                        {dayTodos.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{dayTodos.length - 3} more
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Todos Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Tasks for {selectedDate.toLocaleDateString()}
                </CardTitle>
                {!isPastDate(selectedDate) ? (
                  <button
                    onClick={() => setShowAddTodo(true)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                ) : (
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <AlertTitle>Past Date</AlertTitle>
                    <AlertDescription>
                      Cannot add todos to past dates
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {showAddTodo && !isPastDate(selectedDate) && (
                <div className="mb-4 space-y-3">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new task..."
                    className="w-full p-2 border rounded-lg"
                    disabled={isLoading}
                  />
                  <div className="flex gap-2">
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="p-2 border rounded-lg"
                      disabled={isLoading}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="p-2 border rounded-lg"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddTodo(false)}
                      className="px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addTodo}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add Task"}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                  <Alert>
                    <span className="text-lg">📅</span>
                    <AlertTitle>No tasks for this day</AlertTitle>
                    <AlertDescription>
                      {!isPastDate(selectedDate)
                        ? "Click the + button to add a new task"
                        : "Cannot add tasks to past dates"}
                    </AlertDescription>
                  </Alert>
                ) : (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo._id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        PRIORITY_LEVELS[todo.priority].bgColor
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTodo(todo._id, todo.completed)}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <div
                          className={
                            todo.completed ? "line-through text-gray-500" : ""
                          }
                        >
                          <div className="flex items-center gap-2">
                            <span>{todo.text}</span>
                            <Flag
                              className={`w-4 h-4 ${
                                PRIORITY_LEVELS[todo.priority].color
                              }`}
                            />
                          </div>
                          {todo.time && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {todo.time}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarTodo;
