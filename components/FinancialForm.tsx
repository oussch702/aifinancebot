import React, { useState, useMemo } from 'react';
import { DollarSign, Plus, X, Copy, Check, Calendar, ChevronDown } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';

const DEFAULT_INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: '💼' },
  { id: 'freelance', label: 'Freelance', icon: '💻' },
  { id: 'investments', label: 'Investments', icon: '📈' },
  { id: 'business', label: 'Business', icon: '🏢' },
  { id: 'rental', label: 'Rental Income', icon: '🏠' },
  { id: 'side-projects', label: 'Side Projects', icon: '🎯' },
  { id: 'other-income', label: 'Other Income', icon: '💰' }
];

const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'rent-mortgage', label: 'Rent/Mortgage', icon: '🏘️' },
  { id: 'utilities', label: 'Utilities', icon: '⚡' },
  { id: 'groceries', label: 'Groceries', icon: '🛒' },
  { id: 'transportation', label: 'Transportation', icon: '🚗' },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'dining', label: 'Dining Out', icon: '🍽️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'savings', label: 'Savings', icon: '🏦' },
  { id: 'investments-expense', label: 'Investments', icon: '📊' },
  { id: 'debt', label: 'Debt Payments', icon: '💳' },
  { id: 'other-expenses', label: 'Other Expenses', icon: '📝' }
];

type FinancialFormProps = {
  onPromptCopy: (prompt: string) => void;
};

export default function FinancialForm({ onPromptCopy }: FinancialFormProps) {
  const { addTransaction, clearTransactions } = useFinancial();
  const [categories, setCategories] = useState([
    { id: '1', type: 'income', category: DEFAULT_INCOME_CATEGORIES[0].label, amount: '' },
    { id: '2', type: 'expense', category: DEFAULT_EXPENSE_CATEGORIES[0].label, amount: '' },
    { id: '3', type: 'expense', category: DEFAULT_EXPENSE_CATEGORIES[1].label, amount: '' }
  ]);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const { totalIncome, totalExpenses, savings } = useMemo(() => {
    const income = categories
      .filter(cat => cat.type === 'income' && cat.amount)
      .reduce((sum, cat) => sum + parseFloat(cat.amount || '0'), 0);

    const expenses = categories
      .filter(cat => cat.type === 'expense' && cat.amount)
      .reduce((sum, cat) => sum + parseFloat(cat.amount || '0'), 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      savings: income - expenses
    };
  }, [categories]);

  const handleAddCategory = (type: 'income' | 'expense') => {
    const defaultCategory = type === 'income' 
      ? DEFAULT_INCOME_CATEGORIES[0].label 
      : DEFAULT_EXPENSE_CATEGORIES[0].label;

    const newCategory = {
      id: Date.now().toString(),
      type,
      category: defaultCategory,
      amount: '',
    };
    setCategories([...categories, newCategory]);
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleChange = (id: string, field: 'category' | 'amount', value: string) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, [field]: value } : category
    ));
  };

  const handleSubmit = () => {
    clearTransactions();
    
    const validCategories = categories.filter(cat => cat.category && cat.amount);
    validCategories.forEach(category => {
      addTransaction({
        type: category.type,
        category: category.category,
        amount: parseFloat(category.amount),
        description: `${category.type === 'income' ? 'Income' : 'Expense'} - ${category.category}`,
        date: date
      });
    });
  };

  const generatePrompt = () => {
    const incomeItems = categories
      .filter(cat => cat.type === 'income' && cat.category && cat.amount)
      .map(cat => `- ${cat.category}: $${parseFloat(cat.amount).toFixed(2)}`);

    const expenseItems = categories
      .filter(cat => cat.type === 'expense' && cat.category && cat.amount)
      .map(cat => `- ${cat.category}: $${parseFloat(cat.amount).toFixed(2)}`);

    return `Hey can you please help me manage my finances and improve my financial habits depending on my last month's Income & Expenses here are they:

Income:
${incomeItems.join('\n')}

Total Income: $${totalIncome.toFixed(2)}

Expenses:
${expenseItems.join('\n')}

Total Expenses: $${totalExpenses.toFixed(2)}
Savings: $${savings.toFixed(2)}

Statement Date: ${new Date(date).toLocaleDateString()}

Please analyze my financial situation and provide detailed advice on:
1. Budget optimization
2. Spending patterns
3. Savings opportunities
4. Recommended adjustments`;
  };

  const copyToChat = () => {
    handleSubmit();
    const prompt = generatePrompt();
    onPromptCopy(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Details</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Income Sources</h3>
          <button
            onClick={() => handleAddCategory('income')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-900"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Income
          </button>
        </div>
        <div className="space-y-3">
          {categories.filter(cat => cat.type === 'income').map((category) => (
            <div key={category.id} className="grid grid-cols-12 gap-3">
              <div className="col-span-7">
                <div className="relative">
                  <select
                    value={category.category}
                    onChange={(e) => handleChange(category.id, 'category', e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-colors"
                  >
                    {DEFAULT_INCOME_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-lg">
                      {DEFAULT_INCOME_CATEGORIES.find(cat => cat.label === category.category)?.icon}
                    </span>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={category.amount}
                    onChange={(e) => handleChange(category.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => handleRemoveCategory(category.id)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Expenses</h3>
          <button
            onClick={() => handleAddCategory('expense')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Expense
          </button>
        </div>
        <div className="space-y-3">
          {categories.filter(cat => cat.type === 'expense').map((category) => (
            <div key={category.id} className="grid grid-cols-12 gap-3">
              <div className="col-span-7">
                <div className="relative">
                  <select
                    value={category.category}
                    onChange={(e) => handleChange(category.id, 'category', e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-colors"
                  >
                    {DEFAULT_EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-lg">
                      {DEFAULT_EXPENSE_CATEGORIES.find(cat => cat.label === category.category)?.icon}
                    </span>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={category.amount}
                    onChange={(e) => handleChange(category.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => handleRemoveCategory(category.id)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total Income:</span>
            <span className="font-medium text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total Expenses:</span>
            <span className="font-medium text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-900 dark:text-white">Savings:</span>
            <span className={savings >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              ${savings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={copyToChat}
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied to Chat
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Generate & Copy to Chat
          </>
        )}
      </button>
    </div>
  );
}