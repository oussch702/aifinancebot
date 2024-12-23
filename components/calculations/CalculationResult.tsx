import React from 'react';
import { motion } from 'framer-motion';

type CalculationResultProps = {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
};

export default function CalculationResult({ label, value, prefix = '', suffix = '' }: CalculationResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4"
    >
      <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-indigo-900 dark:text-indigo-100">
        {prefix}
        {typeof value === 'number' ? value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) : value}
        {suffix}
      </div>
    </motion.div>
  );
}