'use client';

import { useState } from 'react';
import type { Message, ChatState } from '@/types/chat';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Generate a random ID for the message
    const messageId = Math.random().toString(36).substring(2, 11);
    
    // Create a new user message
    const userMessage: Message = {
      id: messageId,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update state with user message
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Create system response message
      const systemMessage: Message = {
        id: Math.random().toString(36).substring(2, 11),
        content: data.reply,
        sender: 'system',
        timestamp: new Date(),
      };

      // Update state with system message
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, systemMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
    }
  };

  const clearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  };

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
    clearChat,
  };
}
