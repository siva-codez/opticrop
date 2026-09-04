import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#070c14] overflow-hidden text-slate-100">
      {/* Left Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#070c14]">
        {/* Top Header */}
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-7 lg:px-8 py-6 pb-20 md:pb-8 scroll-smooth scrollbar-thin scrollbar-thumb-[#162438]">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation - visible on mobile only */}
      <BottomNav />
    </div>
  );
}

export default DashboardLayout;
