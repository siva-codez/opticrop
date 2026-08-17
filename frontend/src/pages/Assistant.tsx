import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Select } from '../components/ui';
import { Bot, User, Send, ImagePlus, Mic, Trash2, Copy } from 'lucide-react';
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
      content: 'Hello! I\'m your OptiCrop AI Assistant. Ask me anything about farming, crops, soil, pests, or irrigation. I can help in English, Tamil, and Malayalam.',
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
    'Explain this in Tamil',
    'Explain this in Malayalam'
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

    // Mock API response delay
    setTimeout(() => {
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here is a helpful farming suggestion regarding your query about "${text}". Ensure you maintain good soil health by monitoring pH and applying balanced NPK fertilizers. If you have specific crop issues, feel free to share symptoms!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClear = () => {
    setMessages([messages[0]]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <PageWrapper title="" fullWidth className="p-0 overflow-hidden h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full bg-surface border-x border-border shadow-xl flex flex-col relative h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface sticky top-0 z-10 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">OptiCrop Assistant</h2>
              <p className="text-xs text-text-secondary flex items-center">
                <span className="w-2 h-2 rounded-full bg-success mr-1"></span> Online
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleClear} className="text-muted hover:text-danger hover:bg-danger/10 px-3">
            <Trash2 className="w-4 h-4 mr-2 inline" /> Clear Chat
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[75%] relative ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-2xl rounded-br-sm' 
                  : 'bg-surface border border-border text-text rounded-2xl rounded-bl-sm shadow-sm'
              } p-4`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-muted'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => copyToClipboard(msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-background rounded text-muted hover:text-primary border border-border shadow-sm"
                    title="Copy response"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-3 mt-1 shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1 shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-surface border border-border text-text rounded-2xl rounded-bl-sm p-4 flex space-x-1 items-center shadow-sm">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-surface border-t border-border p-4 pb-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex overflow-x-auto pb-3 mb-2 space-x-2 scrollbar-hide no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-3 py-1.5 bg-background border border-border rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="w-28 text-sm bg-background border-border"
            >
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
              <option value="malayalam">Malayalam</option>
            </Select>
            
            <div className="flex-1 relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your farming question here..." 
                className="w-full pl-4 pr-24 py-3 rounded-xl border-border focus:border-primary shadow-sm bg-background"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                <button className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface">
                  <ImagePlus className="w-4 h-4" />
                </button>
                <button className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isTyping}
              className="bg-primary text-white rounded-xl h-12 w-12 flex items-center justify-center shadow-md hover:bg-primary-dark disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
