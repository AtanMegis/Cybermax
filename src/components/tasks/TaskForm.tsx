import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createTask } from '@/store/reducers/TaskReducer'
import { useAppDispatch } from '@/store/hooks'
import Swal from 'sweetalert2'

interface TaskFormProps {
    onSuccess: () => void
}
export const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        setError('')

        if (!title.trim()) {
            setError('Title is required')
            return
        }

        setIsSubmitting(true)

        try {
            await dispatch(
                createTask({
                    title: title.trim(),
                    description: description.trim(),
                    completed: false,
                })
            ).unwrap()

            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Task created successfully',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
            })

            setTitle('')
            setDescription('')
            onSuccess()
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create task. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:opacity-50"
                    placeholder="Enter task title"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Description{' '}
                    <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none disabled:opacity-50"
                    placeholder="Enter task description"
                />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={() => setError('')}
                        className="text-red-700 hover:text-red-900"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creating...
                    </>
                ) : (
                    <>
                        <Plus size={20} />
                        Create Task
                    </>
                )}
            </button>
        </div>
    )
}
