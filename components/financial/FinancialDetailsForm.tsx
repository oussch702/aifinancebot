import React from 'react';
import { motion } from 'framer-motion';
import FinancialForm from './FinancialForm';

type FinancialDetailsFormProps = {
  onPromptCopy: (prompt: string) => void;
};

export default function FinancialDetailsForm({ onPromptCopy }: FinancialDetailsFormProps) {
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
      <FinancialForm onPromptCopy={onPromptCopy} />
    </motion.div>
  );
}