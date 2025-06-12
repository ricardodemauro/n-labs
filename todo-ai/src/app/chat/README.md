# Simple Echo Chat App with Speech-to-Text

A simple chat application built with Next.js, React, TypeScript, and Tailwind CSS. This app demonstrates a basic chat interface where messages sent by the user are echoed back by the server. It also includes speech-to-text functionality for dictating messages.

## Features

- Clean, responsive UI built with Tailwind CSS
- Real-time message sending and receiving
- Speech-to-text input using the Web Speech API
- Message timestamps
- Loading states for better UX
- Error handling
- Clear chat functionality

## How It Works

1. User enters a message in the chat input or uses speech recognition to dictate a message
2. If using speech recognition, the user clicks the microphone icon and speaks - the transcript appears in the input field
3. Message is sent to the backend API endpoint
4. Backend simply echoes the message back
5. Both the user's message and the echoed message are displayed in the chat interface

## Project Structure

```text
src/
├── app/                    # App Router directory
│   ├── api/                
│   │   └── chat/          
│   │       └── route.ts    # API endpoint that echoes messages
│   └── chat/               
│       └── page.tsx        # Chat page component
├── components/             
│   └── features/           
│       └── chat/           
│           ├── ChatContainer.tsx  # Main chat container component
│           ├── ChatInput.tsx      # Input component with speech recognition
│           └── ChatMessage.tsx    # Component for displaying chat messages
├── hooks/                  
│   ├── useChat.ts          # Custom hook for chat functionality
│   └── useSpeechToText.ts  # Custom hook for speech recognition
└── types/                  
    └── chat.ts             # TypeScript types for chat features
```

## Getting Started

1. Navigate to the project directory:

   ```bash
   cd todo-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000/chat](http://localhost:3000/chat) in your browser to see the application.

## Technologies Used

- **Next.js**: React framework with App Router
- **React**: Frontend library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Web Speech API**: Browser API for speech recognition

## Further Enhancements

Here are some ideas to extend this simple chat application:

1. Add persistent storage (database)
2. Implement user authentication
3. Add typing indicators
4. Support for multimedia messages
5. Add more advanced AI responses instead of simple echo
