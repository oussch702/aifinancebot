import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type AdminAuthContextType = {
  adminUser: User | null;
  signInAdmin: (email: string, password: string) => Promise<void>;
  signOutAdmin: () => Promise<void>;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (adminDoc.exists() && adminDoc.data().role === 'admin') {
            setAdminUser(user);
          } else {
            await auth.signOut();
            setAdminUser(null);
            setError('Unauthorized access');
          }
        } catch (err) {
          console.error('Error verifying admin status:', err);
          setError('Failed to verify admin status');
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signInAdmin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // First check if Firebase is properly initialized
      if (!auth) {
        throw new Error('Authentication not initialized');
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify admin status
      const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));
      if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        await auth.signOut();
        throw new Error('Unauthorized access');
      }
    } catch (err: any) {
      console.error('Admin sign in error:', err);
      
      // Handle specific Firebase auth errors
      switch (err?.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection');
          break;
        default:
          if (err?.message === 'Unauthorized access') {
            setError('Unauthorized access. Please request admin access if needed.');
          } else {
            setError('Failed to sign in. Please try again.');
          }
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutAdmin = async () => {
    try {
      if (!auth) {
        throw new Error('Authentication not initialized');
      }
      await auth.signOut();
      setAdminUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        signInAdmin,
        signOutAdmin,
        isAdminAuthenticated: !!adminUser,
        isLoading,
        error
      }}
    >
      {!isLoading && children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}