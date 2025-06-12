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
    <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-4">
      {speechError && (
        <div className="bg-amber-50 text-amber-700 p-2 text-xs rounded-lg mb-3 flex items-center border border-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {speechError}
        </div>
      )}
      
      {isListening && (
        <div className="bg-blue-50 text-blue-700 p-2 text-sm rounded-lg mb-3 flex items-center border border-blue-100 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Listening... Speak now
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-3 px-4 focus:outline-none text-gray-700 placeholder-gray-400 rounded-l-xl"
            disabled={isLoading}
          />
          
          <div className="flex items-center pr-2 gap-1">
            {speechSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isListening
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
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
            
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className={`p-2 rounded-full ${
                message.trim() && !isLoading
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors duration-200`}
              aria-label="Send message"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
