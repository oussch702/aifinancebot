import React from 'react';
import ChatInterface from './ChatInterface';

type ChatSidebarProps = {
  initialInput?: string;
};

export default function ChatSidebar({ initialInput }: ChatSidebarProps) {
  return (
    <div className="h-[calc(100vh-16rem)] sticky top-8">
      <ChatInterface initialInput={initialInput} />
    </div>
  );
}