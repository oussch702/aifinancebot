import React from 'react';
import { Tag, X } from 'lucide-react';

type NoteTagProps = {
  tag: string;
  onRemove?: () => void;
};

export default function NoteTag({ tag, onRemove }: NoteTagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
      <Tag className="h-3 w-3 mr-1" />
      {tag}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}