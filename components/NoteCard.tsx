import React from 'react';
import { Edit2, Trash2, Tag, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

type NoteCardProps = {
  note: {
    id: string;
    content: string;
    category?: string;
    tags?: string[];
    isLoading?: boolean;
  };
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
  isNew?: boolean;
};

export default function NoteCard({ note, onEdit, onDelete, isNew = false }: NoteCardProps) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg group relative ${
        note.isLoading ? 'opacity-50' : ''
      }`}
    >
      {note.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 dark:bg-gray-900/20 rounded-lg">
          <Loader className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-spin" />
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {note.content}
          </p>
          {note.tags && note.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {note.tags.map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            disabled={note.isLoading}
            className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            disabled={note.isLoading}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}