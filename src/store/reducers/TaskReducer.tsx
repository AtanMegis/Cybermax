import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tasksAPI } from '@/services/Api'
import type { CreateTaskDTO, Task, TaskState } from '@/types/task'

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
}

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const tasks = await tasksAPI.fetchTasks()
    return tasks
})

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: CreateTaskDTO) => {
        const newTask = await tasksAPI.createTask(taskData)
        return newTask
    }
)

export const toggleTask = createAsyncThunk(
    'tasks/toggleTask',
    async (task: Task) => {
        const updatedTask = await tasksAPI.updateTask(task.id, {
            completed: !task.completed,
        })
        return updatedTask
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id: string) => {
        await tasksAPI.deleteTask(id)
        return id
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        // Fetch tasks
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false
            state.tasks = action.payload
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch tasks'
        })

        // Create task
        builder.addCase(createTask.pending, (state) => {
            state.error = null
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.tasks.unshift(action.payload)
        })
        builder.addCase(createTask.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to create task'
        })

        // Toggle task
        builder.addCase(toggleTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(
                (t) => t.id === action.payload.id
            )
            if (index !== -1) {
                state.tasks[index] = action.payload
            }
        })
        builder.addCase(toggleTask.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to update task'
        })

        // Delete task
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to delete task'
        })
    },
})

export const { clearError } = tasksSlice.actions
export default tasksSlice.reducer
