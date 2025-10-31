import React, { useState, useEffect } from 'react'
import type { User } from '../types/User'

interface UserFormProps {
    user: User | null
    onSubmit: (data: User) => void
    onCancel: () => void
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    })

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                company: user.company?.name || '',
            })
        } else {
            setFormData({ name: '', email: '', phone: '', company: '' })
        }
    }, [user])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userData: User = {
            id: user?.id || Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: { name: formData.company },
        }
        onSubmit(userData)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white border rounded-lg shadow-md max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">
                {user ? 'Edit User' : 'Add User'}
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                    </label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                company: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {user ? 'Update' : 'Add'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default UserForm
