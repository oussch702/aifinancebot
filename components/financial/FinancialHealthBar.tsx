import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import HealthMetrics from './HealthMetrics';
import HealthIndicators from './HealthIndicators';
import HealthRecommendations from './HealthRecommendations';
import HealthLoadingState from './HealthLoadingState';

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

  if (isLoading) {
    return <HealthLoadingState />;
  }

  const currentConfig = zoneConfig[zone];
  const Icon = currentConfig.icon;

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
      <HealthMetrics metrics={metrics} />

      {/* Zone Indicators */}
      <HealthIndicators currentZone={zone} />

      {/* Recommendations */}
      <HealthRecommendations tips={tips} config={currentConfig} />
    </motion.div>
  );
}