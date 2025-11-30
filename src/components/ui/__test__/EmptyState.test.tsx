import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { EmptyState } from '../EmptyState'

describe('EmptyState Component', () => {
    it('renders empty state message', () => {
        render(<EmptyState />)
        expect(screen.getByText('No tasks yet')).toBeInTheDocument()
        expect(screen.getByText(/Create your first task/i)).toBeInTheDocument()
    })

    it('renders circle icon', () => {
        const { container } = render(<EmptyState />)
        const svg = container.querySelector('svg')
        expect(svg).toBeInTheDocument()
    })
})
