import React from 'react'
import { Circle } from 'lucide-react'

export const EmptyState: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-12 sm:p-16 text-center border border-gray-200">
            <div className="text-gray-300 mb-4">
                <Circle size={64} className="mx-auto" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks yet
            </h3>
            <p className="text-gray-500">
                Create your first task to get started on your journey!
            </p>
        </div>
    )
}
