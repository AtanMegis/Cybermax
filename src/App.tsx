import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import UserCard from '@/components/UserCard'
import UserForm from '@/components/UserForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
    addUser,
    deleteUser,
    editUser,
    fetchUsers,
} from '@/store/reducers/UserReducer'
import type { User } from '@/types/User'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const { users, loading, error } = useAppSelector((state) => state.users)
    const [showForm, setShowForm] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleAddUser = () => {
        setEditingUser(null)
        setShowForm(true)
    }

    const handleEditUser = (user: User) => {
        setEditingUser(user)
        setShowForm(true)
    }

    const handleDeleteUser = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    const handleSubmitUser = (user: User) => {
        if (editingUser) {
            dispatch(editUser(user))
        } else {
            dispatch(addUser(user))
        }
        setShowForm(false)
        setEditingUser(null)
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingUser(null)
    }

    return (
        <React.Fragment>
            <Header />
            <div className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            User Placeholder
                        </h1>
                        <button
                            onClick={handleAddUser}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <FaPlus />
                            Add User
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center py-10">
                            <LoadingSpinner />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    {/* User List */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        onEdit={handleEditUser}
                                        onDelete={handleDeleteUser}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No users available.
                                </p>
                            )}
                        </div>
                    )}

                    {/* User Form (Modal Style Overlay) */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform animate-modalIn">
                                <UserForm
                                    user={editingUser}
                                    onSubmit={handleSubmitUser}
                                    onCancel={handleCancel}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default App
