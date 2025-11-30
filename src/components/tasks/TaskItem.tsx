import React, { useState } from 'react'
import { CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react'
import { useAppDispatch } from '../../store/hooks'

import { deleteTask, toggleTask } from '@/store/reducers/TaskReducer'
import type { Task } from '@/types/task'
import Swal from 'sweetalert2'

interface TaskItemProps {
    task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const dispatch = useAppDispatch()
    const [isToggling, setIsToggling] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleToggle = async () => {
        setIsToggling(true)
        try {
            await dispatch(toggleTask(task)).unwrap()
            await Swal.fire({
                icon: 'success',
                title: task.completed
                    ? 'Task marked as incomplete'
                    : 'Task completed!',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update task',
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
            })
        }
        setIsToggling(false)
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Delete Task?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        })

        if (result.isConfirmed) {
            setIsDeleting(true)
            try {
                await dispatch(deleteTask(task.id)).unwrap()
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Task has been deleted',
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                })
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete task',
                    toast: true,
                    position: 'top-end',
                    timer: 2000,
                    showConfirmButton: false,
                })
                setIsDeleting(false)
            }
        }
    }

    return (
        <div
            className={`bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-xl hover:bg-indigo-600 transition-all duration-200 group  ${isDeleting ? 'opacity-50 scale-95' : ''}`}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                <button
                    aria-label={
                        task.completed
                            ? 'Mark as incomplete'
                            : 'Mark as complete'
                    }
                    onClick={handleToggle}
                    disabled={isToggling}
                    className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-white active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
                >
                    {task.completed ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                        <Circle size={24} />
                    )}
                </button>

                <div className="flex-1 min-w-0 ">
                    <h3
                        className={`font-semibold text-gray-900 break-words group-hover:text-white ${task.completed ? 'line-through text-gray-500' : ''}`}
                    >
                        {task.title}
                    </h3>
                    {task.description && (
                        <p
                            className={`text-sm text-gray-600 mt-1.5 break-words group-hover:text-white ${task.completed ? 'line-through text-gray-400' : ''}`}
                        >
                            {task.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-2.5 text-xs text-gray-400 group-hover:text-white">
                        <Calendar size={16} />
                        {new Date(task.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div>

                <button
                    aria-label="Delete task"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="opacity-100 flex-shrink-0 text-gray-400 hover:text-red-600 active:scale-90 transition-all  disabled:opacity-50 sm:opacity-100 sm:group-hover:opacity-100 cursor-pointer"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    )
}
