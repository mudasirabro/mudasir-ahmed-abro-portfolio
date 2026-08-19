import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Volume2, VolumeX, Sparkles, Cpu, Terminal, Zap } from 'lucide-react';
import { personalDetails, projectsData, skillsData, certificationsData } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

interface Message {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
}

export const JarvisBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'jarvis',
      text: `Greetings. I am JARVIS 2050, Mudasir Ahmed Abro's Quantum Neural Assistant. How may I assist you with his Full Stack engineering portfolio, SDLC expertise, or contract availability?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const generateOfflineReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('who') || q.includes('about') || q.includes('mudasir')) {
      return `${personalDetails.name} is a Full Stack Developer & Software Engineer based in ${personalDetails.location}. He holds a BS in Software Engineering and is certified 4x by Meta and Google in Front-End Development, Python Automation, Advanced Data Analytics, and AI.`;
    }
    if (q.includes('project') || q.includes('work') || q.includes('app')) {
      const pNames = projectsData.map((p) => p.title).join(', ');
      return `Mudasir has built production applications including: ${pNames}. His flagship projects feature full MERN architecture, payment gateways, and AI features!`;
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
      return `Mudasir's core tech stack includes React.js, Node.js, Express.js, MongoDB, MySQL, Python, TypeScript, Tailwind CSS, REST APIs, and Docker containerization.`;
    }
    if (q.includes('cert') || q.includes('google') || q.includes('meta')) {
      const certNames = certificationsData.map((c) => `${c.title} (${c.issuer})`).join(' | ');
      return `Mudasir holds 4 verified professional certifications from Meta & Google: ${certNames}.`;
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) {
      return `You can reach Mudasir directly via Email at ${personalDetails.email} or Phone at ${personalDetails.phone}. He is currently available for full-time software engineer roles & enterprise contract work!`;
    }

    return `System Query Acknowledged: "${query}". Mudasir is an expert Full Stack Engineer with proven production apps in React, Node.js, and Python. Would you like to review his Key Projects or ATS Resume?`;
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    soundEngine.playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    let replyText = '';

    try {
      // Try Gemini API via backend proxy if available
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          replyText = data.reply;
        }
      }
    } catch {
      // Fallback
    }

    if (!replyText) {
      replyText = generateOfflineReply(currentInput);
    }

    const jarvisMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'jarvis',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, jarvisMsg]);
    setLoading(false);

    if (voiceEnabled) {
      soundEngine.speak(replyText);
    }
  };

  return (
    <>
      {/* Floating JARVIS AI Orb Trigger (Bottom-Left Corner) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(!isOpen);
          }}
          className="relative p-3.5 rounded-full bg-slate-950 border border-cyan-500/60 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-110 transition-all group flex items-center justify-center"
          title="Open JARVIS 2050 Quantum AI Assistant"
        >
          {/* Animated Orbital Cyber Rings */}
          <span className="absolute -inset-2 rounded-full border border-cyan-400/30 animate-spin-slow pointer-events-none" />
          <span className="absolute -inset-4 rounded-full border border-emerald-400/20 animate-spin-reverse-slow pointer-events-none border-dashed" />

          <Bot className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />

          {/* Glowing Status Node */}
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse shadow-[0_0_8px_#10b981]" />
        </button>
      </div>

      {/* JARVIS Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-4 sm:left-6 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] z-50 rounded-2xl bg-slate-950/95 border border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-slate-900/90 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>JARVIS 2050 AI</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    QUANTUM REASONING ENGINE v4.2
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setVoiceEnabled(!voiceEnabled);
                  }}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    voiceEnabled
                      ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                  title={voiceEnabled ? 'Voice Synthesis: ON' : 'Voice Synthesis: OFF'}
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl font-mono leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-950/90 border border-cyan-500/40 text-cyan-100 rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1">
                      <span className="font-bold text-cyan-400">
                        {msg.sender === 'user' ? 'GUEST USER' : 'JARVIS 2050'}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 font-mono text-xs flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>JARVIS is calculating response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Preset Query Pills */}
            <div className="p-2 bg-slate-950 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[10px] font-mono no-scrollbar">
              {[
                'Tell me about Mudasir',
                'What are his projects?',
                'Certifications & Credentials',
                'How to hire him?',
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(pill);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 whitespace-nowrap transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask JARVIS about Mudasir's background..."
                className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold disabled:opacity-50 hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
