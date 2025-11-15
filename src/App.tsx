import { useState } from 'react';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { MessageComposer } from './components/MessageComposer';

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const API_BASE = 'https://auroral-claudio-quietly.ngrok-free.dev';

function cleanAssistantText(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Hi, I'm Violetis AI Assistant. I can help you summarize research, improve abstracts, rewrite profiles, craft investor messages, compare works, explain complex papers, and more. Just tell me what you need.",
      timestamp: new Date(),
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const callVioletisChat = async (userContent: string): Promise<string> => {
    const history = messages.map((m) => {
      if (m.type === 'assistant') return { role: 'assistant', content: m.content };
      if (m.type === 'system') return { role: 'system', content: m.content };
      return { role: 'user', content: m.content };
    });

    const body = {
      role: 'researcher',
      messages: [
        ...history,
        {
          role: 'user',
          content: userContent,
        },
      ],
    };

    const res = await fetch(`${API_BASE}/api/violetis/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Request failed');
    }

    const data = await res.json();
    const content =
      data?.message?.content ??
      'Sorry, I could not understand the response from the AI model.';
    return cleanAssistantText(content);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const replyText = await callVioletisChat(content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const systemMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'system',
        content:
          'Sorry, something went wrong talking to Violetis AI. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F15] via-[#1A1A2E] to-[#0F0F15] text-white overflow-hidden">
      <Header />

      <main className="flex flex-col h-[calc(100vh-70px)]">
        <div className="flex-1 overflow-hidden p-4 md:p-6">
          <div className="h-full max-w-5xl mx-auto flex flex-col">
            <div className="mb-4 flex justify-center">
              <div className="inline-flex flex-col md:flex-row md:items-center md:gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <span className="text-xs text-[#BFBFC9]">
                  Ask anything related to your research, abstracts, investor outreach, or paper
                  explanations.
                </span>
              </div>
            </div>

            <ChatArea messages={messages} isThinking={isThinking} />
          </div>
        </div>

        <div className="p-4 md:p-6 pt-0">
          <div className="max-w-5xl mx-auto">
            <MessageComposer onSend={handleSendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}
