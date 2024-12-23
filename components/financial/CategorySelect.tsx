import React from 'react';
import { ChevronDown } from 'lucide-react';

type Category = {
  id: string;
  label: string;
  icon: string;
};

type CategorySelectProps = {
  type: 'income' | 'expense';
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
};

export default function CategorySelect({ type, value, onChange, categories }: CategorySelectProps) {
  return (
    <div className="col-span-7">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.label}>
              {cat.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-lg">
            {categories.find(cat => cat.label === value)?.icon}
          </span>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}