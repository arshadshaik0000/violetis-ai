import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '../App';

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
}

export function ChatArea({ messages, isThinking }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 space-y-6 custom-scrollbar"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isThinking && (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#9E27FF] to-[#5F1AFF] flex items-center justify-center flex-shrink-0" />
          <div className="flex-1 max-w-3xl">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
}
