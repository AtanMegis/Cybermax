import React, { type ReactNode } from 'react'

interface ButtonProps {
    onClick: () => void
    children: ReactNode
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    className?: string
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    const baseClasses =
        'py-3 px-4 rounded-lg transition font-medium flex items-center justify-center gap-2'

    const variantClasses = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary:
            'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    }

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    )
}
