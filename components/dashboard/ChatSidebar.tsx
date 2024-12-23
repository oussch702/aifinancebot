import React, { useState } from 'react';
import ChatInterface from '../chat/ChatInterface';
import SuggestedQuestions from '../chat/SuggestedQuestions';

export default function ChatSidebar() {
  const [chatInput, setChatInput] = useState('');

  const handlePromptCopy = (prompt: string) => {
    setChatInput(prompt);
  };

  const handleSelectQuestion = (question: string) => {
    setChatInput(question);
  };

  return (
    <div className="space-y-6">
      <div className="h-[calc(100vh-24rem)]">
        <ChatInterface initialInput={chatInput} />
      </div>
      <SuggestedQuestions onSelectQuestion={handleSelectQuestion} />
    </div>
  );
}