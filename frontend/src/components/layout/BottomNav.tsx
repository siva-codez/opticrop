import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Sprout, Leaf, MessageSquare, User } from 'lucide-react';

export function BottomNav() {
  const tabs = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/crop-prediction', icon: Sprout, label: 'Predict' },
    { to: '/leaf-diagnosis', icon: Leaf, label: 'Diagnose' },
    { to: '/assistant', icon: MessageSquare, label: 'Assistant' },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#060b13]/95 backdrop-blur-lg border-t border-[#162438] pb-safe z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-400 rounded-b-full shadow-[0_0_8px_#22c55e]" />
                )}
                <tab.icon size={19} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;

