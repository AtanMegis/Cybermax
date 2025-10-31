import { FaUsers } from 'react-icons/fa'

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaUsers size={32} />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                User Management
                            </h1>
                            <p className="text-blue-100 text-sm">
                                Manage your users efficiently
                            </p>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <a
                            href="#"
                            className="hover:text-blue-200 transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="hover:text-blue-200 transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="hover:text-blue-200 transition-colors"
                        >
                            Contact
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
