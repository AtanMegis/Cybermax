import type { CreateTaskDTO, Task } from "@/types/task";

const API_BASE_URL = import.meta.env.VITE_API_URL

console.log(API_BASE_URL)

export const tasksAPI = {
  // Get all tasks
  fetchTasks: async (): Promise<Task[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Create a new task
  createTask: async (task: CreateTaskDTO): Promise<Task> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  // Update task (toggle complete)
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};