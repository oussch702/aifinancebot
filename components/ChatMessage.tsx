import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Volume2, VolumeX, Settings, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMessageProps = {
  type: 'user' | 'assistant' | 'system';
  content: string;
  isLatest: boolean;
  isLoading?: boolean;
  onSpeak?: () => void;
  onStop?: () => void;
  onSettingsClick?: () => void;
  onSaveAdvice?: () => void;
  isSpeaking?: boolean;
};

export default function ChatMessage({
  type,
  content,
  isLatest,
  isLoading,
  onSpeak,
  onStop,
  onSettingsClick,
  onSaveAdvice,
  isSpeaking = false
}: ChatMessageProps) {
  // Format the content for better readability if it's from the assistant
  const formattedContent = React.useMemo(() => {
    if (type === 'assistant') {
      return content
        // Add proper line breaks before lists and sections
        .replace(/(\d+\.|•|\*)\s/g, '\n$1 ')
        // Add emphasis to key numbers and percentages
        .replace(/(\d+(?:\.\d+)?%)/g, '**$1**')
        .replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g, '**$$$1**')
        // Add headers for sections
        .replace(/^([\w\s]+:)/gm, '### $1')
        // Add emphasis to important terms
        .replace(/(should|must|important|key|critical|essential|recommended)/gi, '**$1**')
        // Format tips and recommendations
        .replace(/(?:Tip|Recommendation|Note):\s*(.*)/g, '> 💡 $1')
        // Add bullet points for better readability
        .replace(/^(-|\*)\s/gm, '• ');
    }
    return content;
  }, [content, type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4 group`}
    >
      <div className={`flex items-start max-w-3xl ${type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${type === 'user' ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            type === 'user'
              ? 'bg-indigo-100 dark:bg-indigo-900'
              : 'bg-green-100 dark:bg-green-900'
          }`}>
            {type === 'user' ? (
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Bot className="h-5 w-5 text-green-600 dark:text-green-400" />
            )}
          </div>
        </div>

        <div className="relative flex-1">
          {/* Voice Controls */}
          {type === 'assistant' && onSpeak && onStop && onSettingsClick && onSaveAdvice && (
            <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2 py-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={isSpeaking ? onStop : onSpeak}
                  className={`p-1.5 rounded-lg transition-colors ${
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
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Voice settings"
                >
                  <Settings className="h-4 w-4" />
                </button>

                <button
                  onClick={onSaveAdvice}
                  className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
                  title="Save advice"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className={`px-4 py-3 rounded-lg ${
            type === 'user'
              ? 'bg-indigo-600 prose-p:text-white prose-strong:text-white prose-ul:text-white prose-li:text-white prose-headings:text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          } shadow-sm`}>
            {isLoading ? (
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`prose dark:prose-invert max-w-none prose-sm ${
                  type === 'user' ? 'text-white [&_*]:text-white' : ''
                } prose-headings:font-bold prose-h3:text-lg prose-p:leading-relaxed prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic`}
                components={{
                  p: ({ children }) => (
                    <p className={`mb-3 ${type === 'user' ? 'text-white' : ''}`}>
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className={type === 'user' ? 'text-white' : ''}>
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className={`space-y-2 ${type === 'user' ? 'text-white' : ''}`}>
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className={`flex items-start ${type === 'user' ? 'text-white' : ''}`}>
                      <span className="mr-2">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg">
                      {children}
                    </blockquote>
                  )
                }}
              >
                {formattedContent}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}