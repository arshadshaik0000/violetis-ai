import { motion } from 'motion/react';
import { Sparkles, User } from 'lucide-react';
import type { Message } from '../App';
import ReactMarkdown from 'react-markdown'; // 👈 1. Import

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-3 justify-end"
      >
        <div className="flex-1 max-w-3xl flex flex-col items-end">
          <div className="rounded-3xl rounded-tr-md bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-5 md:px-6 py-3 md:py-4 shadow-lg shadow-blue-500/20">
            <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.content}</p>
          </div>
          <span className="text-xs text-[#BFBFC9] mt-1.5">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </motion.div>
    );
  }

  if (message.type === 'assistant') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-3"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#9E27FF] to-[#5F1AFF] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#9E27FF]/30">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="flex-1 max-w-3xl">
          <div className="rounded-3xl rounded-tl-md bg-white/5 backdrop-blur-xl border border-white/10 px-5 md:px-6 py-3 md:py-4 shadow-lg">
            {/* 2. Use ReactMarkdown and add prose classes */}
            <div className="prose prose-sm md:prose-base dark:prose-invert break-words">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          <span className="text-xs text-[#BFBFC9] mt-1.5 inline-block">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </motion.div>
    );
  }

  if (message.type === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-xs text-[#BFBFC9]">{message.content}</p>
        </div>
      </motion.div>
    );
  }
  
  return null;
}