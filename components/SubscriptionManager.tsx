import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { cancelSubscription, updateSubscriptionPlan } from '../lib/stripe';

export default function SubscriptionManager() {
  const { status, isLoading, refreshStatus } = useSubscription();
  const { currentUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubscription = async () => {
    if (!currentUser) return;

    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      await cancelSubscription(currentUser.uid);
      await refreshStatus();
    } catch (err) {
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePlan = async (isAnnual: boolean) => {
    if (!currentUser) return;

    setIsUpdating(true);
    setError(null);

    try {
      await updateSubscriptionPlan(currentUser.uid, isAnnual);
      await refreshStatus();
    } catch (err) {
      setError('Failed to update subscription plan. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Subscription Status
        </h3>

        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full ${
            status === 'active' || status === 'trialing'
              ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
          }`}>
            {status === 'active' || status === 'trialing' ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {status === 'trialing' ? 'Trial Period' :
               status === 'active' ? 'Active' :
               status === 'canceled' ? 'Canceled' :
               status === 'past_due' ? 'Past Due' : 'Inactive'}
            </p>
            {status === 'trialing' && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your trial ends in X days
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Plan Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Plan Selection
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Monthly Plan */}
          <div className="relative rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Monthly</h4>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Billed monthly at $20/month
            </p>
            <button
              onClick={() => handleUpdatePlan(false)}
              disabled={isUpdating}
              className="mt-4 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Select Monthly Plan
            </button>
          </div>

          {/* Annual Plan */}
          <div className="relative rounded-lg border-2 border-indigo-500 p-6">
            <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full">
              Save 35%
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Annual</h4>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Billed annually at $156/year ($13/month)
            </p>
            <button
              onClick={() => handleUpdatePlan(true)}
              disabled={isUpdating}
              className="mt-4 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Select Annual Plan
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Subscription */}
      {(status === 'active' || status === 'trialing') && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Cancel Subscription
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
          </p>
          <button
            onClick={handleCancelSubscription}
            disabled={isUpdating}
            className="px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}