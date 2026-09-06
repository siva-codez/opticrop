import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ChatbotWidget } from '../components/chatbot/ChatbotWidget';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-[#14201B] font-sans antialiased selection:bg-[#087F5B]/20 selection:text-[#087F5B]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Canvas */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Sticky Fixed Chatbot Widget (Bottom Right) */}
      <ChatbotWidget />

      {/* Footer on every public page */}
      <Footer />
    </div>
  );
}

export default PublicLayout;
