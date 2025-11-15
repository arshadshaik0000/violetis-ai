import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { AbilityMode } from '../App';

interface ModeSelectorProps {
  currentMode: AbilityMode;
  onModeChange: (mode: AbilityMode) => void;
}

const abilities: AbilityMode[] = [
  'General Chat',
  'Summarize Research',
  'Improve Research Abstract',
  'Improve User Profile',
  'Generate Investor Message',
  'Evaluate Research Quality',
  'Explain Complex Paper',
  'Suggest Funding Opportunities',
  'Compare Two Researches',
  'Rewrite With Tone/Style',
  'PDF-Style Article (Structured)',
  'Slide Deck Output (Slide-by-side)',
];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200 outline-none focus:ring-2 focus:ring-[#9E27FF]/50">
        <span className="text-xs md:text-sm hidden sm:inline">Select Ability</span>
        <span className="text-xs md:text-sm sm:hidden">Ability</span>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-[#1A1A2E]/95 backdrop-blur-xl border border-white/15 shadow-2xl"
        align="end"
      >
        {abilities.map((ability) => (
          <DropdownMenuItem
            key={ability}
            onClick={() => onModeChange(ability)}
            className={`cursor-pointer text-sm py-2.5 px-3 transition-colors ${
              currentMode === ability
                ? 'bg-gradient-to-r from-[#9E27FF]/20 to-[#5F1AFF]/20 text-white'
                : 'text-[#BFBFC9] hover:text-white hover:bg-white/5'
            }`}
          >
            {ability}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
