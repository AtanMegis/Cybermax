import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatsCard } from '../StatsCard'

describe('StatsCard Component', () => {
    it('renders value and label', () => {
        render(<StatsCard value={10} label="Total Tasks" color="indigo" />)
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('Total Tasks')).toBeInTheDocument()
    })

    it('applies correct color class for indigo', () => {
        render(<StatsCard value={5} label="Test" color="indigo" />)
        expect(screen.getByText('5')).toHaveClass('text-indigo-600')
    })

    it('applies correct color class for green', () => {
        render(<StatsCard value={3} label="Test" color="green" />)
        expect(screen.getByText('3')).toHaveClass('text-green-600')
    })

    it('applies correct color class for orange', () => {
        render(<StatsCard value={7} label="Test" color="orange" />)
        expect(screen.getByText('7')).toHaveClass('text-orange-600')
    })
})
