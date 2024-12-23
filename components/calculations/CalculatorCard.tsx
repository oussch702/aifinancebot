import React from 'react';
import { Info } from 'lucide-react';

type CalculatorCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CalculatorCard({ title, description, children }: CalculatorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}