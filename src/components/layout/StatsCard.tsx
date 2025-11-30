import React from 'react'

interface StatsCardProps {
    value: number
    label: string
    color: 'indigo' | 'green' | 'orange'
}

export const StatsCard: React.FC<StatsCardProps> = ({
    value,
    label,
    color,
}) => {
    const colorClasses = {
        indigo: 'text-indigo-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
    }

    return (
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className={`text-2xl font-bold ${colorClasses[color]}`}>
                {value}
            </div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    )
}
