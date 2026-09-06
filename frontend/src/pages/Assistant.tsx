import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from '../components/ui';
import { Bot, User, Send, Trash2, Copy, ArrowLeft } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { sendMessage } from '../api/assistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Assistant() {
  const location = useLocation();
  const initialHandled = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your OptiCrop AI Farming Assistant. 🌾 Ask me anything about crop choices, soil health, plant diseases, fertilizer dosage, weather impacts, or irrigation schedules. I can assist in English, Hindi, Tamil, and Malayalam.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What crop should I grow?',
    'Why are my leaves turning yellow?',
    'When should I apply fertilizer?',
    'Is tomorrow suitable for spraying?',
    'How can I improve crop yield?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const prompt = (location.state as any)?.initialPrompt;
    if (prompt && !initialHandled.current) {
      initialHandled.current = true;
      setTimeout(() => {
        handleSend(prompt);
      }, 200);
    }
  }, [location.state]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;

    const queryText = text.trim();
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const botReply = await sendMessage({
        message: queryText,
        language: language,
      });

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botReply || "I am your OptiCrop AI assistant for agriculture and farming queries. Please ask about your crops, soil, fertilizers, or diseases!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I am OptiCrop AI, dedicated exclusively to agricultural and farming assistance. 🌱 Please check your field query or ask about crop choices, soil health, fertilizers, and plant pathology.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([messages[0]]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <PageWrapper
      title="Your AI Farming Assistant"
      subtitle="Ask questions about crops, diseases, fertilizers, weather and farming."
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'AI Assistant' },
      ]}
      action={
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl border border-emerald-200/60 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Services</span>
        </Link>
      }
    >
      <div className="max-w-4xl mx-auto w-full bg-white border border-[#DDE9E3] rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#DDE9E3] bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#087F5B] shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#14201B] flex items-center gap-2">
                OptiCrop AI Agronomist
                <span className="text-[10px] font-semibold text-[#087F5B] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Active</span>
              </h2>
              <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ICAR Agricultural Knowledge Base Connected
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-gray-500 hover:text-red-500 hover:bg-red-50 text-xs">
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear Chat
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#F7FAF8]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE9E3] flex items-center justify-center mr-3 mt-1 shrink-0 text-[#087F5B] shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[85%] sm:max-w-[75%] relative ${
                msg.role === 'user' 
                  ? 'bg-emerald-700 text-white rounded-2xl rounded-br-sm shadow-xs' 
                  : 'bg-white border border-[#DDE9E3] text-[#14201B] rounded-2xl rounded-bl-sm shadow-xs'
              } p-4`}>
                <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400 font-mono'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {msg.role === 'assistant' && (
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-lg text-gray-400 hover:text-[#087F5B] border border-[#DDE9E3] shadow-2xs"
                    title="Copy response"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center ml-3 mt-1 shrink-0 text-emerald-800 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE9E3] flex items-center justify-center mr-3 mt-1 shrink-0 text-[#087F5B] shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#DDE9E3] text-[#14201B] rounded-2xl rounded-bl-sm p-4 flex space-x-1.5 items-center shadow-xs">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-[#DDE9E3] p-3 md:p-4 pb-4">
          <div className="flex overflow-x-auto pb-2 mb-2 space-x-2 no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-3 py-1 bg-[#F7FAF8] border border-[#DDE9E3] hover:border-emerald-500 rounded-full text-[11px] font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-28 hidden sm:block">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs bg-[#F7FAF8] border border-[#DDE9E3] rounded-xl px-2.5 py-2.5 text-[#14201B] outline-none"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi (हिंदी)</option>
                <option value="tamil">Tamil (தமிழ்)</option>
                <option value="telugu">Telugu (తెలుగు)</option>
                <option value="malayalam">Malayalam (മലയാളം)</option>
              </select>
            </div>
            
            <div className="flex-1 relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your farming question..." 
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#DDE9E3] focus:border-emerald-600 text-xs md:text-sm text-[#14201B] placeholder-gray-400 bg-[#F7FAF8] outline-none transition-colors"
              />
            </div>
            
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isTyping}
              size="md"
              className="h-10 px-4 bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
