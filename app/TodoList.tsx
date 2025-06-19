"use client";

import { useState } from "react";
import { addTodo, removeTodo } from "./actions";

interface TodoItem {
  id: string;
  text: string;
}

export default function TodoList({ initialTodos }: { initialTodos: TodoItem[] }) {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      await addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleRemoveTodo = async (id: string) => {
    await removeTodo(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        To-Do List
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new to-do..."
          className="flex-grow p-4 bg-gray-700 border-2 border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700 focus:outline-none transition-colors font-semibold"
        >
          Add
        </button>
      </div>
      <ul>
        {initialTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg mb-2 shadow-sm"
          >
            <span className="text-lg text-gray-200">{todo.text}</span>
            <button
              onClick={() => handleRemoveTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors font-semibold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 