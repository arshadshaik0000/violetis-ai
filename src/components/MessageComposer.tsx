import { useState, useRef, useEffect } from 'react';
import { Plus, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface MessageComposerProps {
  onSend: (message: string) => void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 24 * 4; // 4 lines max
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isTextLike =
      file.type.startsWith('text/') ||
      /\.(txt|md|csv|json|log)$/i.test(file.name);

    if (!isTextLike) {
      // For now we can’t actually read binary/image content.
      // Send a meta-message so the model understands context.
      onSend(
        `I uploaded a non-text file named ${file.name} (type: ${file.type}). I will describe it or share key points, please help me with next steps based on that.`
      );
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      if (text.trim()) {
        const combined =
          `Here is the content of the file "${file.name}". Please read it and then help me with suggestions or next steps.\n\n` +
          text;
        onSend(combined);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 md:gap-3 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-3 md:p-4 shadow-2xl shadow-black/20 transition-all duration-200 focus-within:border-[#9E27FF]/50 focus-within:shadow-[#9E27FF]/20">
        <button
          type="button"
          className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label="Add attachment"
          onClick={handleAttachClick}
        >
          <Plus className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          className="flex-1 bg-transparent resize-none outline-none placeholder:text-[#BFBFC9] text-sm md:text-base min-h-[24px] max-h-[96px]"
          rows={1}
        />

        <motion.button
          type="submit"
          disabled={!message.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#9E27FF] to-[#5F1AFF] hover:shadow-lg hover:shadow-[#9E27FF]/30 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center justify-center mt-2 text-xs text-[#BFBFC9]">
        <span>Press Enter to send, Shift + Enter for new line • Click + to upload a text file</span>
      </div>
    </form>
  );
}
