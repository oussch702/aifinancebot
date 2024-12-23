import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HealthRecommendationsProps = {
  tips: string[];
  config: {
    color: string;
    progress: string;
  };
};

export default function HealthRecommendations({ tips, config }: HealthRecommendationsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tips.join(',')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-4"
      >
        <h4 className="font-medium text-gray-900 dark:text-white">Recommended Actions:</h4>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2"
            >
              <div className={`mt-1 h-2 w-2 rounded-full ${config.progress}`} />
              <span className="text-sm text-gray-600 dark:text-gray-300">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}