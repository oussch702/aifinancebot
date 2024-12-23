import React from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminHeader() {
  const { adminUser, signOutAdmin } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      window.location.hash = '/admin/login';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            
            <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>

            <div className="relative ml-3">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {adminUser?.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    Administrator
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}