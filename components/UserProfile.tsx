import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { currentUser, signOut } = useAuth();
  
  // Split full name into initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.hash = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-3 p-2 w-full hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {currentUser?.displayName ? getInitials(currentUser.displayName) : '?'}
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {currentUser?.displayName || 'User'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {currentUser?.email}
          </p>
        </div>
      </button>
      
      <div className="absolute bottom-full left-0 w-full mb-2 hidden group-hover:block">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1">
          <a 
            href="#/settings"
            className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </a>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 w-full text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}