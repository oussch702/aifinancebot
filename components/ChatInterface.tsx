import React, { useState, useRef } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import VoiceSettingsModal from './VoiceSettingsModal';
import SaveAdviceModal from './SaveAdviceModal';
import { useChat } from '../context/ChatContext';
import { useAdvice } from '../context/AdviceContext';

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

type ChatInterfaceProps = {
  initialInput?: string;
};

export default function ChatInterface({ initialInput = '' }: ChatInterfaceProps) {
  const { messages, addMessage, isLoading, error } = useChat();
  const { saveAdvice } = useAdvice();
  const [input, setInput] = useState(initialInput);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: null as SpeechSynthesisVoice | null,
    rate: 1,
    pitch: 1
  });
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const speechSynthesis = window.speechSynthesis;

  // Update input when initialInput changes
  React.useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollTop = inputRef.current.scrollHeight;
      }
    }
  }, [initialInput]);

  const speakText = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceSettings.voice) utterance.voice = voiceSettings.voice;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await addMessage(message);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSaveAdvice = async (title: string, tags: string[]) => {
    if (selectedMessage) {
      await saveAdvice({
        title,
        content: selectedMessage,
        tags,
        date: new Date().toISOString()
      });
      setShowSaveModal(false);
      setSelectedMessage(null);
    }
  };

  const allMessages = [WELCOME_MESSAGE, ...messages];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {allMessages.map((message, index) => (
            <ChatMessage
              key={index}
              type={message.role}
              content={message.content}
              isLatest={index === allMessages.length - 1}
              isLoading={isLoading && index === allMessages.length - 1}
              onSpeak={() => speakText(message.content)}
              onStop={stopSpeaking}
              onSettingsClick={() => setShowVoiceSettings(true)}
              onSaveAdvice={() => {
                setSelectedMessage(message.content);
                setShowSaveModal(true);
              }}
              isSpeaking={isSpeaking}
            />
          ))}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/50 rounded-lg text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your finances..."
            className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute bottom-3 right-3 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showVoiceSettings && (
          <VoiceSettingsModal
            onClose={() => setShowVoiceSettings(false)}
            onSave={setVoiceSettings}
            currentSettings={voiceSettings}
          />
        )}

        {showSaveModal && selectedMessage && (
          <SaveAdviceModal
            onClose={() => {
              setShowSaveModal(false);
              setSelectedMessage(null);
            }}
            onSave={handleSaveAdvice}
          />
        )}
      </AnimatePresence>
    </div>
  );
}