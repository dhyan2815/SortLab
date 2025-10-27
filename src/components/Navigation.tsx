import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Info } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BarChart3 className="w-7 h-7 text-cyan-400 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-white">Sort<span className="text-cyan-400">Viz</span></span>
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Visualizer
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                isActive('/about')
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
