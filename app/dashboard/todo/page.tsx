"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import Spinner from "../../components/ui/spinner";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface TodoItem {
  _id: string;
  text: string;
  completed: boolean;
  date: string;
}

export default function Component() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [todoDates, setTodoDates] = useState<Date[]>([]);

  // Helper function to format dates as yyyy-mm-dd
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA");
  };

  // Fetch todos for the selected date
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/todos?date=${formatDate(selectedDate)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data); // Directly set fetched todos
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [selectedDate]); // Fetch todos whenever selectedDate changes

  // Fetch all dates that have todos to highlight them in the calendar
  useEffect(() => {
    const fetchTodoDates = async () => {
      try {
        const response = await fetch("/api/todos/todo-dates");
        if (!response.ok) {
          throw new Error("Failed to fetch todo dates");
        }
        const data = await response.json();
        const parsedDates = data.map((todoDate: string) => new Date(todoDate)); // Parse string dates to Date objects
        setTodoDates(parsedDates);
      } catch (error) {
        console.error("Error fetching todo dates:", error);
      }
    };

    fetchTodoDates();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const tempId = `${Date.now()}`;
      const newTodoData = {
        _id: tempId,
        text: newTodo,
        completed: false,
        date: formatDate(selectedDate),
      };

      setTodos((prevTodos) => [...prevTodos, newTodoData]);

      setLoading(true);
      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newTodo,
            date: formatDate(selectedDate),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add todo");
        }

        const createdTodo = await response.json();

        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === tempId ? { ...todo, _id: createdTodo.todoId } : todo
          )
        );

        setNewTodo("");
        setTodoDates((prevDates) => [...prevDates, selectedDate]);
      } catch (error) {
        console.error("Error adding todo:", error);
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== tempId)
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);

    if (!todoToUpdate) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todoToUpdate.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setTodos(todos); // Revert changes on failure
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const filteredTodos = todos.filter((todo) => todo._id !== id);
    setTodos(filteredTodos);

    setLoading(true);
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      const deletedTodoDate = todos.find((todo) => todo._id === id)?.date;
      if (deletedTodoDate) {
        const remainingTodosForDate = filteredTodos.filter(
          (todo) => todo.date === deletedTodoDate
        );
        if (remainingTodosForDate.length === 0) {
          setTodoDates((prevDates) =>
            prevDates.filter((date) => formatDate(date) !== deletedTodoDate)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setTodos(todos); // Revert changes on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 text-black flex">
      <div className="w-2/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow bg-white border-none"
          />
          <Button
            onClick={addTodo}
            className="bg-primary text-primary-foreground p-3"
          >
            Add
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : todos.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No todos for today
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo._id} className="flex items-center space-x-2">
                <Checkbox
                  id={`todo-${todo._id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo._id)}
                />
                <label
                  htmlFor={`todo-${todo._id}`}
                  className={`flex-grow ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo._id)}
                  aria-label="Delete todo"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-1/3 pl-4 border-l border-border">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          modifiers={{
            hasTodo: todoDates, // Highlight dates that have todos
          }}
          modifiersStyles={{
            hasTodo: {
              backgroundColor: "#6366F1", // Highlighted background color (hex code)
              color: "#FFFFFF", // Foreground color (white)
            },
          }}
          className="bg-background p-4 rounded-lg"
        />
      </div>
    </div>
  );
}
