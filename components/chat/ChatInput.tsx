import React from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
};

export default function ChatInput({ value, onChange, isLoading }: ChatInputProps) {
  const { addMessage } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;

    onChange('');
    await addMessage(value.trim());
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask me anything about your finances..."
          className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute bottom-3 right-3 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}