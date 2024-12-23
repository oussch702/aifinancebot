import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import ChatMessageActions from './ChatMessageActions';
import ChatMessageContent from './ChatMessageContent';
import ChatLoadingIndicator from './ChatLoadingIndicator';
import VoiceSettingsModal from '../VoiceSettingsModal';
import SaveAdviceModal from '../SaveAdviceModal';
import { useAdvice } from '../../context/AdviceContext';

type ChatMessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
  isLatest: boolean;
  isLoading?: boolean;
};

export default function ChatMessage({ message, isLatest, isLoading }: ChatMessageProps) {
  const { saveAdvice } = useAdvice();
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: null as SpeechSynthesisVoice | null,
    rate: 1,
    pitch: 1
  });

  const isUser = message.role === 'user';

  const handleSaveAdvice = async (title: string, tags: string[]) => {
    await saveAdvice({
      title,
      content: message.content,
      tags,
      date: new Date().toISOString()
    });
    setShowSaveModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}
    >
      <div className={`flex items-start max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-indigo-100 dark:bg-indigo-900'
              : 'bg-green-100 dark:bg-green-900'
          }`}>
            {isUser ? (
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Bot className="h-5 w-5 text-green-600 dark:text-green-400" />
            )}
          </div>
        </div>

        <div className="relative flex-1">
          {!isUser && (
            <ChatMessageActions
              message={message}
              onSettingsClick={() => setShowVoiceSettings(true)}
              onSaveAdvice={() => setShowSaveModal(true)}
              voiceSettings={voiceSettings}
            />
          )}
          
          {isLoading && isLatest && !isUser ? (
            <ChatLoadingIndicator />
          ) : (
            <ChatMessageContent message={message} />
          )}
        </div>
      </div>

      {showVoiceSettings && (
        <VoiceSettingsModal
          onClose={() => setShowVoiceSettings(false)}
          onSave={setVoiceSettings}
          currentSettings={voiceSettings}
        />
      )}

      {showSaveModal && (
        <SaveAdviceModal
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveAdvice}
        />
      )}
    </motion.div>
  );
}