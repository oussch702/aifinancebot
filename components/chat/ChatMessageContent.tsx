import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMessageContentProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
};

export default function ChatMessageContent({ message }: ChatMessageContentProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`px-4 py-3 rounded-lg ${
      isUser
        ? 'bg-indigo-600 prose-p:text-white prose-strong:text-white prose-ul:text-white prose-li:text-white prose-headings:text-white'
        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
    } shadow-sm`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={`prose dark:prose-invert max-w-none prose-sm ${
          isUser ? 'text-white [&_*]:text-white' : ''
        } prose-headings:font-bold prose-h3:text-lg prose-p:leading-relaxed prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic`}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}