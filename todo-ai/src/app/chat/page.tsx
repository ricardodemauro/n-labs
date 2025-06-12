import { ChatContainer } from '@/components/features/chat/ChatContainer';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Echo Chat
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            A modern chat interface with speech recognition. Send a message and the server will echo it back to you.
          </p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Try the speech recognition feature!
          </div>
        </div>
        
        <div className="h-[70vh] md:h-[600px] shadow-2xl rounded-2xl overflow-hidden bg-white backdrop-blur-sm bg-opacity-70 border border-gray-100">
          <ChatContainer />
        </div>
        
        <footer className="text-center mt-6 text-sm text-gray-500">
          Built with Next.js, React, TypeScript, and Tailwind CSS &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}
