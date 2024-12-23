import React from 'react';
import { GripVertical } from 'lucide-react';

export default function NoteDragHandle() {
  return (
    <div className="cursor-move p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
      <GripVertical className="h-4 w-4" />
    </div>
  );
}