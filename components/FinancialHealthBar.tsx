import React, { useMemo, useEffect, useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HealthZone = 'red' | 'yellow' | 'green';

export default function FinancialHealthBar() {
  const { transactions, getTotalsByType } = useFinancial();
  const [prevScore, setPrevScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for analysis
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [transactions]);

  const { healthScore, zone, tips, metrics } = useMemo(() => {
    const { income: totalIncome, expenses: totalExpenses } = getTotalsByType();
    
    // Calculate key financial metrics
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 100;
    const monthlySavings = totalIncome - totalExpenses;
    
    // Calculate health score based on multiple factors
    let baseScore = 0;
    
    // Savings rate scoring (40% weight)
    if (savingsRate >= 20) baseScore += 40;
    else if (savingsRate >= 10) baseScore += 30;
    else if (savingsRate >= 5) baseScore += 20;
    else if (savingsRate > 0) baseScore += 10;
    
    // Expense ratio scoring (30% weight)
    if (expenseRatio <= 50) baseScore += 30;
    else if (expenseRatio <= 70) baseScore += 20;
    else if (expenseRatio <= 90) baseScore += 10;
    
    // Income stability (20% weight)
    if (totalIncome > 0) baseScore += 20;
    
    // Emergency fund potential (10% weight)
    if (monthlySavings >= totalExpenses * 0.5) baseScore += 10;
    else if (monthlySavings > 0) baseScore += 5;

    // Determine zone
    let currentZone: HealthZone = 'red';
    if (baseScore >= 40 && baseScore < 70) currentZone = 'yellow';
    if (baseScore >= 70) currentZone = 'green';
    
    // Zone-specific tips based on actual financial data
    const zoneTips = {
      red: [
        monthlySavings <= 0 
          ? "Your expenses exceed your income. Focus on reducing non-essential spending."
          : `Build an emergency fund with your current savings of ${monthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
        expenseRatio > 90 
          ? "Your expenses are too high relative to income. Aim to reduce them by 20%."
          : "Look for ways to increase your income through side hustles or career growth.",
        savingsRate < 5 
          ? `Try to save at least 5% of your income (${(totalIncome * 0.05).toLocaleString('en-US', { style: 'currency', currency: 'USD' })})`
          : "Maintain consistent savings habits to improve financial health."
      ],
      yellow: [
        savingsRate < 15
          ? `Increase your savings rate to 15% (${(totalIncome * 0.15).toLocaleString('en-US', { style: 'currency', currency: 'USD' })})`
          : "Good progress! Consider investing your surplus savings.",
        expenseRatio > 70
          ? "Reduce your expense ratio to below 70% for better financial health"
          : "Your expense management is improving. Keep optimizing!",
        monthlySavings > 0
          ? `Current savings: ${monthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. Aim to increase this by 10%`
          : "Focus on maintaining positive monthly savings"
      ],
      green: [
        `Excellent savings rate of ${savingsRate.toFixed(1)}%`,
        monthlySavings > totalExpenses * 0.5
          ? "Great job maintaining high savings relative to expenses"
          : "Consider increasing emergency fund to 6 months of expenses",
        `Explore investment opportunities for your surplus savings of ${monthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
      ]
    };

    return {
      healthScore: baseScore,
      zone: currentZone,
      tips: zoneTips[currentZone],
      metrics: {
        savingsRate,
        expenseRatio,
        monthlyIncome: totalIncome,
        monthlyExpenses: totalExpenses,
        monthlySavings
      }
    };
  }, [transactions, getTotalsByType]);

  useEffect(() => {
    setPrevScore(healthScore);
  }, [healthScore]);

  const zoneConfig = {
    red: {
      icon: AlertCircle,
      title: 'Needs Attention',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/50',
      border: 'border-red-200 dark:border-red-800',
      progress: 'bg-red-500 dark:bg-red-600'
    },
    yellow: {
      icon: TrendingUp,
      title: 'Making Progress',
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/50',
      border: 'border-yellow-200 dark:border-yellow-800',
      progress: 'bg-yellow-500 dark:bg-yellow-600'
    },
    green: {
      icon: CheckCircle,
      title: 'Excellent',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/50',
      border: 'border-green-200 dark:border-green-800',
      progress: 'bg-green-500 dark:bg-green-600'
    }
  };

  const currentConfig = zoneConfig[zone];
  const Icon = currentConfig.icon;

  if (isLoading) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Progress Bar Loading */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gray-300 dark:bg-gray-600"
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        {/* Financial Metrics Loading */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[0, 1].map((i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2" />
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Zone Indicators Loading */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>

        {/* Recommendations Loading */}
        <div className="space-y-4">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg border ${currentConfig.border} ${currentConfig.bg}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${currentConfig.color}`} />
          <div>
            <h3 className={`font-semibold ${currentConfig.color}`}>
              Financial Health Score
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentConfig.title}</p>
          </div>
        </div>
        <motion.span
          key={healthScore}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl font-bold ${currentConfig.color}`}
        >
          {Math.round(healthScore)}%
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
        <motion.div
          className={`h-full ${currentConfig.progress}`}
          initial={{ width: `${prevScore}%` }}
          animate={{ width: `${healthScore}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Financial Metrics */}
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

      {/* Zone Indicators */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-center">
        <div className={`p-1 rounded ${zone === 'red' ? 'bg-red-500 dark:bg-red-600 text-white' : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'}`}>
          Needs Work
        </div>
        <div className={`p-1 rounded ${zone === 'yellow' ? 'bg-yellow-500 dark:bg-yellow-600 text-white' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400'}`}>
          Getting There
        </div>
        <div className={`p-1 rounded ${zone === 'green' ? 'bg-green-500 dark:bg-green-600 text-white' : 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'}`}>
          Excellent
        </div>
      </div>

      {/* Dynamic Recommendations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={zone}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <h4 className="font-medium text-gray-900 dark:text-white">Recommended Actions:</h4>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2"
              >
                <div className={`mt-1 h-2 w-2 rounded-full ${currentConfig.progress}`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}