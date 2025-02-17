import { Home, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({ onMenuToggle, onLogout }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed w-full bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="hidden md:flex text-xl font-bold text-gray-800 dark:text-white">
          Dashboard Settings
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Home size={24} />
          </button>
          <button
            onClick={onLogout}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}