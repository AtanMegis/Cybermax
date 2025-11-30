import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { TaskList } from '../TaskList'
import { createTestStore } from '@/test/test-utils'

describe('TaskList Component', () => {
    const mockTasks = [
        {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            completed: false,
            createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
            id: '2',
            title: 'Task 2',
            description: 'Description 2',
            completed: true,
            createdAt: '2024-01-02T00:00:00.000Z',
        },
    ]

    const mockOnRetry = vi.fn()

    it('renders loading spinner when loading', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={[]}
                    loading={true}
                    error={null}
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
    })

    it('renders error message when there is an error', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={[]}
                    loading={false}
                    error="Network error"
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        expect(screen.getByText('Error loading tasks')).toBeInTheDocument()
        expect(screen.getByText('Network error')).toBeInTheDocument()
    })

    it('renders retry button on error', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={[]}
                    loading={false}
                    error="Error"
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        const retryButton = screen.getByRole('button', { name: /Try Again/i })
        expect(retryButton).toBeInTheDocument()
    })

    it('calls onRetry when retry button is clicked', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={[]}
                    loading={false}
                    error="Error"
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        const retryButton = screen.getByRole('button', { name: /Try Again/i })
        fireEvent.click(retryButton)
        expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })

    it('renders empty state when no tasks', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={[]}
                    loading={false}
                    error={null}
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    })

    it('renders task list when tasks are present', () => {
        render(
            <Provider store={createTestStore()}>
                <TaskList
                    tasks={mockTasks}
                    loading={false}
                    error={null}
                    onRetry={mockOnRetry}
                />
            </Provider>
        )
        expect(screen.getByText('Task 1')).toBeInTheDocument()
        expect(screen.getByText('Task 2')).toBeInTheDocument()
    })
})
