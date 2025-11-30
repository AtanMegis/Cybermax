import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '../Header'

describe('Header Component', () => {
    it('renders title', () => {
        render(<Header />)
        expect(screen.getByText('Task Manager')).toBeInTheDocument()
    })

    it('renders subtitle', () => {
        render(<Header />)
        expect(screen.getByText(/Organize your work/i)).toBeInTheDocument()
    })
})
