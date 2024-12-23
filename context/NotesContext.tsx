import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { useAuth } from './AuthContext';
import * as db from '../lib/db';

export type Note = {
  id: string;
  content: string;
  date: string;
  category?: string;
  tags?: string[];
  order: number;
  isLoading?: boolean;
};

type NotesContextType = {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'order'>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  getNotesByDate: (date: string) => Note[];
  reorderNotes: (result: DropResult) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadNotes = async () => {
      if (!currentUser) {
        setNotes([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userNotes = await db.getNotes(currentUser.uid);
        setNotes(userNotes as Note[]);
      } catch (err) {
        setError('Failed to load notes');
        console.error('Error loading notes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, [currentUser]);

  const addNote = async (note: Omit<Note, 'id' | 'order'>) => {
    if (!currentUser) return;

    const tempId = `temp-${Date.now()}`;
    const tempNote = {
      ...note,
      id: tempId,
      order: notes.length,
      isLoading: true
    };

    // Add temporary note immediately
    setNotes(prev => [...prev, tempNote]);

    try {
      // Add note to database
      const addedNote = await db.addNote(currentUser.uid, note);
      
      // Replace temporary note with real one
      setNotes(prev => prev.map(n => 
        n.id === tempId ? { ...addedNote as Note, isLoading: false } : n
      ));
    } catch (err) {
      // Remove temporary note on error
      setNotes(prev => prev.filter(n => n.id !== tempId));
      setError('Failed to add note');
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    if (!currentUser) return;

    // Mark note as loading
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isLoading: true } : note
    ));

    try {
      await db.deleteNote(currentUser.uid, id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      // Remove loading state on error
      setNotes(prev => prev.map(note =>
        note.id === id ? { ...note, isLoading: false } : note
      ));
      setError('Failed to delete note');
      throw err;
    }
  };

  const updateNote = async (id: string, updatedFields: Partial<Note>) => {
    if (!currentUser) return;

    // Mark note as loading
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isLoading: true } : note
    ));

    try {
      await db.updateNote(currentUser.uid, id, updatedFields);
      setNotes(prev => prev.map(note =>
        note.id === id ? { ...note, ...updatedFields, isLoading: false } : note
      ));
    } catch (err) {
      // Remove loading state on error
      setNotes(prev => prev.map(note =>
        note.id === id ? { ...note, isLoading: false } : note
      ));
      setError('Failed to update note');
      throw err;
    }
  };

  const getNotesByDate = (date: string) => {
    return notes
      .filter(note => note.date.split('T')[0] === date)
      .sort((a, b) => a.order - b.order);
  };

  const reorderNotes = async (result: DropResult) => {
    if (!currentUser) return;

    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const date = new Date().toISOString().split('T')[0];
      const todayNotes = getNotesByDate(date);
      const otherNotes = notes.filter(note => 
        note.date.split('T')[0] !== date
      );

      const reorderedNotes = Array.from(todayNotes);
      const [movedNote] = reorderedNotes.splice(source.index, 1);
      reorderedNotes.splice(destination.index, 0, movedNote);

      const updatedTodayNotes = reorderedNotes.map((note, index) => ({
        ...note,
        order: index
      }));

      // Update order in database
      for (const note of updatedTodayNotes) {
        await db.updateNote(currentUser.uid, note.id, { order: note.order });
      }

      setNotes([...otherNotes, ...updatedTodayNotes]);
    } catch (err) {
      setError('Failed to reorder notes');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        getNotesByDate,
        reorderNotes,
        isLoading,
        error
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}