export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  completed: boolean;
}

export interface UpdateTaskDTO {
  id: string;
  completed: boolean;
}