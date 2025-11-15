import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Bookmark,
  Bell,
  KeyRound,
  LogOut,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#dashboard' },
  { icon: User, label: 'Personal Details', href: '#profile' },
  { icon: MessageSquare, label: 'Messages', href: '#messages', badge: 3 },
  { icon: Bookmark, label: 'Saved Researches', href: '#saved' },
  { icon: Bell, label: 'Notifications', href: '#notifications', badge: 5 },
  { icon: KeyRound, label: 'Change Password', href: '#password' },
  { icon: LogOut, label: 'Logout', href: '#logout', danger: true },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden lg:flex flex-col w-64 border-r border-white/10 backdrop-blur-xl bg-white/5 p-4"
          >
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveItem(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-[#9E27FF]/20 to-[#5F1AFF]/20 text-white shadow-lg shadow-[#9E27FF]/10'
                        : item.danger
                        ? 'text-red-400 hover:bg-red-500/10'
                        : 'text-[#BFBFC9] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#9E27FF] to-[#5F1AFF] rounded-r-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#9E27FF] text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {}}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#0F0F15]/95 backdrop-blur-xl border-r border-white/10 z-50 p-4"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-[#BFBFC9]">Menu</span>
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveItem(item.label)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#9E27FF]/20 to-[#5F1AFF]/20 text-white'
                          : item.danger
                          ? 'text-red-400 hover:bg-red-500/10'
                          : 'text-[#BFBFC9] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#9E27FF] text-xs">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
