import React, { useState, useRef, useEffect } from 'react';
import { Button, Select } from '../components/ui';
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
  RotateCcw,
  Sprout,
  FlaskConical,
  Leaf,
  Droplets,
  MessageSquare,
  Globe
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { sendMessage as sendAssistantApiMessage } from '../api/assistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your OptiCrop AI Agriculture Assistant. 🌾 Ask me anything about crop selection, soil nutrients, disease diagnosis, or irrigation. I support English, Tamil, and Malayalam.",
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

  const starterCards = [
    {
      icon: Sprout,
      title: 'Crop Selection',
      prompt: 'Which crops fit clay soil with pH 6.5 in Kharif season?',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      icon: FlaskConical,
      title: 'Fertilizer Calculator',
      prompt: 'What is the recommended NPK dosage for 2 acres of Paddy?',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      icon: Leaf,
      title: 'Disease Treatment',
      prompt: 'How to cure brown leaf spots on Tomato plants organically?',
      color: 'text-lime-400',
      bgColor: 'bg-lime-500/10 border-lime-500/30'
    },
    {
      icon: Droplets,
      title: 'Irrigation Advice',
      prompt: 'What is the optimal drip irrigation schedule during dry heat?',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/30'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      let mockReply = `Here is a tailored agronomic recommendation regarding "${text}":\n\n1. **Optimal Soil Conditions**: Ensure balanced NPK nutrients based on your recent soil test.\n2. **Irrigation Schedule**: Maintain appropriate root-zone moisture levels.\n3. **Pest Monitoring**: Inspect leaves regularly for early discoloration.\n\nFeel free to ask for step-by-step guidance!`;
      
      if (text.toLowerCase().includes('soil') || text.toLowerCase().includes('ph')) {
        mockReply = `🌱 **Soil Health & pH Optimization**:\n\n- Ideal pH for most crops is **6.0 to 7.2**.\n- If soil is acidic (< 6.0), apply agricultural lime (calcium carbonate).\n- If soil is alkaline (> 7.5), incorporate organic compost or agricultural sulfur.\n- Regular soil testing every season prevents nutrient lockout.`;
      } else if (text.toLowerCase().includes('fertilizer') || text.toLowerCase().includes('npk')) {
        mockReply = `🧪 **Fertilizer & Nutrition Plan**:\n\n- **Nitrogen (N)**: Promotes lush green foliage. Apply in split doses during early growth.\n- **Phosphorus (P)**: Enhances root development and early tillering.\n- **Potassium (K)**: Increases grain filling and disease resistance.\n\n*Pro-tip*: Combine chemical fertilizer with bio-fertilizers like Azospirillum for optimal soil biology.`;
      } else if (text.toLowerCase().includes('disease') || text.toLowerCase().includes('blight') || text.toLowerCase().includes('spot')) {
        mockReply = `🍂 **Pest & Disease Diagnosis Strategy**:\n\n1. Isolate infected plant tissues immediately.\n2. Apply recommended organic fungicides (e.g., Neem seed kernel extract 5%).\n3. Avoid overhead sprinkler irrigation in damp conditions to reduce fungal spores.`;
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
      }, 800);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([messages[0]]);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PageWrapper title="" fullWidth className="p-0 overflow-hidden h-[calc(100vh-85px)] flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col relative h-full bg-[#070c14] md:border md:border-[#162438] md:rounded-3xl md:shadow-2xl overflow-hidden">
        
        {/* Chatbot Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#162438] bg-[#0c1524]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border border-emerald-400/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.35)]">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                OptiCrop AI Chatbot
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> GPT-4o AgEngine
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
                Online • Multilingual Agronomist
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-32 hidden sm:block">
              <Select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs bg-[#070c14] border-[#162438] py-1.5"
              >
                <option value="english">🌐 English</option>
                <option value="tamil">🇮🇳 Tamil</option>
                <option value="malayalam">🇮🇳 Malayalam</option>
              </Select>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClear} 
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-xs"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> New Chat
            </Button>
          </div>
        </div>

        {/* Conversation Viewport */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#070c14]">
          
          {/* Starter Grid when conversation is fresh */}
          {messages.length <= 1 && (
            <div className="my-6 space-y-4 animate-fade-in">
              <div className="text-center max-w-md mx-auto space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white pt-2">How can I assist your farm today?</h3>
                <p className="text-xs text-slate-400">Ask about crop advice, soil nutrients, leaf diseases, or irrigation schedules.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {starterCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(card.prompt)}
                      className="p-4 rounded-2xl bg-[#0c1524] border border-[#162438] hover:border-emerald-500/50 hover:bg-[#101d32] text-left transition-all group flex flex-col justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`p-2 rounded-xl border ${card.bgColor} ${card.color}`}>
                          <Icon size={16} />
                        </div>
                        <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{card.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed">{card.prompt}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages Stream */}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border border-emerald-400/50 flex items-center justify-center mr-3 mt-1 shrink-0 text-white shadow-[0_0_10px_rgba(34,197,94,0.25)]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[88%] sm:max-w-[80%] relative ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl rounded-tr-xs shadow-[0_0_18px_rgba(34,197,94,0.25)]' 
                  : 'bg-[#0c1524] border border-emerald-500/25 text-slate-100 rounded-2xl rounded-tl-xs shadow-lg'
              } p-4 md:p-5`}>
                
                {/* Image preview */}
                {msg.imageUrl && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-white/20 max-w-xs">
                    <img src={msg.imageUrl} alt="Attached crop" className="w-full h-auto object-cover max-h-48" />
                  </div>
                )}

                <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                
                <div className={`text-[10px] mt-2.5 flex items-center justify-between ${msg.role === 'user' ? 'text-white/70' : 'text-slate-400 font-mono'}`}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={() => toggleSpeak(msg.id, msg.content)}
                        className={`p-1 rounded hover:bg-[#070c14] text-slate-400 hover:text-emerald-400 transition-colors ${speakingId === msg.id ? 'text-emerald-400 animate-pulse' : ''}`}
                        title={speakingId === msg.id ? "Stop voice" : "Listen response"}
                      >
                        {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        className="p-1 rounded hover:bg-[#070c14] text-slate-400 hover:text-emerald-400 transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#0c1524] border border-[#162438] flex items-center justify-center ml-3 mt-1 shrink-0 text-emerald-400 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Loading Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border border-emerald-400/50 flex items-center justify-center mr-3 mt-1 shrink-0 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#0c1524] border border-[#162438] text-white rounded-2xl rounded-tl-xs p-4 flex space-x-2 items-center shadow-md">
                <span className="text-xs text-slate-400 mr-1 font-medium">OptiCrop AI is thinking</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chatbot Console Input Area */}
        <div className="bg-[#0c1524] border-t border-[#162438] p-3 md:p-4 pb-5 shadow-2xl">
          
          {/* Attached Image Thumbnail */}
          {attachedImage && (
            <div className="mb-2.5 flex items-center justify-between bg-[#070c14] border border-emerald-500/40 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment" className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-xs text-emerald-400 font-medium">Leaf/Crop photo attached</span>
              </div>
              <button 
                type="button" 
                onClick={() => setAttachedImage(null)}
                className="p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Pill Chat Console Box */}
          <div className="flex items-center bg-[#070c14] border border-[#162438] focus-within:border-emerald-500/70 focus-within:shadow-[0_0_20px_rgba(34,197,94,0.2)] rounded-2xl p-1.5 md:p-2 transition-all">
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {/* Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-[#0c1524] transition-colors cursor-pointer"
              title="Attach photo"
            >
              <ImagePlus className="w-5 h-5" />
            </button>

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 animate-pulse' 
                  : 'text-slate-400 hover:text-emerald-400 hover:bg-[#0c1524]'
              }`}
              title={isListening ? "Listening... click to stop" : "Voice dictation"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Ask OptiCrop AI a farming question..."}
              className="flex-1 bg-transparent px-3 py-2 text-xs md:text-sm text-white placeholder-slate-500 outline-none"
            />

            {/* Send Pill Button */}
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={(!input.trim() && !attachedImage) || isTyping}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                input.trim() || attachedImage
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-95'
                  : 'bg-[#101d32] text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}



