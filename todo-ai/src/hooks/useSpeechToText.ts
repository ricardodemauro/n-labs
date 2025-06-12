'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSpeechToTextProps {
  onResult?: (text: string) => void;
  continuous?: boolean;
  language?: string;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

// Define types for the SpeechRecognition API since TypeScript doesn't include them by default
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

// Window with SpeechRecognition
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

export function useSpeechToText({
  onResult,
  continuous = false,
  language = 'en-US',
}: UseSpeechToTextProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [supported, setSupported] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    const win = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser');
      setSupported(false);
      return;
    }
    
    setSupported(true);
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    setRecognition(recognition);
    
    // Clean up
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [continuous, language]);

  // Set up event handlers
  useEffect(() => {
    if (!recognition) return;
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      setTranscript(transcript);
      if (onResult) onResult(transcript);
    };
    
    interface SpeechRecognitionErrorEvent extends Event {
      error?: string;
    }
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Speech recognition error: ${event.error || 'Unknown error'}`);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition, onResult]);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not supported');
      return;
    }
    
    setError(null);
    setTranscript('');
    setIsListening(true);
    recognition.start();
  }, [recognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  }, [recognition]);

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    error,
    supported,
    startListening,
    stopListening,
    toggleListening,
  };
}
