import React, { useEffect, useState } from 'react';
import { getRecentSubscriptions } from '../../lib/adminUtils';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';

type SubscriptionData = {
  id: string;
  email: string;
  displayName: string;
  subscriptionStatus: string;
  currentPeriodEnd: { toDate: () => Date };
  lastPaymentAmount: number;
};

export default function AdminSubscriptionsList({ limit = 5 }) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getRecentSubscriptions(limit);
        setSubscriptions(data as SubscriptionData[]);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscriptions();
  }, [limit]);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Recent Subscriptions</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="p-6 flex items-center justify-between hover:bg-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {subscription.displayName || subscription.email}
                </p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <p className="text-xs text-gray-400">
                    Renews {subscription.currentPeriodEnd.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-white">
                    {subscription.lastPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <span className={`text-xs ${
                  subscription.subscriptionStatus === 'active'
                    ? 'text-green-400'
                    : 'text-yellow-400'
                }`}>
                  {subscription.subscriptionStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}