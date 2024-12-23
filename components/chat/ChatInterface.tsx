import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../../context/ChatContext';

type ChatInterfaceProps = {
  initialInput?: string;
};

export default function ChatInterface({ initialInput = '' }: ChatInterfaceProps) {
  const { isLoading } = useChat();
  const [input, setInput] = useState(initialInput);

  // Update input when initialInput changes
  useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
    }
  }, [initialInput]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages />
      </div>
      <div className="flex-shrink-0">
        <ChatInput 
          value={input}
          onChange={setInput}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}