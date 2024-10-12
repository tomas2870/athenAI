import { BookOpen, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  selected?: string;
}

export default function Navbar({ selected }: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (selected) {
      return selected === path;
    }
    return currentPath === path;
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-purple-600">AthenaPrep</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') ? 'border-b-2 border-purple-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-purple-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 text-sm font-medium`}
              >
                Orientation
              </Link>
              <Link
                to="/essay-editor"
                className={`${
                  isActive('/essay-editor') ? 'border-b-2 border-purple-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-purple-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 text-sm font-medium`}
              >
                Essay Editor
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive('/about') ? 'border-b-2 border-purple-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-purple-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-purple-100 p-1 rounded-full text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-110">
              <span className="sr-only">View profile</span>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}