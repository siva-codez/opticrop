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
  Droplets,
  History,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
  Map,
} from 'lucide-react';
import { Logo } from '../brand/Logo';

const navSections = [
  {
    label: 'Core Tools',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/crop-prediction', icon: Sprout, label: 'Crop Prediction' },
      { to: '/crop-suitability', icon: Map, label: 'Crop Suitability' },
      { to: '/leaf-diagnosis', icon: Leaf, label: 'Disease Diagnosis' },
      { to: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
    ],
  },
  {
    label: 'Farm Management',
    items: [
      { to: '/weather', icon: Cloud, label: 'Weather' },
      { to: '/fertilizer', icon: FlaskConical, label: 'Fertilizer' },
      { to: '/irrigation', icon: Droplets, label: 'Irrigation' },
    ],
  },
  {
    label: 'Reports & Data',
    items: [
      { to: '/history', icon: History, label: 'History' },
      { to: '/reports', icon: FileText, label: 'Reports' },
      { to: '/admin', icon: Shield, label: 'Admin' },
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
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
          isActive
            ? 'bg-primary text-white font-medium shadow-sm'
            : 'text-muted hover:bg-cream hover:text-text'
        } ${collapsed ? 'justify-center' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : ''}`}
          />
          {!collapsed && (
            <span className="text-sm truncate">{label}</span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`hidden md:flex flex-col bg-surface border-r border-border h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`border-b border-border flex items-center ${collapsed ? 'p-3 justify-center' : 'p-5'}`}>
        {!collapsed ? (
          <Logo size={26} />
        ) : (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sprout size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Nav Sections */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div className="text-[10px] font-bold text-muted/70 uppercase tracking-widest mb-2 px-3">
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

      {/* Bottom Items */}
      <div className={`border-t border-border py-3 px-3 space-y-1`}>
        {bottomItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-cream hover:text-text transition-all duration-200 text-sm ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={18} className="flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft size={18} className="flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
