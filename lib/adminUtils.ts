import { db } from './firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  Timestamp,
  getDoc,
  doc
} from 'firebase/firestore';

const handleFirebaseError = (error: any, fallbackMessage: string) => {
  console.error(error);
  if (error.code === 'failed-precondition' || error.code === 'unavailable') {
    throw new Error('Network connection error. Please check your internet connection.');
  }
  throw new Error(fallbackMessage);
};

export async function getAdminStats() {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const subscriptionsSnapshot = await getDocs(
      query(collection(db, 'users'), where('subscriptionStatus', '==', 'active'))
    );

    // Calculate total revenue
    let totalRevenue = 0;
    subscriptionsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.lastPaymentAmount) {
        totalRevenue += data.lastPaymentAmount;
      }
    });

    return {
      totalUsers: usersSnapshot.size,
      activeSubscriptions: subscriptionsSnapshot.size,
      totalRevenue,
      conversionRate: (subscriptionsSnapshot.size / usersSnapshot.size) * 100 || 0
    };
  } catch (error) {
    handleFirebaseError(error, 'Failed to fetch admin statistics');
    return {
      totalUsers: 0,
      activeSubscriptions: 0,
      totalRevenue: 0,
      conversionRate: 0
    };
  }
}

export async function getRecentUsers(limitCount: number = 5) {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    handleFirebaseError(error, 'Failed to fetch recent users');
    return [];
  }
}

export async function getRecentSubscriptions(limitCount: number = 5) {
  try {
    const subscriptionsQuery = query(
      collection(db, 'users'),
      where('subscriptionStatus', 'in', ['active', 'trialing']),
      orderBy('currentPeriodEnd', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(subscriptionsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    handleFirebaseError(error, 'Failed to fetch recent subscriptions');
    return [];
  }
}

export async function getRevenueData() {
  try {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7); // YYYY-MM format
    }).reverse();

    const revenueData = last12Months.map(month => ({
      month,
      revenue: 0,
      subscriptions: 0
    }));

    const subscriptionsSnapshot = await getDocs(
      query(collection(db, 'users'), where('subscriptionStatus', 'in', ['active', 'trialing']))
    );

    subscriptionsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.lastPaymentDate) {
        const paymentMonth = new Date(data.lastPaymentDate).toISOString().slice(0, 7);
        const monthData = revenueData.find(d => d.month === paymentMonth);
        if (monthData) {
          monthData.revenue += data.lastPaymentAmount || 0;
          monthData.subscriptions += 1;
        }
      }
    });

    return revenueData;
  } catch (error) {
    handleFirebaseError(error, 'Failed to fetch revenue data');
    return [];
  }
}