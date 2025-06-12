import React from 'react';
import type { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center mr-2 flex-shrink-0 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      )}
      
      <div 
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'} flex items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${isUser ? 'text-blue-200' : 'text-gray-400'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center ml-2 flex-shrink-0 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  );
}
