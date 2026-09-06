import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from '../components/ui';
import {
  Bot,
  User,
  Send,
  Trash2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  ImagePlus,
  X,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { sendMessage } from '../api/assistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export default function Assistant() {
  const location = useLocation();
  const initialHandled = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your OptiCrop AI Farming Assistant. 🌾 Ask me anything about crop choices, soil health, plant diseases, fertilizer dosage, weather impacts, or irrigation schedules. I can assist in English, Hindi, Tamil, Telugu, and Malayalam.",
      timestamp: new Date(),
    },
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

  const suggestedQuestions = [
    'What crop should I grow in clay soil?',
    'Why are my tomato leaves turning yellow?',
    'When should I apply NPK fertilizer?',
    'How do I manage blight disease organically?',
    'What is the optimal drip irrigation schedule?',
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

  // Speech Recognition (Speech to Text)
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        'Speech recognition is not supported in your browser. Please try Chrome or Edge.'
      );
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang =
      language === 'tamil'
        ? 'ta-IN'
        : language === 'hindi'
        ? 'hi-IN'
        : language === 'telugu'
        ? 'te-IN'
        : language === 'malayalam'
        ? 'ml-IN'
        : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
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
    const queryText = text.trim() || (currentImg ? 'Attached leaf image for diagnosis.' : '');

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date(),
      imageUrl: currentImg || undefined,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setAttachedImage(null);
    setIsTyping(true);

    try {
      const botReply = await sendMessage({
        message: queryText,
        language: language,
        history: messages.slice(-6).map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
      });

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          botReply ||
          "Here is your agronomic guidance from OptiCrop AI. Feel free to ask more specific questions about soil, crops, diseases, or fertilizers!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I am OptiCrop AI, dedicated exclusively to agricultural and farming assistance. 🌱 Please check your connection or ask about crop choices, soil health, fertilizers, and plant pathology.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
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
    <PageWrapper
      title="AI Farming Assistant"
      subtitle="Ask questions about crops, diseases, fertilizers, weather, and farming."
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
      <div className="max-w-4xl mx-auto w-full bg-white border border-[#DDE9E3] rounded-2xl shadow-sm flex flex-col h-[700px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#DDE9E3] bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#087F5B] shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#14201B] flex items-center gap-2">
                OptiCrop AI Agronomist
                <span className="text-[10px] font-semibold text-[#087F5B] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={11} /> Active
                </span>
              </h2>
              <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ICAR Agricultural Knowledge Base Connected
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-32 hidden sm:block">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs bg-[#F7FAF8] border border-[#DDE9E3] rounded-xl px-2.5 py-1.5 text-[#14201B] outline-none"
              >
                <option value="english">🌐 English</option>
                <option value="hindi">🇮🇳 Hindi</option>
                <option value="tamil">🇮🇳 Tamil</option>
                <option value="telugu">🇮🇳 Telugu</option>
                <option value="malayalam">🇮🇳 Malayalam</option>
              </select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear Chat
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#F7FAF8]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-fade-in group`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE9E3] flex items-center justify-center mr-3 mt-1 shrink-0 text-[#087F5B] shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] relative ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-2xl rounded-br-sm shadow-xs'
                    : 'bg-white border border-[#DDE9E3] text-[#14201B] rounded-2xl rounded-bl-sm shadow-xs'
                } p-4`}
              >
                {/* Image preview */}
                {msg.imageUrl && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-gray-200 max-w-xs">
                    <img
                      src={msg.imageUrl}
                      alt="Attached crop"
                      className="w-full h-auto object-cover max-h-48"
                    />
                  </div>
                )}

                <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>

                <div
                  className={`text-[10px] mt-2.5 flex items-center justify-between ${
                    msg.role === 'user' ? 'text-white/70' : 'text-gray-400 font-mono'
                  }`}
                >
                  <span>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => toggleSpeak(msg.id, msg.content)}
                        className={`p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-emerald-700 transition-colors ${
                          speakingId === msg.id ? 'text-emerald-700 animate-pulse' : ''
                        }`}
                        title={speakingId === msg.id ? 'Stop audio' : 'Listen audio'}
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-emerald-700 transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center ml-3 mt-1 shrink-0 text-emerald-800 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Loading Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE9E3] flex items-center justify-center mr-3 mt-1 shrink-0 text-[#087F5B] shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#DDE9E3] text-[#14201B] rounded-2xl rounded-bl-sm p-4 flex space-x-2 items-center shadow-xs">
                <span className="text-xs text-gray-500 font-medium">
                  OptiCrop AI is analyzing
                </span>
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-[#DDE9E3] p-3 md:p-4 pb-4">
          {/* Attached Image Thumbnail */}
          {attachedImage && (
            <div className="mb-2.5 flex items-center justify-between bg-emerald-50/70 border border-emerald-200 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <img
                  src={attachedImage}
                  alt="Attachment"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-xs text-emerald-800 font-medium">
                  Crop photo attached for diagnosis
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Suggestions */}
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

          {/* Input Box */}
          <div className="flex items-center bg-[#F7FAF8] border border-[#DDE9E3] focus-within:border-emerald-600 focus-within:bg-white rounded-2xl p-1.5 md:p-2 transition-all">
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
              className="p-2 rounded-xl text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Attach crop photo"
            >
              <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isListening
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice input'}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Mic className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>

            {/* Text Input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isListening
                  ? 'Listening to your question...'
                  : 'Ask OptiCrop AI a farming question...'
              }
              className="flex-1 bg-transparent px-3 py-2 text-xs md:text-sm text-[#14201B] placeholder-gray-400 outline-none"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={(!input.trim() && !attachedImage) || isTyping}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                input.trim() || attachedImage
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
