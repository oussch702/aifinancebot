import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CreditCard,
  BarChart2,
  Settings,
  Shield,
  MessageSquare,
  FileText,
  AlertCircle
} from 'lucide-react';

const menuItems = [
  { icon: BarChart2, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: CreditCard, label: 'Subscriptions', path: '/admin/subscriptions' },
  { icon: MessageSquare, label: 'Support', path: '/admin/support' },
  { icon: FileText, label: 'Reports', path: '/admin/reports' },
  { icon: AlertCircle, label: 'Alerts', path: '/admin/alerts' },
  { icon: Shield, label: 'Security', path: '/admin/security' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' }
];

export default function AdminSidebar() {
  const currentPath = window.location.hash.slice(1);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <Shield className="h-8 w-8 text-indigo-500" />
          <span className="ml-2 text-xl font-bold text-white">Admin</span>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <motion.a
                  key={item.path}
                  href={`#${item.path}`}
                  whileHover={{ x: 4 }}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.label}
                </motion.a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}