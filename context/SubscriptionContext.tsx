import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getSubscriptionStatus, SubscriptionStatus } from '../lib/stripe';

type SubscriptionContextType = {
  status: SubscriptionStatus | null;
  isLoading: boolean;
  error: string | null;
  refreshStatus: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchStatus = async () => {
    if (!currentUser) {
      setStatus(null);
      setIsLoading(false);
      return;
    }

    try {
      const subscriptionStatus = await getSubscriptionStatus(currentUser.uid);
      setStatus(subscriptionStatus);
    } catch (err) {
      setError('Failed to fetch subscription status');
      console.error('Error fetching subscription status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [currentUser]);

  const refreshStatus = async () => {
    setIsLoading(true);
    await fetchStatus();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        status,
        isLoading,
        error,
        refreshStatus
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}