import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-[#070c14] border-b border-[#162438] sticky top-0 z-30 px-4 md:px-8 h-18 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button 
            className="md:hidden p-2 -ml-2 text-muted hover:bg-[#0c1524] rounded-lg focus:outline-none"
            onClick={onMenuClick}
          >
            <Menu size={22} />
          </button>
        )}
        <div className="hidden md:block">
          <h1 className="text-base font-bold text-white flex items-center gap-1.5">
            {getGreeting()}, Farmer! <span className="text-lg">🌾</span>
          </h1>
          <p className="text-xs text-muted">Ready to optimize your crops today?</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Search bar */}
        <div className="hidden sm:flex items-center gap-2 bg-[#0c1524] border border-[#162438] rounded-full px-4 py-2 w-56 lg:w-72 focus-within:border-emerald-500/50 transition-colors">
          <Search size={15} className="text-muted" />
          <input
            type="text"
            placeholder="Search resources..."
            className="bg-transparent text-xs text-white placeholder-muted focus:outline-none w-full"
          />
        </div>

        {/* Weather Status Badge */}
        <div className="flex items-center gap-2 bg-[#0c1524] border border-[#162438] text-white rounded-full px-4 py-2 text-xs font-medium">
          <span className="text-amber-400">☀️</span>
          <span>24°C, Sunny</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-[#0c1524] border border-[#162438] text-muted hover:text-white rounded-full transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_6px_#22c55e]"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#0c1524] border border-[#162438] flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:border-emerald-500/50 transition-colors shadow-inner">
          JD
        </div>
      </div>
    </header>
  );
}

export default Header;

