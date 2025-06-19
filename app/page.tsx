import { getTodos } from "./actions";
import TodoList from "./TodoList";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans text-white">
      <TodoList initialTodos={todos} />
    </div>
  );
}
