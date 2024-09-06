"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface TodoItem {
  _id: string;
  text: string;
  completed: boolean;
  date: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/todos?date=${selectedDate}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [selectedDate]);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const tempId = `${Date.now()}`; // Temporary ID for optimistic update
      const newTodoData = {
        _id: tempId,
        text: newTodo,
        completed: false,
        date: selectedDate,
      };

      // Optimistically update the UI
      setTodos((prevTodos) => [...prevTodos, newTodoData]);

      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newTodo,
            date: selectedDate,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add todo");
        }

        const createdTodo = await response.json();

        // Update the state with the correct ID returned from the server
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === tempId ? { ...todo, _id: createdTodo.todoId } : todo
          )
        );

        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
        // Revert optimistic update if the request fails
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== tempId)
        );
      }
    }
  };

  const toggleTodo = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);

    if (!todoToUpdate) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    console.log(`Updating todo with id: ${id}`); // Debugging log

    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

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
      // Revert the state update if the request fails
      setTodos(todos);
    }
  };

  const deleteTodo = async (id: string) => {
    const filteredTodos = todos.filter((todo) => todo._id !== id);
    setTodos(filteredTodos);

    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Revert the state update if the request fails
      setTodos(todos);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos
          .filter((todo) => todo.date === selectedDate)
          .map((todo) => (
            <li key={todo._id} className="flex items-center space-x-2">
              <Checkbox
                id={`todo-${todo._id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo._id)}
              />
              <label
                htmlFor={`todo-${todo._id}`}
                className={`flex-grow ${
                  todo.completed ? "line-through text-gray-500" : ""
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
    </div>
  );
}
