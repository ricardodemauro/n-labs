'use client';

import React, { useState, useEffect } from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { 
    isListening, 
    transcript, 
    error: speechError, 
    supported: speechSupported,
    toggleListening 
  } = useSpeechToText({
    continuous: false,
    language: 'en-US',
  });

  // Update message when transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200">
      {speechError && (
        <div className="bg-yellow-100 text-yellow-700 p-2 text-xs text-center">
          {speechError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center p-4">
        <div className="flex-1 flex items-center relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          {speechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-2 p-2 rounded-full ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              disabled={isLoading}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                />
              </svg>
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition-colors ${
            isLoading || !message.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      
      {isListening && (
        <div className="bg-blue-100 text-blue-700 p-2 text-sm text-center animate-pulse">
          Listening... Speak now
        </div>
      )}
    </div>
  );
}
