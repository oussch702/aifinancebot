import React, { useState } from 'react';
import { Volume2, VolumeX, Settings, Bookmark } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

type ChatMessageActionsProps = {
  message: {
    content: string;
  };
  onSettingsClick: () => void;
  onSaveAdvice: () => void;
  voiceSettings: {
    voice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;
  };
};

export default function ChatMessageActions({
  message,
  onSettingsClick,
  onSaveAdvice,
  voiceSettings
}: ChatMessageActionsProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis = window.speechSynthesis;

  const speakText = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
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

  return (
    <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2 py-1 border border-gray-200 dark:border-gray-700">
        <button
          onClick={isSpeaking ? stopSpeaking : speakText}
          className={`p-1.5 rounded-lg transition-colors ${
            isSpeaking 
              ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
              : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
          }`}
          title={isSpeaking ? "Stop speaking" : "Play text"}
        >
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <button
          onClick={onSettingsClick}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Voice settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        <button
          onClick={onSaveAdvice}
          className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900"
          title="Save advice"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}