import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as db from '../lib/db';

export type Transaction = {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
};

type FinancialContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  clearTransactions: () => void;
  getTransactionsByDateRange: (startDate: string, endDate: string) => Transaction[];
  getTransactionsByCategory: (category: string) => Transaction[];
  getTotalsByType: () => { income: number; expenses: number };
  isLoading: boolean;
  error: string | null;
};

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Load user's transactions when they log in
  useEffect(() => {
    const loadTransactions = async () => {
      if (!currentUser) {
        setTransactions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userTransactions = await db.getTransactions(currentUser.uid);
        setTransactions(userTransactions as Transaction[]);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error loading transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [currentUser]);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!currentUser) return;

    setIsLoading(true);
    setError(null);

    try {
      await db.addTransaction(currentUser.uid, transaction);
      const updatedTransactions = await db.getTransactions(currentUser.uid);
      setTransactions(updatedTransactions as Transaction[]);
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!currentUser) return;

    setIsLoading(true);
    setError(null);

    try {
      await db.deleteTransaction(currentUser.uid, id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const getTransactionsByDateRange = (startDate: string, endDate: string) => {
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  };

  const getTransactionsByCategory = (category: string) => {
    return transactions.filter(t => t.category === category);
  };

  const getTotalsByType = () => {
    return transactions.reduce(
      (acc, t) => ({
        income: acc.income + (t.type === 'income' ? t.amount : 0),
        expenses: acc.expenses + (t.type === 'expense' ? t.amount : 0),
      }),
      { income: 0, expenses: 0 }
    );
  };

  return (
    <FinancialContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        clearTransactions,
        getTransactionsByDateRange,
        getTransactionsByCategory,
        getTotalsByType,
        isLoading,
        error
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}