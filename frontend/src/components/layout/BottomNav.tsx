import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Sprout, Leaf, MessageSquare, User } from 'lucide-react';

export function BottomNav() {
  const tabs = [
    { to: '/', icon: LayoutDashboard, label: 'Home' },
    { to: '/predict', icon: Sprout, label: 'Predict' },
    { to: '/diagnose', icon: Leaf, label: 'Diagnose' },
    { to: '/assistant', icon: MessageSquare, label: 'Assistant' },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border pb-safe z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
                isActive ? 'text-primary' : 'text-muted hover:text-text'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />
                )}
                <tab.icon size={20} className={isActive ? 'text-primary' : 'text-muted'} />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
