import React from 'react'

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading tasks...</p>
        </div>
    )
}
