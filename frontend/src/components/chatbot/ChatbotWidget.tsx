import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Maximize2,
  Trash2,
  Copy,
  ChevronDown,
  Globe,
  Check,
} from 'lucide-react';
import { sendMessage } from '../../api/assistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LANGUAGES = [
  { code: 'english', label: 'English' },
  { code: 'hindi', label: 'हिंदी (Hindi)' },
  { code: 'tamil', label: 'தமிழ் (Tamil)' },
  { code: 'telugu', label: 'తెలుగు (Telugu)' },
  { code: 'malayalam', label: 'മലയാളം (Malayalam)' },
];

const SUGGESTED_QUESTIONS = [
  '🌾 Best crop for my soil?',
  '🍂 Why are my leaves yellow?',
  '🧪 When to apply fertilizer?',
  '🌧️ Safe to spray today?',
  '💧 When to irrigate paddy?',
];

export function ChatbotWidget() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');
  const [langOpen, setLangOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Namaste! I'm your OptiCrop AI Farming Assistant. 🌾 Ask me anything about crop suitability, pest management, fertilizer doses, or weather impact!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when widget is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Hide the floating widget on the full assistant page to prevent duplicate chat interfaces
  if (location.pathname === '/services/assistant') {
    return null;
  }

  const handleSend = async (questionText?: string) => {
    const text = (questionText ?? input).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let botAnswer = '';
      try {
        botAnswer = await sendMessage({
          message: text,
          language: language,
        });
      } catch (e) {
        // network or server error handled below
      }

      if (!botAnswer) {
        botAnswer =
          'I am OptiCrop AI, dedicated exclusively to agricultural and farming assistance. 🌱 Feel free to ask specific questions about your crop symptoms, fertilizers, or soil conditions!';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botAnswer,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      // Ignored
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Chat history cleared. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const currentLang =
    LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          1. CHATBOT WINDOW (STICKY FIXED POPOVER)
         ────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-22 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] h-[550px] max-h-[82vh] bg-white rounded-3xl border border-[#DDE9E3] shadow-[0_12px_40px_rgba(8,127,91,0.18)] flex flex-col overflow-hidden animate-fade-in transition-all">
          
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold leading-tight">OptiCrop AI</h3>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-emerald-100 font-medium">
                  24/7 Smart Farming Assistant
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Language Picker */}
              <div ref={langDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen(v => !v)}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium flex items-center gap-1 transition-colors"
                  title="Change chat language"
                >
                  <Globe size={11} />
                  <span>{currentLang.code.slice(0, 2).toUpperCase()}</span>
                  <ChevronDown size={10} />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 py-1 z-50 text-xs">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-emerald-50 ${
                          language === l.code
                            ? 'text-emerald-700 font-bold bg-emerald-50/60'
                            : ''
                        }`}
                      >
                        <span>{l.label}</span>
                        {language === l.code && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear */}
              <button
                type="button"
                onClick={handleClear}
                title="Clear chat"
                className="p-1.5 rounded-lg hover:bg-white/15 text-emerald-100 hover:text-white transition-colors"
              >
                <Trash2 size={15} />
              </button>

              {/* Fullscreen Expand */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/services/assistant');
                }}
                title="Open full-page assistant"
                className="p-1.5 rounded-lg hover:bg-white/15 text-emerald-100 hover:text-white transition-colors"
              >
                <Maximize2 size={15} />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg hover:bg-white/15 text-emerald-100 hover:text-white transition-colors"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#F0F7F4] border-b border-[#DDE9E3] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.replace(/^[^\w]+/, ''))}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-[#DDE9E3] hover:border-emerald-600 hover:text-emerald-700 text-[11px] font-medium text-gray-600 shadow-2xs transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F7FAF8]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                } items-end gap-2 group animate-fade-in`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs">
                    <Bot size={15} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] relative p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-gray-800 border border-[#DDE9E3] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  <div
                    className={`mt-1 flex items-center justify-between gap-3 text-[10px] ${
                      msg.role === 'user'
                        ? 'text-emerald-200'
                        : 'text-gray-400'
                    }`}
                  >
                    <span>
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {msg.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="opacity-0 group-hover:opacity-100 hover:text-emerald-700 transition-opacity"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check size={11} className="text-emerald-600" />
                        ) : (
                          <Copy size={11} />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="h-7 w-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Bot size={15} />
                </div>
                <div className="bg-white border border-[#DDE9E3] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-2xs flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-[#DDE9E3]">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask your farming question..."
                className="flex-1 px-3.5 py-2 bg-[#F7FAF8] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:bg-white outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-9 w-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer"
                title="Send question"
              >
                <Send size={15} />
              </button>
            </form>
            <div className="mt-1.5 text-center text-[10px] text-gray-400">
              Validated by ICAR Agronomic Knowledge Base
            </div>
          </div>

        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          2. FLOATING STICKY TRIGGER BUTTON (BOTTOM RIGHT)
         ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5">
        
        {/* Tooltip badge visible on hover/desktop */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-md cursor-pointer hover:bg-emerald-50 transition-all hover:scale-105"
          >
            <Sparkles size={13} className="text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Ask AI Assistant</span>
          </div>
        )}

        {/* Main Floating Circle Button */}
        <button
          type="button"
          id="sticky-chatbot-btn"
          onClick={() => setIsOpen(v => !v)}
          aria-label="Open OptiCrop AI Chatbot"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-[0_8px_25px_rgba(8,127,91,0.35)] hover:shadow-[0_10px_30px_rgba(8,127,91,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isOpen ? (
            <X size={24} className="transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <MessageCircle size={26} className="transition-transform group-hover:scale-110" />
              {/* Online Pulse Ring */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </>
          )}
        </button>

      </div>
    </>
  );
}

export default ChatbotWidget;
