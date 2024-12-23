import React, { useState, useEffect } from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type AudioRecorderProps = {
  onTranscript: (text: string) => void;
};

export default function AudioRecorder({ onTranscript }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  const startRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex items-center space-x-2 text-yellow-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Browser doesn't support speech recognition.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="inline-flex items-center space-x-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Mic className={`h-4 w-4 ${listening ? 'animate-pulse' : ''}`} />
          <span>Start Recording</span>
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="inline-flex items-center space-x-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Square className="h-4 w-4" />
          <span>Stop Recording</span>
        </button>
      )}
      {listening && (
        <span className="text-sm text-gray-500">
          Recording in progress...
        </span>
      )}
    </div>
  );
}