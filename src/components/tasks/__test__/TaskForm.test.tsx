import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TaskForm } from '../TaskForm'
import { renderWithProviders } from '@/test/test-utils'

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
    },
}))

// Mock fetch
globalThis.fetch = vi.fn()

describe('TaskForm Component', () => {
    const mockOnSuccess = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        ;(globalThis.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({
                id: '1',
                title: 'New Task',
                description: 'New Description',
                completed: false,
                createdAt: new Date().toISOString(),
            }),
        })
    })

    it('renders form with all fields', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /Create Task/i })
        ).toBeInTheDocument()
    })

    it('shows error when title is empty', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        const submitButton = screen.getByRole('button', {
            name: /Create Task/i,
        })
        fireEvent.click(submitButton)

        expect(screen.getByText('Title is required')).toBeInTheDocument()
    })

    it('allows typing in title field', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement
        fireEvent.change(titleInput, { target: { value: 'New Task' } })

        expect(titleInput.value).toBe('New Task')
    })

    it('allows typing in description field', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        const descInput = screen.getByLabelText(
            /Description/i
        ) as HTMLTextAreaElement
        fireEvent.change(descInput, { target: { value: 'New Description' } })

        expect(descInput.value).toBe('New Description')
    })

    it('clears error when typing in title after error', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        const submitButton = screen.getByRole('button', {
            name: /Create Task/i,
        })
        fireEvent.click(submitButton)

        expect(screen.getByText('Title is required')).toBeInTheDocument()

        const closeButton = screen.getByRole('button', { name: '' })
        fireEvent.click(closeButton)

        expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
    })

    it('disables form during submission', async () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)

        const titleInput = screen.getByLabelText(/Title/i)
        const submitButton = screen.getByRole('button', {
            name: /Create Task/i,
        })

        fireEvent.change(titleInput, { target: { value: 'New Task' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(submitButton).toBeDisabled()
        })
    })

    it('shows required indicator on title', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)
        expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('shows optional label on description', () => {
        renderWithProviders(<TaskForm onSuccess={mockOnSuccess} />)
        expect(screen.getByText('(optional)')).toBeInTheDocument()
    })
})
