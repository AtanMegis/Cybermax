// import { describe, it, expect, vi } from 'vitest'
// import { render, screen, fireEvent } from '@testing-library/react'
// import '@testing-library/jest-dom'

// describe('UserCard', () => {
//     const mockUser: User = {
//         id: 1,
//         name: 'John Doe',
//         email: 'john@example.com',
//         phone: '123-456-7890',
//         company: { name: 'Test Company' },
//     }

//     const mockOnEdit = vi.fn()
//     const mockOnDelete = vi.fn()

//     it('renders user information correctly', () => {
//         render(
//             <UserCard
//                 user={mockUser}
//                 onEdit={mockOnEdit}
//                 onDelete={mockOnDelete}
//             />
//         )

//         expect(screen.getByText('John Doe')).toBeInTheDocument()
//         expect(screen.getByText('john@example.com')).toBeInTheDocument()
//         expect(screen.getByText('123-456-7890')).toBeInTheDocument()
//         expect(screen.getByText('Test Company')).toBeInTheDocument()
//     })

//     it('calls onEdit when edit button is clicked', () => {
//         render(
//             <UserCard
//                 user={mockUser}
//                 onEdit={mockOnEdit}
//                 onDelete={mockOnDelete}
//             />
//         )

//         const editButton = screen.getByLabelText('Edit user')
//         fireEvent.click(editButton)

//         expect(mockOnEdit).toHaveBeenCalledWith(mockUser)
//     })

//     it('calls onDelete when delete button is clicked', () => {
//         render(
//             <UserCard
//                 user={mockUser}
//                 onEdit={mockOnEdit}
//                 onDelete={mockOnDelete}
//             />
//         )

//         const deleteButton = screen.getByLabelText('Delete user')
//         fireEvent.click(deleteButton)

//         expect(mockOnDelete).toHaveBeenCalledWith(1)
//     })
// })
