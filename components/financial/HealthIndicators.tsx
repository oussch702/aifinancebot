import React from 'react';

type HealthIndicatorsProps = {
  currentZone: 'red' | 'yellow' | 'green';
};

export default function HealthIndicators({ currentZone }: HealthIndicatorsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-center">
      <div className={`p-1 rounded ${currentZone === 'red' ? 'bg-red-500 dark:bg-red-600 text-white' : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'}`}>
        Needs Work
      </div>
      <div className={`p-1 rounded ${currentZone === 'yellow' ? 'bg-yellow-500 dark:bg-yellow-600 text-white' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400'}`}>
        Getting There
      </div>
      <div className={`p-1 rounded ${currentZone === 'green' ? 'bg-green-500 dark:bg-green-600 text-white' : 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'}`}>
        Excellent
      </div>
    </div>
  );
}