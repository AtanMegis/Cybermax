import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TaskItem } from '../TaskItem'
import { renderWithProviders } from '@/test/test-utils'

vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn(() => Promise.resolve({ isConfirmed: false })),
    },
}))

describe('TaskItem Component', () => {
    const mockTask = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders task title and description', () => {
        renderWithProviders(<TaskItem task={mockTask} />)
        expect(screen.getByText('Test Task')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('renders task without description', () => {
        const taskWithoutDesc = { ...mockTask, description: '' }
        renderWithProviders(<TaskItem task={taskWithoutDesc} />)
        expect(screen.getByText('Test Task')).toBeInTheDocument()
        expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
    })

    it('shows circle icon for incomplete task', () => {
        renderWithProviders(<TaskItem task={mockTask} />)
        const toggleButton = screen.getByRole('button', {
            name: 'Mark as complete',
        })
        expect(toggleButton).toBeInTheDocument()
    })

    it('shows check icon for completed task', () => {
        const completedTask = { ...mockTask, completed: true }
        renderWithProviders(<TaskItem task={completedTask} />)

        const toggleButton = screen.getByRole('button', {
            name: 'Mark as incomplete',
        })
        expect(toggleButton).toBeInTheDocument()

        expect(screen.getByText('Test Task')).toHaveClass('line-through')
    })

    it('formats creation date correctly', () => {
        renderWithProviders(<TaskItem task={mockTask} />)
        expect(screen.getByText(/Jan/)).toBeInTheDocument()
    })

    it('shows delete button', () => {
        renderWithProviders(<TaskItem task={mockTask} />)
        const deleteButton = screen.getByRole('button', { name: 'Delete task' })
        expect(deleteButton).toBeInTheDocument()
    })

    it('applies line-through style to completed task', () => {
        const completedTask = { ...mockTask, completed: true }
        renderWithProviders(<TaskItem task={completedTask} />)

        const title = screen.getByText('Test Task')
        expect(title).toHaveClass('line-through')

        if (completedTask.description) {
            expect(screen.getByText('Test Description')).toHaveClass(
                'line-through'
            )
        }
    })
})
