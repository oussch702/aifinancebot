import React from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2 } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

type NotesListProps = {
  onEditNote: (note: any) => void;
};

export default function NotesList({ onEditNote }: NotesListProps) {
  const { notes, deleteNote, reorderNotes } = useNotes();

  const todayNotes = notes.filter(note => {
    const noteDate = new Date(note.date).toDateString();
    const today = new Date().toDateString();
    return noteDate === today;
  }).sort((a, b) => a.order - b.order);

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  const handleDragEnd = (result: any) => {
    reorderNotes(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todayNotes">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4"
          >
            {todayNotes.length > 0 ? (
              <div className="space-y-4">
                {todayNotes.map((note, index) => (
                  <Draggable
                    key={note.id}
                    draggableId={note.id}
                    index={index}
                  >
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
                      >
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
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onEditNote(note)}
                              className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-white dark:hover:bg-gray-600"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-white dark:hover:bg-gray-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">
                  No notes for today. Add one to get started!
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}