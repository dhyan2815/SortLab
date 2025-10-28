import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Info, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navigation() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm dark:shadow-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BarChart3 className="w-7 h-7 text-cyan-400 transition-transform group-hover:scale-110" />
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Sort<span className="text-cyan-600">Lab</span></span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-cyan-500/20 text-cyan-600'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
            >
              Visualizer
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                isActive('/about')
                  ? 'bg-cyan-500/20 text-cyan-600'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>

            {/*  */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
