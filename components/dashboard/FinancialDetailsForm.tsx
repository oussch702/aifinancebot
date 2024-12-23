import React from 'react';
import { motion } from 'framer-motion';
import FinancialForm from '../financial/FinancialForm';

export default function FinancialDetailsForm() {
  const handlePromptCopy = (prompt: string) => {
    // Event will be bubbled up to parent components
    const event = new CustomEvent('promptCopy', { detail: prompt });
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Financial Details
      </h2>
      <FinancialForm onPromptCopy={handlePromptCopy} />
    </motion.div>
  );
}