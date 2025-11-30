import React from 'react'
import { TaskItem } from './TaskItem'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Task } from '@/types/task'

interface TaskListProps {
    tasks: Task[]
    loading: boolean
    error: string | null
    onRetry: () => void
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    loading,
    error,
    onRetry,
}) => {
    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-md">
                <p className="text-red-700 font-medium text-lg">
                    Error loading tasks
                </p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button
                    onClick={onRetry}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 active:scale-95 transition-all"
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (tasks.length === 0) {
        return <EmptyState />
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}
