import React from 'react';
import { motion } from 'framer-motion';

export default function ChatLoadingIndicator() {
  return (
    <div className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}