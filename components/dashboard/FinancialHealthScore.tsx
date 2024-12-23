import React from 'react';
import { motion } from 'framer-motion';
import FinancialHealthBar from '../financial/FinancialHealthBar';

export default function FinancialHealthScore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Financial Health Overview
      </h2>
      <FinancialHealthBar />
    </motion.div>
  );
}