
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Gamepad2, Calendar, MessageSquare, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const AdminSidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, text: 'Dashboard', path: '/admin/dashboard' },
        { icon: Calendar, text: 'Bookings', path: '/admin/bookings' },
        { icon: Gamepad2, text: 'Consoles', path: '/admin/consoles' },
        { icon: MessageSquare, text: 'Messages', path: '/admin/messages' },
    ];

    const linkClasses = (path: string) => 
        `flex items-center p-3 my-1 rounded-lg transition-colors ${
            location.pathname === path
            ? 'bg-brand-primary text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;

    return (
        <>
            <aside className={`bg-dark-surface text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
                <div className="flex items-center justify-between px-4">
                    <Link to="/admin" className="text-white flex items-center space-x-2">
                        <Gamepad2 className="text-brand-secondary" size={28}/>
                        <span className="text-2xl font-bold">Game Fire</span>
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="md:hidden p-1">
                        <X size={24} />
                    </button>
                </div>
                <nav>
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path} className={linkClasses(item.path)}>
                            <item.icon className="mr-3" />
                            {item.text}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-4 px-4 w-full left-0">
                    <div className="flex justify-around items-center mb-4">
                       <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button onClick={handleLogout} className={linkClasses('/logout') + " w-auto flex-grow justify-center ml-2"}>
                            <LogOut className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
             {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
}

const AdminHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    return (
        <header className="bg-light-surface dark:bg-dark-surface shadow-md p-4 flex justify-between items-center md:hidden">
            <button onClick={onMenuClick}>
                <Menu size={24} />
            </button>
             <Link to="/admin" className="text-xl font-bold text-brand-primary flex items-center gap-2">
                <Gamepad2 size={24} />
                <span>Game Fire Admin</span>
            </Link>
            <div></div>
        </header>
    );
};

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen md:flex bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
            <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default AdminLayout;
