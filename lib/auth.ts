import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// User roles
export type UserRole = 'user' | 'admin';

// User types
export type PlatformUser = {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user';
  createdAt: Date;
  subscription?: {
    status: string;
    plan: string;
    currentPeriodEnd?: Date;
  };
};

export type AdminUser = {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin';
  createdAt: Date;
  permissions: string[];
};

// Auth functions for platform users
export const platformAuth = {
  signIn: async (email: string, password: string): Promise<PlatformUser> => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify user role
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist (for existing Firebase users)
        const userData: PlatformUser = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || undefined,
          role: 'user',
          createdAt: new Date(),
          subscription: {
            status: 'trial',
            plan: 'free'
          }
        };
        await setDoc(doc(db, 'users', user.uid), userData);
        return userData;
      }
      
      if (userDoc.data().role !== 'user') {
        await auth.signOut();
        throw new Error('Invalid user account');
      }
      
      return userDoc.data() as PlatformUser;
    } catch (error: any) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      throw error;
    }
  },

  signUp: async (email: string, password: string, displayName?: string): Promise<PlatformUser> => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document
      const userData: PlatformUser = {
        uid: user.uid,
        email: user.email!,
        displayName,
        role: 'user',
        createdAt: new Date(),
        subscription: {
          status: 'trial',
          plan: 'free'
        }
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email address is already in use');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      }
      throw error;
    }
  },

  signOut: async () => {
    const auth = getAuth();
    await auth.signOut();
  }
};

// Auth functions for admin users
export const adminAuth = {
  signIn: async (email: string, password: string): Promise<AdminUser> => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify admin role
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        await auth.signOut();
        throw new Error('Unauthorized access');
      }
      
      return adminDoc.data() as AdminUser;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      throw error;
    }
  },

  signOut: async () => {
    const auth = getAuth();
    await auth.signOut();
  }
};

// Helper function to check if user is admin
export const isAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  
  try {
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    return adminDoc.exists() && adminDoc.data().role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};