import React from 'react';
import { motion } from 'framer-motion';

type HealthMetricsProps = {
  metrics: {
    savingsRate: number;
    expenseRatio: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlySavings: number;
  };
};

export default function HealthMetrics({ metrics }: HealthMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <motion.div 
        layout
        className="p-3 bg-white dark:bg-gray-800 rounded-lg"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">Savings Rate</p>
        <motion.p
          key={metrics.savingsRate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-lg font-semibold ${
            metrics.savingsRate >= 20 ? 'text-green-600 dark:text-green-400' : 
            metrics.savingsRate > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {metrics.savingsRate.toFixed(1)}%
        </motion.p>
      </motion.div>
      <motion.div 
        layout
        className="p-3 bg-white dark:bg-gray-800 rounded-lg"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">Expense Ratio</p>
        <motion.p
          key={metrics.expenseRatio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-lg font-semibold ${
            metrics.expenseRatio <= 50 ? 'text-green-600 dark:text-green-400' :
            metrics.expenseRatio <= 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {metrics.expenseRatio.toFixed(1)}%
        </motion.p>
      </motion.div>
    </div>
  );
}