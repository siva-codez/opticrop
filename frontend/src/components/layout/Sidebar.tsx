import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
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
  X,
  Activity,
  Zap
} from 'lucide-react';
import { Logo } from '../brand/Logo';

const navSections = [
  {
    label: 'CORE TOOLS',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: 'Live' },
      { to: '/crop-prediction', icon: Sprout, label: 'Crop Prediction' },
      { to: '/leaf-diagnosis', icon: Leaf, label: 'Disease Diagnosis', badge: 'AI' },
      { to: '/assistant', icon: MessageSquare, label: 'AI Assistant', badge: 'GPT-4o' },
    ],
  },
  {
    label: 'FARM MANAGEMENT',
    items: [
      { to: '/weather', icon: Cloud, label: 'Weather & Forecast' },
      { to: '/fertilizer', icon: FlaskConical, label: 'Fertilizer Guide' },
    ],
  },
  {
    label: 'REPORTS & DATA',
    items: [
      { to: '/history', icon: History, label: 'Activity History' },
      { to: '/reports', icon: FileText, label: 'PDF Reports' },
    ],
  },
];

const bottomItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose?.();
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const NavItem = ({
    to,
    icon: Icon,
    label,
    badge,
  }: {
    to: string;
    icon: React.ElementType;
    label: string;
    badge?: string;
  }) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-250 text-xs font-medium cursor-pointer ${
          isActive
            ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_18px_rgba(34,197,94,0.18)]'
            : 'text-slate-400 hover:bg-[#0c1524] hover:text-slate-100 hover:border hover:border-[#162438]'
        } ${collapsed ? 'md:justify-center md:px-2' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Active Left Indicator Bar */}
          {isActive && (
            <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full shadow-[0_0_8px_#22c55e]" />
          )}

          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-emerald-500/25 text-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                : 'bg-[#070c14]/60 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 border border-[#162438]'
            }`}
          >
            <Icon size={16} />
          </div>

          <span className={`truncate whitespace-nowrap flex-1 ${collapsed ? 'md:hidden' : ''}`}>
            {label}
          </span>

          {/* Optional Badge */}
          {badge && !collapsed && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono tracking-tight">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-md z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:static md:z-30 flex flex-col flex-shrink-0 bg-[#070c14]/95 backdrop-blur-xl border-r border-[#162438] md:border md:rounded-3xl transition-all duration-300 ease-in-out h-screen md:h-full select-none ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto'
        } ${
          collapsed ? 'md:w-20 md:min-w-[5rem] md:max-w-[5rem]' : 'md:w-64 md:min-w-[16rem] md:max-w-[16rem]'
        } w-72 max-w-[85vw]`}
      >
        {/* Logo Header */}
        <div className={`p-4 md:px-5 md:py-4 border-b border-[#162438] flex items-center justify-between flex-shrink-0 bg-[#070c14]/80 ${collapsed ? 'md:justify-center md:px-2' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'md:hidden' : ''}`}>
            <Logo size={24} />
          </div>
          {collapsed && (
            <div className="hidden md:flex w-10 h-10 bg-emerald-500/15 border border-emerald-500/40 rounded-xl items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.25)]">
              <Sprout size={20} className="text-emerald-400 animate-pulse" />
            </div>
          )}

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 -mr-1 rounded-xl text-slate-400 hover:text-white hover:bg-[#0c1524] transition-colors focus:outline-none cursor-pointer"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-5 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[#162438]">
          {navSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-2">
              <div className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 flex items-center justify-between ${collapsed ? 'md:hidden' : ''}`}>
                <span>{section.label}</span>
              </div>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <NavItem key={item.to} {...item} />
                ))}
              </div>
            </div>
          ))}

          {/* Farm Engine Status Card (Expanded View) */}
          {!collapsed && (
            <div className="mt-2 mx-1 p-3 rounded-2xl bg-gradient-to-b from-[#0c1524] to-[#070c14] border border-emerald-500/25 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <Activity size={13} className="text-emerald-400 animate-pulse" />
                  Smart Node
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight mb-2">
                AI Agronomy & Prediction Engine Operational
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-[#162438]">
                <span>Status: <strong className="text-emerald-400 font-normal">Active</strong></span>
                <span className="flex items-center gap-1"><Zap size={10} className="text-amber-400" /> 99.8%</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Profile & Collapse Action */}
        <div className="border-t border-[#162438] p-3 md:px-3 md:py-3 flex flex-col gap-1 bg-[#070c14]/90 mt-auto flex-shrink-0">
          {bottomItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          {/* Collapse Button - Desktop Only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-[#0c1524] hover:text-white transition-all duration-200 text-xs font-medium cursor-pointer ${
              collapsed ? 'justify-center px-2' : ''
            }`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight size={18} className="flex-shrink-0 text-emerald-400" />
            ) : (
              <>
                <ChevronLeft size={18} className="flex-shrink-0 text-slate-400 group-hover:text-emerald-400" />
                <span className="whitespace-nowrap">Collapse Navigation</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

