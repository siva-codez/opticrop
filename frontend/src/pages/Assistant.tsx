import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Select } from '../components/ui';
import { Bot, User, Send, ImagePlus, Mic, Trash2, Copy, Sparkles } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your OptiCrop AI Assistant. 🌾 Ask me anything about farming, crops, soil, pests, or irrigation. I can help in English, Tamil, and Malayalam.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Which crop is suitable for my soil?',
    'How can I improve soil pH?',
    'How often should I irrigate tomato?',
    'What fertilizer is suitable for rice?',
    'How to prevent leaf blight?',
    'Best organic farming practices?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here is a tailored agronomic recommendation regarding "${text}":\n\n1. **Optimal Soil Conditions**: Ensure balanced NPK nutrients based on your recent soil test.\n2. **Irrigation Schedule**: Maintain appropriate root-zone moisture levels.\n3. **Pest Monitoring**: Inspect leaves regularly for early discoloration.\n\nLet me know if you would like step-by-step guidance!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClear = () => {
    setMessages([messages[0]]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <PageWrapper title="" fullWidth className="p-0 overflow-hidden h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full bg-[#0c1524] border-x border-[#162438] shadow-2xl flex flex-col relative h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#162438] bg-[#070c14]/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                OptiCrop AI Assistant
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">v2.4 Active</span>
              </h2>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]"></span>
                Connected to Agricultural LLM Engine
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-[#070c14]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mr-3 mt-1 shrink-0 text-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[85%] sm:max-w-[75%] relative ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl rounded-br-sm shadow-[0_0_15px_rgba(34,197,94,0.25)]' 
                  : 'bg-[#0c1524] border border-emerald-500/25 text-slate-100 rounded-2xl rounded-bl-sm shadow-md'
              } p-4`}>
                <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-slate-400 font-mono'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {msg.role === 'assistant' && (
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-[#070c14] rounded-lg text-slate-400 hover:text-emerald-400 border border-[#162438] shadow-sm"
                    title="Copy response"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#0c1524] border border-[#162438] flex items-center justify-center ml-3 mt-1 shrink-0 text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mr-3 mt-1 shrink-0 text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#0c1524] border border-[#162438] text-white rounded-2xl rounded-bl-sm p-4 flex space-x-1.5 items-center shadow-md">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#0c1524] border-t border-[#162438] p-3 md:p-4 pb-6 shadow-2xl">
          <div className="flex overflow-x-auto pb-2.5 mb-2 space-x-2 scrollbar-hide no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-3 py-1 bg-[#070c14] border border-[#162438] hover:border-emerald-500/50 rounded-full text-[11px] font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-28 hidden sm:block">
              <Select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs bg-[#070c14] border-[#162438]"
              >
                <option value="english">English</option>
                <option value="tamil">Tamil</option>
                <option value="malayalam">Malayalam</option>
              </Select>
            </div>
            
            <div className="flex-1 relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your farming question here..." 
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#162438] focus:border-emerald-500 text-xs md:text-sm text-white placeholder-slate-500 bg-[#070c14] outline-none shadow-inner transition-colors"
              />
            </div>
            
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isTyping}
              size="md"
              className="h-10 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

