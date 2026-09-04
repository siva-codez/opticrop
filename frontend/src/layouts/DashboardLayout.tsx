import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { FloatingChatWidget } from '../components/common/FloatingChatWidget';

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#070c14] overflow-hidden text-slate-100 p-0 md:p-4 lg:p-5 gap-0 md:gap-5 lg:gap-6 relative">
      {/* Left Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Viewport with rounded container gap */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#070c14] md:bg-[#080e1a] md:border md:border-[#162438] md:rounded-3xl md:shadow-2xl relative">
        {/* Top Header */}
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-5 sm:px-8 md:px-10 lg:px-12 py-8 md:py-10 pb-24 md:pb-12 scroll-smooth scrollbar-thin scrollbar-thumb-[#162438]">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Chatbot Widget (Bottom Right) */}
      <FloatingChatWidget />

      {/* Bottom Navigation - visible on mobile only */}
      <BottomNav />
    </div>
  );
}

export default DashboardLayout;


