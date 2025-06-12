import { ChatContainer } from '@/components/features/chat/ChatContainer';

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-2xl h-[70vh]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Simple Echo Chat
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Send a message and the server will echo it back to you.
        </p>
        <ChatContainer />
      </div>
    </main>
  );
}
