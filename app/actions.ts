"use server";

import { revalidatePath } from "next/cache";

// WARNING: Hardcoding credentials is not secure.
// This is a workaround for the current deployment environment.
const DB_HOST = "https://todo-list-db-8--mk060700v11nl.data.appgroupstest3.mitalicustomdomain.net";
const DB_TOKEN = "a3a761ff4851472c8648ce58d8c4ef66";

interface Todo {
  id: string;
  text: string;
}

export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`${DB_HOST}/keyValuePairs/list`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${DB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "AreAllUsersAndGlobalKeysReturned": true }),
        cache: 'no-store', // Ensure we get fresh data
    });

    if (!res.ok) {
        throw new Error('Failed to fetch todos');
    }

    const data = await res.json();
    // The API returns key-value pairs. We need to transform them.
    return data.map((item: { key: string; value: string }) => ({
        id: item.key,
        text: item.value,
    }));
}

export async function addTodo(text: string) {
    const newTodo = {
        key: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: text,
    };

    const res = await fetch(`${DB_HOST}/keyValuePairs/createOrUpdate`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${DB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
        throw new Error('Failed to add todo');
    }

    revalidatePath("/");
}

export async function removeTodo(id: string) {
    const res = await fetch(`${DB_HOST}/keyValuePairs/remove`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${DB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: id }),
    });

    if (!res.ok) {
        throw new Error('Failed to remove todo');
    }

    revalidatePath("/");
} 