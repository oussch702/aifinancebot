import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Calendar } from 'lucide-react';
import NotesList from '../notes/NotesList';
import NoteEditor from '../notes/NoteEditor';

export default function DailyNotes() {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Financial Notes
            </h3>
          </div>
          <button
            onClick={() => {
              setEditingNote(null);
              setShowNoteEditor(true);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Note
          </button>
        </div>
      </div>

      <NotesList onEditNote={setEditingNote} />

      {showNoteEditor && (
        <NoteEditor
          onClose={() => {
            setShowNoteEditor(false);
            setEditingNote(null);
          }}
          initialNote={editingNote}
        />
      )}
    </motion.div>
  );
}