import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Logo } from '../brand/Logo';
import { Menu, X, Globe, ArrowRight, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'Services',     to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Features',     to: '/features' },
  { label: 'FAQ',          to: '/faq' },
];

const LANGUAGES = [
  { code: 'en', label: 'English',    native: 'English' },
  { code: 'hi', label: 'Hindi',      native: 'हिंदी' },
  { code: 'ta', label: 'Tamil',      native: 'தமிழ்' },
  { code: 'te', label: 'Telugu',     native: 'తెలుగు' },
  { code: 'ml', label: 'Malayalam',  native: 'മലയാളം' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [langOpen, setLangOpen]         = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [scrolled, setScrolled]         = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile on route change */
  useEffect(() => { 
    setMobileOpen(false); 
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  /* close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/96 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.07)]' : 'bg-white'
      } border-b border-[#DDE9E3]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">

        {/* ── Left: Logo ── */}
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* ── Center: Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                  active
                    ? 'text-[#087F5B] bg-[#E8F7F0]'
                    : 'text-[#14201B] hover:text-[#087F5B] hover:bg-[#F0F7F4]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right: Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-2.5">

          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              id="lang-toggle"
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#526059] bg-[#F7FAF8] hover:bg-[#EEF5F1] border border-[#DDE9E3] rounded-xl transition-all"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <Globe size={13} className="text-[#087F5B]" />
              <span>{currentLang.native}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div
                className="absolute right-0 mt-2 w-38 bg-white rounded-xl shadow-lg border border-[#DDE9E3] py-1.5 z-50 animate-fade-in"
                role="listbox"
              >
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={selectedLang === lang.code}
                    onClick={() => { setSelectedLang(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedLang === lang.code
                        ? 'text-[#087F5B] bg-[#E8F7F0] font-semibold'
                        : 'text-[#526059] hover:bg-[#F7FAF8]'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] text-[#8a9e96] uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Ready Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#087F5B] bg-[#E8F7F0] border border-[#BDDECF] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>AI Ready</span>
          </div>

          {/* Primary CTA */}
          <Link
            to="/services"
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#087F5B] hover:bg-[#065F44] rounded-xl shadow-[0_2px_8px_rgba(8,127,91,0.25)] hover:shadow-[0_4px_12px_rgba(8,127,91,0.35)] transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* ── Mobile Hamburger Button ── */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/services"
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#087F5B] rounded-lg"
          >
            Services
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(v => !v)}
            className="p-2 text-[#526059] hover:text-[#14201B] hover:bg-[#F0F7F4] rounded-xl transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#DDE9E3] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          <nav className="space-y-1">
            {NAV_LINKS.map(link => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    active
                      ? 'text-[#087F5B] bg-[#E8F7F0]'
                      : 'text-[#14201B] hover:bg-[#F0F7F4] hover:text-[#087F5B]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-[#DDE9E3]">
            <p className="text-xs font-semibold text-[#8a9e96] mb-2 px-1">Language</p>
            <div className="grid grid-cols-3 gap-1.5">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => { setSelectedLang(lang.code); setMobileOpen(false); }}
                  className={`px-2 py-1.5 text-xs rounded-lg font-medium text-center transition-colors ${
                    selectedLang === lang.code
                      ? 'bg-[#087F5B] text-white font-semibold'
                      : 'bg-[#F7FAF8] text-[#526059] hover:bg-[#EEF5F1]'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/services"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#087F5B] hover:bg-[#065F44] rounded-xl shadow-md transition-all"
            >
              <span>Explore AI Farming Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
