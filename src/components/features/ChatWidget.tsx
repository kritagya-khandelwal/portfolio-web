'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Simple markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Keep it simple and safe
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        h1: ({ children }) => <h1 className="text-base font-bold mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm font-bold mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm">{children}</li>,
        code: ({ children, className }) => {
          const isInline = !className;
          return isInline ? (
            <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs">
              {children}
            </code>
          ) : (
            <code className="block bg-gray-200 text-gray-800 p-2 rounded text-xs overflow-x-auto">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto mb-2">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-amber-500 pl-3 italic text-gray-700 mb-2">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 underline"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Kritagya's AI assistant. Ask me anything about his work, experience, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let assistantMessage = '';
      const assistantMessageId = (Date.now() + 1).toString();

      // Add initial assistant message
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        text: '',
        isUser: false,
        timestamp: new Date(),
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6); // Remove 'data: ' prefix
              if (jsonStr.trim() === '') continue;
              
              const data = JSON.parse(jsonStr);
              
              if (data.type === 'chunk' && data.content) {
                assistantMessage += data.content;
                
                // Update the assistant message with typing effect
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, text: assistantMessage }
                    : msg
                ));
                
                // Add a small delay for typing effect
                await new Promise(resolve => setTimeout(resolve, 10));
              }
            } catch (parseError) {
              console.warn('Failed to parse JSON chunk:', parseError);
              // If JSON parsing fails, treat as plain text
              assistantMessage += line;
              setMessages(prev => prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, text: assistantMessage }
                  : msg
              ));
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-amber-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-amber-700 transition-colors duration-200 z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[500px] max-w-sm sm:max-w-none bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-amber-600 text-white p-3 sm:p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <Bot size={16} className="sm:w-5 sm:h-5" />
                <h3 className="font-semibold text-sm sm:text-base">Chat with Kritagya's AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-6 sm:py-8">
                  <Bot size={36} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                  <p className="text-sm sm:text-base">Ask me anything about my work, skills, or projects!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 sm:gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`
                      max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg
                      ${message.isUser
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                      }
                    `}
                  >
                    {message.isUser ? (
                      <p className="text-xs sm:text-sm">{message.text}</p>
                    ) : (
                      <div className="text-xs sm:text-sm prose prose-sm max-w-none">
                        <MarkdownRenderer content={message.text} />
                      </div>
                    )}
                  </div>
                  
                  {message.isUser && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={12} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 sm:gap-3"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <Bot size={12} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 