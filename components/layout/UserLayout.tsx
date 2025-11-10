
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Gamepad2, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-light-surface dark:bg-dark-surface shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-brand-primary">
                            <Gamepad2 size={28} />
                            <span>Game Fire</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Button onClick={() => navigate('/book')} variant="primary" size="sm">Book Now</Button>
                                <Button onClick={handleLogout} variant="ghost" size="sm" className="flex items-center gap-2">
                                    <LogOut size={16} /> Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">Login</Link>
                                <Button onClick={() => navigate('/signup')} variant="primary" size="sm">Sign Up</Button>
                            </>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        {/* Mobile menu could be added here */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-light-surface dark:bg-dark-surface mt-auto">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Game Fire. All rights reserved.</p>
            </div>
        </footer>
    );
};


const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
        </main>
        <Footer />
    </div>
  );
};

export default UserLayout;
