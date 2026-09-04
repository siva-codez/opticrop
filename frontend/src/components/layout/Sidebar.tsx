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
  }: {
    to: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-medium ${
          isActive
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-[0_0_15px_rgba(34,197,94,0.35)]'
            : 'text-slate-400 hover:bg-[#0c1524] hover:text-white'
        } ${collapsed ? 'md:justify-center md:px-2' : ''}`
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
          <span className={`truncate whitespace-nowrap ${collapsed ? 'md:hidden' : ''}`}>{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar / Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:static md:z-30 flex flex-col flex-shrink-0 bg-[#070c14] border-r border-[#162438] transition-all duration-300 ease-in-out h-screen select-none ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto'
        } ${
          collapsed ? 'md:w-20 md:min-w-[5rem] md:max-w-[5rem]' : 'md:w-64 md:min-w-[16rem] md:max-w-[16rem]'
        } w-72 max-w-[85vw]`}
      >
        {/* Logo Header */}
        <div className={`p-4 md:px-5 md:py-5 border-b border-[#162438] flex items-center justify-between flex-shrink-0 ${collapsed ? 'md:justify-center md:px-2' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'md:hidden' : ''}`}>
            <Logo size={24} />
          </div>
          {collapsed && (
            <div className="hidden md:flex w-10 h-10 bg-emerald-500/15 border border-emerald-500/40 rounded-xl items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.25)]">
              <Sprout size={20} className="text-emerald-400" />
            </div>
          )}

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 -mr-1 rounded-xl text-slate-400 hover:text-white hover:bg-[#0c1524] transition-colors focus:outline-none cursor-pointer"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Nav Sections with Spacing and Padding */}
        <div className="flex-1 overflow-y-auto px-3.5 py-6 flex flex-col gap-7 scrollbar-thin scrollbar-thumb-[#162438]">
          {navSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-2">
              <div className={`text-[11px] font-bold text-emerald-400/90 uppercase tracking-wider px-3 ${collapsed ? 'md:hidden' : ''}`}>
                {section.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {section.items.map((item) => (
                  <NavItem key={item.to} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Profile & Actions */}
        <div className="border-t border-[#162438] p-3 md:px-3.5 md:py-4 flex flex-col gap-1.5 bg-[#070c14] mt-auto flex-shrink-0">
          {bottomItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          {/* Collapse Button - Desktop Only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:flex w-full items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-[#0c1524] hover:text-white transition-all duration-200 text-[13px] font-medium cursor-pointer ${
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
    </>
  );
}

export default Sidebar;
