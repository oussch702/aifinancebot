import React from 'react';
import { Volume2, VolumeX, Settings, Bookmark } from 'lucide-react';

type VoiceControlsProps = {
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
  onSettingsClick: () => void;
  onSaveAdvice: () => void;
};

export default function VoiceControls({
  isSpeaking,
  onSpeak,
  onStop,
  onSettingsClick,
  onSaveAdvice
}: VoiceControlsProps) {
  return (
    <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700">
      <button
        onClick={isSpeaking ? onStop : onSpeak}
        className={`p-2 rounded-lg transition-colors ${
          isSpeaking 
            ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900'
            : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900'
        }`}
        title={isSpeaking ? "Stop speaking" : "Play text"}
      >
        {isSpeaking ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>

      <button
        onClick={onSettingsClick}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Voice settings"
      >
        <Settings className="h-4 w-4" />
      </button>

      <button
        onClick={onSaveAdvice}
        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
        title="Save advice"
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </div>
  );
}