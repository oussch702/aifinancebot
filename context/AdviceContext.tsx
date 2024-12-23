import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';

export type Advice = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
  isLoading?: boolean;
};

type AdviceContextType = {
  savedAdvice: Advice[];
  saveAdvice: (advice: Omit<Advice, 'id'>) => Promise<void>;
  deleteAdvice: (id: string) => Promise<void>;
  searchAdvice: (query: string, tags: string[]) => Advice[];
  isLoading: boolean;
  error: string | null;
};

const AdviceContext = createContext<AdviceContextType | undefined>(undefined);

export function AdviceProvider({ children }: { children: React.ReactNode }) {
  const [savedAdvice, setSavedAdvice] = useState<Advice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadSavedAdvice = async () => {
      if (!currentUser) {
        setSavedAdvice([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const adviceRef = collection(db, 'users', currentUser.uid, 'savedAdvice');
        const q = query(adviceRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        
        const advice = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Advice[];
        
        setSavedAdvice(advice);
      } catch (err) {
        console.error('Error loading saved advice:', err);
        setError('Failed to load saved advice');
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedAdvice();
  }, [currentUser]);

  const saveAdvice = async (advice: Omit<Advice, 'id'>) => {
    if (!currentUser) return;

    const tempId = `temp-${Date.now()}`;
    const tempAdvice = {
      ...advice,
      id: tempId,
      isLoading: true
    };

    // Add temporary advice immediately
    setSavedAdvice(prev => [tempAdvice as Advice, ...prev]);

    try {
      const adviceRef = collection(db, 'users', currentUser.uid, 'savedAdvice');
      const docRef = await addDoc(adviceRef, {
        ...advice,
        userId: currentUser.uid,
        createdAt: new Date()
      });

      // Replace temporary advice with real one
      setSavedAdvice(prev => prev.map(a => 
        a.id === tempId 
          ? { ...advice, id: docRef.id, isLoading: false }
          : a
      ));
    } catch (err) {
      console.error('Error saving advice:', err);
      // Remove temporary advice on error
      setSavedAdvice(prev => prev.filter(a => a.id !== tempId));
      setError('Failed to save advice');
    }
  };

  const deleteAdvice = async (id: string) => {
    if (!currentUser) return;

    // Mark advice as loading
    setSavedAdvice(prev => prev.map(advice =>
      advice.id === id ? { ...advice, isLoading: true } : advice
    ));

    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'savedAdvice', id));
      setSavedAdvice(prev => prev.filter(advice => advice.id !== id));
    } catch (err) {
      console.error('Error deleting advice:', err);
      // Remove loading state on error
      setSavedAdvice(prev => prev.map(advice =>
        advice.id === id ? { ...advice, isLoading: false } : advice
      ));
      setError('Failed to delete advice');
    }
  };

  const searchAdvice = (query: string, tags: string[]) => {
    return savedAdvice.filter(advice => {
      const matchesQuery = query
        ? advice.title.toLowerCase().includes(query.toLowerCase()) ||
          advice.content.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesTags = tags.length > 0
        ? tags.every(tag => advice.tags.includes(tag))
        : true;

      return matchesQuery && matchesTags;
    });
  };

  return (
    <AdviceContext.Provider
      value={{
        savedAdvice,
        saveAdvice,
        deleteAdvice,
        searchAdvice,
        isLoading,
        error
      }}
    >
      {children}
    </AdviceContext.Provider>
  );
}

export function useAdvice() {
  const context = useContext(AdviceContext);
  if (context === undefined) {
    throw new Error('useAdvice must be used within an AdviceProvider');
  }
  return context;
}