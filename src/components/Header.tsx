import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[70px] border-b border-white/10 backdrop-blur-xl bg-white/5 shadow-lg shadow-black/20 sticky top-0 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Logo + Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9E27FF] to-[#5F1AFF] flex items-center justify-center shadow-lg shadow-[#9E27FF]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg tracking-tight">Violetis AI Assistant</span>
            <span className="text-[11px] text-[#BFBFC9]">
              Research, investors &amp; community — all in one AI.
            </span>
          </div>
        </div>

        {/* Right Side: small static chip (no profile/avatar) */}
        <div className="hidden sm:flex items-center">
          <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-[#BFBFC9]">Powered by Llama · Local</span>
          </div>
        </div>
      </div>
    </header>
  );
}
