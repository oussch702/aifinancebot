import React from 'react';
import { Wallet, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LandingHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FinanceGPT</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Pricing
            </a>
            <a href="#about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              About
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="#/signin"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Sign In
            </a>
            <a
              href="#/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}