import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ml', label: 'മലയാളം' }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('opticrop_lang');
    if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem('opticrop_lang', code);
    setIsOpen(false);
    // Real implementation would trigger i18n change here
  };

  const currentLabel = LANGUAGES.find(l => l.code === currentLang)?.label;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-cream transition-colors text-sm font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Globe size={16} className="text-primary" />
        <span>{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-surface border border-border shadow-lg z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                currentLang === lang.code 
                  ? 'bg-primary/5 text-primary font-medium' 
                  : 'text-text hover:bg-cream'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
