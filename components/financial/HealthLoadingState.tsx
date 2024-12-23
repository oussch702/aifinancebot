import React from 'react';
import { motion } from 'framer-motion';

export default function HealthLoadingState() {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Progress Bar Loading */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gray-300 dark:bg-gray-600"
          initial={{ width: "0%" }}
          animate={{ width: "50%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Financial Metrics Loading */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[0, 1].map((i) => (
          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2" />
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Zone Indicators Loading */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>

      {/* Recommendations Loading */}
      <div className="space-y-4">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}