'use client';

import React, { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatContainer() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Echo Chat</h2>
            <p className="text-xs text-blue-100 mt-1">
              Type a message or use speech recognition
            </p>
          </div>
          <button
            onClick={clearChat}
            className="bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded-full text-sm transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-medium text-gray-500">No messages yet</p>
            <p className="text-sm text-gray-400 mt-1">Start the conversation below</p>
          </div>
        )}
        
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mt-4 mb-2 text-sm border border-red-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input Area */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
