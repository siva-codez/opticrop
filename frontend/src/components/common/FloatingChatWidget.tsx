import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  ImagePlus, 
  Mic, 
  MicOff, 
  Trash2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  MessageSquare,
  ChevronDown,
  Minimize2
} from 'lucide-react';
import { sendMessage as sendAssistantApiMessage } from '../../api/assistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your OptiCrop AI Assistant. 🌾 Ask me anything about crops, soil nutrients, leaf diseases, or irrigation.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '🌾 Crop fit for pH 6.5?',
    '🧪 NPK dosage for Rice',
    '🍃 Cure brown spots',
    '💧 Summer drip schedule'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Speech Recognition (Speech to Text)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Please try Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'tamil' ? 'ta-IN' : language === 'malayalam' ? 'ml-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  // Speech Synthesis (Text to Speech)
  const toggleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        setSpeakingId(id);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() && !attachedImage) return;

    const currentImg = attachedImage;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text || (currentImg ? 'Attached image for analysis.' : ''),
      timestamp: new Date(),
      imageUrl: currentImg || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);
    setIsTyping(true);

    try {
      const response = await sendAssistantApiMessage({
        message: text,
        history: messages.slice(-6).map(m => ({ 
          id: m.id, 
          role: m.role, 
          content: m.content, 
          timestamp: m.timestamp.toISOString() 
        }))
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply || "Here is your agricultural guidance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      let mockReply = `Here is a tailored agronomic recommendation regarding "${text}":\n\n1. **Optimal Soil Conditions**: Ensure balanced NPK nutrients based on your recent soil test.\n2. **Irrigation Schedule**: Maintain appropriate root-zone moisture levels.\n3. **Pest Monitoring**: Inspect leaves regularly for early discoloration.`;
      
      if (text.toLowerCase().includes('soil') || text.toLowerCase().includes('ph')) {
        mockReply = `🌱 **Soil Health & pH Optimization**:\n\n- Ideal pH for most crops is **6.0 to 7.2**.\n- If soil is acidic (< 6.0), apply agricultural lime.\n- If soil is alkaline (> 7.5), incorporate compost or agricultural sulfur.`;
      } else if (text.toLowerCase().includes('fertilizer') || text.toLowerCase().includes('npk')) {
        mockReply = `🧪 **Fertilizer Guidance**:\n\n- **Nitrogen (N)**: Foliage growth.\n- **Phosphorus (P)**: Rooting.\n- **Potassium (K)**: Grain filling & immunity.\n*Tip*: Combine chemical NPK with bio-fertilizers.`;
      }

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: mockReply,
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 700);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[400px] max-w-[92vw] h-[520px] max-h-[75vh] bg-[#0c1524]/95 backdrop-blur-2xl border border-emerald-500/35 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-fade-in">
          
          {/* Widget Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#070c14] border-b border-[#162438]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border border-emerald-400/50 flex items-center justify-center text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                <Bot size={18} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  OptiCrop AI Bot
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
                </h4>
                <p className="text-[10px] text-slate-400">GPT-4o AgEngine • Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={14} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162438] transition-colors"
                title="Close Chatbot"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Body Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4 bg-[#070c14]">
            
            {/* Suggested Question Chips */}
            <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-hide no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-2.5 py-1 bg-[#0c1524] border border-[#162438] hover:border-emerald-500/50 rounded-full text-[10px] text-slate-300 hover:text-emerald-400 transition-all shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center mr-2 mt-0.5 shrink-0 text-white shadow-sm">
                    <Bot size={14} />
                  </div>
                )}
                
                <div className={`max-w-[85%] relative ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl rounded-tr-xs shadow-md' 
                    : 'bg-[#0c1524] border border-emerald-500/25 text-slate-100 rounded-2xl rounded-tl-xs shadow-sm'
                } p-3 text-xs leading-relaxed`}>
                  
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Attached" className="w-full h-auto rounded-lg mb-2 max-h-36 object-cover" />
                  )}

                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  <div className={`text-[9px] mt-1.5 flex items-center justify-between ${msg.role === 'user' ? 'text-white/70' : 'text-slate-400 font-mono'}`}>
                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button 
                          onClick={() => toggleSpeak(msg.id, msg.content)}
                          className={`p-0.5 rounded text-slate-400 hover:text-emerald-400 ${speakingId === msg.id ? 'text-emerald-400 animate-pulse' : ''}`}
                        >
                          {speakingId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="p-0.5 rounded text-slate-400 hover:text-emerald-400"
                        >
                          {copiedId === msg.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0c1524] border border-[#162438] flex items-center justify-center ml-2 mt-0.5 shrink-0 text-emerald-400">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center mr-2 mt-0.5 shrink-0 text-white">
                  <Bot size={14} />
                </div>
                <div className="bg-[#0c1524] border border-[#162438] text-white rounded-2xl rounded-tl-xs p-3 flex space-x-1.5 items-center">
                  <span className="text-[10px] text-slate-400 mr-1">Thinking</span>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Widget Input Bar */}
          <div className="p-2.5 bg-[#0c1524] border-t border-[#162438]">
            
            {attachedImage && (
              <div className="mb-2 flex items-center justify-between bg-[#070c14] border border-emerald-500/40 p-1.5 rounded-lg text-xs">
                <span className="text-emerald-400 text-[11px]">Photo attached</span>
                <button onClick={() => setAttachedImage(null)} className="text-slate-400 hover:text-red-400">
                  <X size={13} />
                </button>
              </div>
            )}

            <div className="flex items-center bg-[#070c14] border border-[#162438] focus-within:border-emerald-500/70 rounded-xl p-1">
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
                title="Attach photo"
              >
                <ImagePlus size={16} />
              </button>

              <button
                onClick={toggleListening}
                className={`p-1.5 transition-colors ${
                  isListening ? 'text-red-400 animate-pulse' : 'text-slate-400 hover:text-emerald-400'
                }`}
                title="Voice dictation"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening..." : "Ask AI Assistant..."}
                className="flex-1 bg-transparent px-2 text-xs text-white placeholder-slate-500 outline-none"
              />

              <button
                onClick={() => handleSend()}
                disabled={(!input.trim() && !attachedImage) || isTyping}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  input.trim() || attachedImage
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'bg-[#101d32] text-slate-500'
                }`}
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 text-white shadow-[0_0_25px_rgba(34,197,94,0.45)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40 group"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X size={24} className="transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <Bot size={26} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-[#070c14] rounded-full" />
          </div>
        )}
      </button>
    </>
  );
}
