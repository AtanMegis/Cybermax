import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '../Button'

describe('Button Component', () => {
    it('renders button with children', () => {
        render(<Button onClick={() => {}}>Click Me</Button>)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click Me</Button>)

        fireEvent.click(screen.getByText('Click Me'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies primary variant styles by default', () => {
        render(<Button onClick={() => {}}>Primary</Button>)
        const button = screen.getByText('Primary')
        expect(button).toHaveClass('bg-indigo-600')
    })

    it('applies secondary variant styles when specified', () => {
        render(
            <Button onClick={() => {}} variant="secondary">
                Secondary
            </Button>
        )
        const button = screen.getByText('Secondary')
        expect(button).toHaveClass('border-2', 'border-indigo-600')
    })

    it('disables button when disabled prop is true', () => {
        render(
            <Button onClick={() => {}} disabled>
                Disabled
            </Button>
        )
        const button = screen.getByText('Disabled')
        expect(button).toBeDisabled()
        expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn()
        render(
            <Button onClick={handleClick} disabled>
                Disabled
            </Button>
        )

        fireEvent.click(screen.getByText('Disabled'))
        expect(handleClick).not.toHaveBeenCalled()
    })
})
