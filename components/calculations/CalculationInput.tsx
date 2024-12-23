import React from 'react';

type CalculationInputProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: number;
  step?: number;
  required?: boolean;
};

export default function CalculationInput({
  label,
  name,
  value,
  onChange,
  type = 'number',
  placeholder,
  min,
  step,
  required = false
}: CalculationInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        required={required}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}