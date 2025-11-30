import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LoadingSpinner } from '../LoadingSpinner'

describe('LoadingSpinner Component', () => {
    it('renders loading spinner', () => {
        const { container } = render(<LoadingSpinner />)
        const spinner = container.querySelector('.animate-spin')
        expect(spinner).toBeInTheDocument()
    })

    it('displays loading text', () => {
        render(<LoadingSpinner />)
        expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
    })
})
