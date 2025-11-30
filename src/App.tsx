import React, { useState, useEffect } from 'react'
import { Plus, FileDown, RefreshCw, Minus } from 'lucide-react'
// import { Header } from '@/components/layout/Header'
// import { StatsCard } from '@/components/layout/StatsCard'
// import { Button } from '@/components/ui/Button'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { fetchTasks } from '@/store/reducers/TaskReducer'
import { generateTasksPDF } from '@/utils/PDFGenerator'
import Swal from 'sweetalert2'
import { Header } from '@/components/layout/Header'
import { StatsCard } from './components/layout/StatsCard'

const App: React.FC = () => {
    const [showForm, setShowForm] = useState(false)
    const dispatch = useAppDispatch()
    const { tasks, loading, error } = useAppSelector((state) => state.tasks)

    const completedCount = tasks.filter((t) => t.completed).length
    const totalCount = tasks.length

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    const handleRefresh = async () => {
        await dispatch(fetchTasks()).unwrap()
        await Swal.fire({
            icon: 'success',
            title: 'Refreshed!',
            text: 'Tasks updated successfully',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
        })
    }

    const handleDownloadReport = () => {
        generateTasksPDF(tasks)

        Swal.fire({
            icon: 'success',
            title: 'PDF Downloaded!',
            text: 'Your task report has been generated',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-20% to-purple-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                {/* Header */}
                <Header />

                {/* Statsus Task */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatsCard
                        value={totalCount}
                        label="Total Tasks"
                        color="indigo"
                    />
                    <StatsCard
                        value={completedCount}
                        label="Completed"
                        color="green"
                    />
                    <StatsCard
                        value={totalCount - completedCount}
                        label="Pending"
                        color="orange"
                    />
                </div>

                {/* Parent Button */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="cursor-pointer flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                    >
                        {showForm ? <Minus size={18} /> : <Plus size={18} />}
                        <span>{showForm ? 'Hide Form' : 'New Task'}</span>
                    </button>

                    <div className="flex flex-row sm:flex-col gap-3 flex-none">
                        <button
                            onClick={handleRefresh}
                            className="cursor-pointer sm:w-auto w-full bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-4 sm:px-6 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all font-medium flex items-center justify-center gap-2 shadow-md"
                        >
                            <RefreshCw size={20} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>

                        <button
                            onClick={handleDownloadReport}
                            disabled={totalCount === 0}
                            className="cursor-pointer sm:w-auto w-full bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-4 sm:px-6 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            <FileDown size={20} />
                            <span className="hidden sm:inline">Report</span>
                        </button>
                    </div>
                </div>

                {/* Task Form */}
                {showForm && (
                    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl border border-gray-200 mb-6 animate-fadeIn">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                            Create New Task
                        </h2>
                        <TaskForm onSuccess={() => setShowForm(false)} />
                    </div>
                )}

                {/* Task List */}
                <TaskList
                    tasks={tasks}
                    loading={loading}
                    error={error}
                    onRetry={handleRefresh}
                />
            </div>
        </div>
    )
}

export default App
