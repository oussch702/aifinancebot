import React, { createContext, useContext, useState } from 'react';
import { getAIResponse } from '../lib/openai';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatContextType = {
  messages: Message[];
  addMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  isLoading: boolean;
  error: string | null;
};

const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: async () => {},
  clearMessages: () => {},
  isLoading: false,
  error: null
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = async (content: string) => {
    setError(null);
    
    // Add user message immediately
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading state
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse([...messages, userMessage]);
      
      // Add AI response
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse || 'I apologize, but I was unable to generate a response. Please try again.'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Error getting response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        error
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}