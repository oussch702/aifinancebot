import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  Timestamp,
  addDoc,
  writeBatch
} from 'firebase/firestore';

// Notes
export const getNotes = async (userId: string) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes');
    const q = query(notesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt.toDate().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

export const addNote = async (userId: string, note: any) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes');
    const noteData = {
      ...note,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId
    };
    const docRef = await addDoc(notesRef, noteData);
    return {
      id: docRef.id,
      ...noteData,
      date: noteData.createdAt.toDate().toISOString()
    };
  } catch (error) {
    console.error('Error adding note:', error);
    throw new Error('Failed to add note');
  }
};

export const updateNote = async (userId: string, noteId: string, updates: any) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };
    await updateDoc(noteRef, updateData);
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Failed to update note');
  }
};

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw new Error('Failed to delete note');
  }
};

// Transactions
export const getTransactions = async (userId: string) => {
  try {
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    const q = query(transactionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt.toDate().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const addTransaction = async (userId: string, transaction: any) => {
  try {
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    const transactionData = {
      ...transaction,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId
    };
    await addDoc(transactionsRef, transactionData);
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

export const deleteTransaction = async (userId: string, transactionId: string) => {
  try {
    const transactionRef = doc(db, 'users', userId, 'transactions', transactionId);
    await deleteDoc(transactionRef);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
};

// Saved Advice
export const getSavedAdvice = async (userId: string) => {
  try {
    const adviceRef = collection(db, 'users', userId, 'savedAdvice');
    const q = query(adviceRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt.toDate().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching saved advice:', error);
    return [];
  }
};

export const saveAdvice = async (userId: string, advice: any) => {
  try {
    const adviceRef = collection(db, 'users', userId, 'savedAdvice');
    const adviceData = {
      ...advice,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId
    };
    await addDoc(adviceRef, adviceData);
  } catch (error) {
    console.error('Error saving advice:', error);
    throw new Error('Failed to save advice');
  }
};

export const deleteSavedAdvice = async (userId: string, adviceId: string) => {
  try {
    const adviceRef = doc(db, 'users', userId, 'savedAdvice', adviceId);
    await deleteDoc(adviceRef);
  } catch (error) {
    console.error('Error deleting saved advice:', error);
    throw new Error('Failed to delete saved advice');
  }
};

// Chat Messages
export const addChatMessage = async (userId: string, message: any) => {
  try {
    const messagesRef = collection(db, 'users', userId, 'chatMessages');
    const messageData = {
      ...message,
      createdAt: Timestamp.now(),
      userId
    };
    await addDoc(messagesRef, messageData);
  } catch (error) {
    console.error('Error adding chat message:', error);
    throw new Error('Failed to add chat message');
  }
};

export const getChatMessages = async (userId: string) => {
  try {
    const messagesRef = collection(db, 'users', userId, 'chatMessages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
};

export const clearChatMessages = async (userId: string) => {
  try {
    const messagesRef = collection(db, 'users', userId, 'chatMessages');
    const querySnapshot = await getDocs(messagesRef);
    
    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error clearing chat messages:', error);
    throw new Error('Failed to clear chat messages');
  }
};