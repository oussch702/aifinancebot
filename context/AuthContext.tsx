import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { platformAuth, adminAuth, PlatformUser, AdminUser, isAdmin } from '../lib/auth';

type AuthContextType = {
  currentUser: User | null;
  platformUser: PlatformUser | null;
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInAdmin: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [platformUser, setPlatformUser] = useState<PlatformUser | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Check if admin
          if (await isAdmin(user)) {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            if (adminDoc.exists()) {
              setAdminUser(adminDoc.data() as AdminUser);
              setPlatformUser(null);
            }
          } else {
            // Regular user
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setPlatformUser(userDoc.data() as PlatformUser);
              setAdminUser(null);
            }
          }
        } catch (err) {
          console.error('Error loading user data:', err);
          setError('Failed to load user data');
          // Sign out on error to prevent invalid states
          auth.signOut();
        }
      } else {
        setPlatformUser(null);
        setAdminUser(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await platformAuth.signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await platformAuth.signUp(email, password, displayName);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signInAdmin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await adminAuth.signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (adminUser) {
        await adminAuth.signOut();
      } else {
        await platformAuth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        platformUser,
        adminUser,
        isAuthenticated: !!platformUser,
        isAdminAuthenticated: !!adminUser,
        isLoading,
        error,
        signIn,
        signUp,
        signInAdmin,
        signOut
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}