import React from 'react';
import { Bell, CloudRain, Search, Menu } from 'lucide-react';
import { Input } from '../ui/Input';

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
    <header className="bg-surface border-b border-border sticky top-0 z-30 px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button 
            className="md:hidden p-2 -ml-2 text-muted hover:bg-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
        )}
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-text">{getGreeting()}, Farmer!</h1>
          <p className="text-xs text-muted">Ready to optimize your crops today?</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden lg:block w-64">
          <Input 
            placeholder="Search resources..." 
            icon={<Search size={16} />}
            className="bg-cream border-transparent focus:bg-white h-9"
          />
        </div>

        <div className="flex items-center gap-2 bg-cream text-text rounded-full px-4 py-1.5 text-sm font-medium border border-border/50">
          <CloudRain size={16} className="text-primary" />
          <span>24°C, Sunny</span>
        </div>

        <button className="relative p-2 text-muted hover:bg-cream rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-surface"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm cursor-pointer hover:bg-primary/20 transition-colors">
          JD
        </div>
      </div>
    </header>
  );
}
