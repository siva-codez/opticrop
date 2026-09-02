import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Sprout,
  Leaf,
  MessageSquare,
  Settings,
  User,
  Cloud,
  FlaskConical,
  History,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '../brand/Logo';

const navSections = [
  {
    label: 'CORE TOOLS',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/crop-prediction', icon: Sprout, label: 'Crop Prediction' },
      { to: '/leaf-diagnosis', icon: Leaf, label: 'Disease Diagnosis' },
      { to: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
    ],
  },
  {
    label: 'FARM MANAGEMENT',
    items: [
      { to: '/weather', icon: Cloud, label: 'Weather' },
      { to: '/fertilizer', icon: FlaskConical, label: 'Fertilizer' },
    ],
  },
  {
    label: 'REPORTS & DATA',
    items: [
      { to: '/history', icon: History, label: 'History' },
      { to: '/reports', icon: FileText, label: 'Reports' },
    ],
  },
];

const bottomItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-medium ${
          isActive
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-[0_0_15px_rgba(34,197,94,0.35)]'
            : 'text-slate-400 hover:bg-[#0c1524] hover:text-white'
        } ${collapsed ? 'justify-center px-2' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
            }`}
          />
          {!collapsed && (
            <span className="truncate whitespace-nowrap">{label}</span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`hidden md:flex flex-col flex-shrink-0 bg-[#070c14] border-r border-[#162438] transition-all duration-300 ease-in-out z-40 h-screen select-none ${
        collapsed ? 'w-20 min-w-[5rem] max-w-[5rem]' : 'w-64 min-w-[16rem] max-w-[16rem]'
      }`}
    >
      {/* Logo Header */}
      <div className={`p-4 md:px-5 md:py-5 border-b border-[#162438] flex items-center flex-shrink-0 ${collapsed ? 'justify-center px-2' : 'justify-between'}`}>
        {!collapsed ? (
          <Logo size={24} />
        ) : (
          <div className="w-10 h-10 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.25)]">
            <Sprout size={20} className="text-emerald-400" />
          </div>
        )}
      </div>

      {/* Nav Sections with Spacing and Padding */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-[#162438]">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1.5">
            {!collapsed && (
              <div className="text-[11px] font-bold text-emerald-400/90 uppercase tracking-wider px-3 mb-2">
                {section.label}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Profile & Actions */}
      <div className="border-t border-[#162438] p-3 md:px-3 md:py-3 space-y-1 bg-[#070c14] mt-auto flex-shrink-0">
        {bottomItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-[#0c1524] hover:text-white transition-all duration-200 text-[13px] font-medium cursor-pointer ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={18} className="flex-shrink-0 text-emerald-400" />
          ) : (
            <>
              <ChevronLeft size={18} className="flex-shrink-0 text-slate-400 group-hover:text-white" />
              <span className="whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
