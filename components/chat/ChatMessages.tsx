import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatLoadingIndicator from './ChatLoadingIndicator';
import { useChat } from '../../context/ChatContext';

const WELCOME_MESSAGE = {
  role: 'assistant' as const,
  content: `👋 Hello! I'm your AI financial advisor. I can help you with:

• Creating personalized budgets
• Investment strategies
• Debt management
• Savings goals
• Financial planning
• Tax optimization

How can I assist you today?`
};

export default function ChatMessages() {
  const { messages, isLoading } = useChat();
  const allMessages = [WELCOME_MESSAGE, ...messages];

  return (
    <div className="p-4 space-y-4">
      <AnimatePresence initial={false}>
        {allMessages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isLatest={index === allMessages.length - 1}
            isLoading={isLoading && index === allMessages.length - 1 && message.role === 'assistant'}
          />
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ChatLoadingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}