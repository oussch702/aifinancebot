import { useMemo } from 'react';
import { useFinancial } from '../context/FinancialContext';

export function useFinancialHealth() {
  const { transactions, getTotalsByType } = useFinancial();
  
  return useMemo(() => {
    const { income, expenses } = getTotalsByType();
    
    // Calculate key financial metrics
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    const expenseRatio = income > 0 ? (expenses / income) * 100 : 100;
    const monthlySavings = income - expenses;
    
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
    if (income > 0) baseScore += 20;
    
    // Emergency fund potential (10% weight)
    if (monthlySavings >= expenses * 0.5) baseScore += 10;
    else if (monthlySavings > 0) baseScore += 5;

    // Calculate category distribution
    const categoryDistribution = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const totalExpenses = Object.values(categoryDistribution).reduce((a, b) => a + b, 0);
    
    const categories = Object.entries(categoryDistribution)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      score: baseScore,
      metrics: {
        income,
        expenses,
        savingsRate,
        expenseRatio,
        monthlySavings,
        categories
      },
      zone: baseScore >= 70 ? 'green' : baseScore >= 40 ? 'yellow' : 'red'
    };
  }, [transactions, getTotalsByType]);
}