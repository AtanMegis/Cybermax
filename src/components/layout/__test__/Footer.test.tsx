import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

describe('Footer Component', () => {
    it('renders About section', () => {
        render(<Footer />)
        expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('renders Quick Links section', () => {
        render(<Footer />)
        expect(screen.getByText('Quick Links')).toBeInTheDocument()
    })

    it('renders Connect section', () => {
        render(<Footer />)
        expect(screen.getByText('Connect')).toBeInTheDocument()
    })

    it('renders social media icons', () => {
        render(<Footer />)

        expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    })

    it('shows current year', () => {
        render(<Footer />)

        const currentYear = new Date().getFullYear().toString()
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
    })

    it('renders the copyright text', () => {
        render(<Footer />)

        expect(screen.getByText(/Made with/i)).toBeInTheDocument()
    })
})
