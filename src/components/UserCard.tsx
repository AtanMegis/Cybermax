import type { User } from '@/types/User'
import {
    FaEdit,
    FaTrash,
    FaBuilding,
    FaEnvelope,
    FaPhone,
} from 'react-icons/fa'

interface UserCardProps {
    user: User
    onEdit: (user: User) => void
    onDelete: (id: number) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <div
            className="p-4 border rounded-lg bg-white flex flex-col gap-2 cursor-pointer
      shadow-md transform transition-all duration-300 ease-in-out
      hover:shadow-xl hover:scale-105 active:scale-95"
        >
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaBuilding className="text-gray-500" />
                {user.name}
            </h2>

            <p className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-gray-400" />
                {user.email}
            </p>

            <p className="flex items-center gap-2 text-gray-700">
                <FaPhone className="text-gray-400" />
                {user.phone}
            </p>

            <p className="flex items-center gap-2 text-gray-700">
                <FaBuilding className="text-gray-400" />
                {user.company?.name}
            </p>

            <div className="flex justify-end gap-3 mt-3">
                <button
                    onClick={() => onEdit(user)}
                    className="p-2 rounded-full text-blue-500 transition-all duration-300 ease-in-out 
          hover:text-blue-700 hover:bg-blue-100 active:scale-90 cursor-pointer"
                    aria-label="Edit user"
                >
                    <FaEdit size={18} />
                </button>

                <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 rounded-full text-red-500 transition-all duration-300 ease-in-out 
          hover:text-red-700 hover:bg-red-100 active:scale-90 cursor-pointer"
                    aria-label="Delete user"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        </div>
    )
}

export default UserCard
