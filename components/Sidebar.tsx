import React from 'react';
import { History, BarChart2, Settings, PieChart, Wallet, ChevronLeft, ChevronRight, Bookmark, FileText, Calculator } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();

  const menuItems = [
    { icon: <Wallet className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
    { icon: <History className="w-5 h-5" />, label: 'History', path: '/history' },
    { icon: <PieChart className="w-5 h-5" />, label: 'Reports', path: '/reports' },
    { icon: <Calculator className="w-5 h-5" />, label: 'Calculations', path: '/calculations' },
    { icon: <Bookmark className="w-5 h-5" />, label: 'Saved Advice', path: '/saved-advice' },
    { icon: <FileText className="w-5 h-5" />, label: 'Notes', path: '/notes' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' }
  ];

  const currentPath = window.location.hash.slice(1) || '/';

  return (
    <div className={`h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-16 sm:w-20'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <Wallet className="h-8 w-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          {isExpanded && (
            <span className="text-xl font-bold text-gray-900 dark:text-white truncate">
              FinanceGPT
            </span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hidden sm:block"
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.path}`}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPath === item.path
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {item.icon}
                {isExpanded && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          {isExpanded ? (
            <>
              <UserProfile />
              <ThemeToggle />
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">JD</span>
              </div>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}