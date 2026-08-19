import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Volume2, VolumeX, Sparkles, Cpu, Zap, ArrowUpRight, MessageSquare, Terminal } from 'lucide-react';
import { generateAgentResponse, executeUiAction, ChatMessage } from '../utils/aiAgent';
import { soundEngine } from '../utils/audio';

interface JarvisBotProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onOpenResumeModal?: () => void;
  onOpenTerminal?: () => void;
}

export const JarvisBot: React.FC<JarvisBotProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onOpen: externalOnOpen,
  onOpenResumeModal,
  onOpenTerminal,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    if (open) {
      if (externalOnOpen) externalOnOpen();
      setInternalIsOpen(true);
    } else {
      if (externalOnClose) externalOnClose();
      setInternalIsOpen(false);
    }
  };

  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'jarvis',
      text: `Greetings! I am JARVIS 2050, Mudasir Ahmed Abro's Autonomous AI Agent powered by Gemini 3.7 / 3.6 Flash.\n\nI can answer questions about his Full Stack engineering, 4x Meta & Google credentials, MERN & Python project architectures, evaluate job fit, or execute interactive actions on this site.\n\nHow may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false);
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Global hotkey: Ctrl + J or Cmd + J to toggle JARVIS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        soundEngine.playClick();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const queryToSend = (customPrompt || input).trim();
    if (!queryToSend || loading) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // Call our Gemini 3.7 / 3.6 Flash Agent service with full multi-turn memory
      const { text: replyText, action } = await generateAgentResponse(messages, queryToSend);

      const jarvisMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'jarvis',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, jarvisMsg]);
      setLoading(false);

      // Execute interactive UI action if returned by AI agent
      if (action) {
        executeUiAction(action, {
          openResume: onOpenResumeModal,
          openTerminal: onOpenTerminal,
        });
      }

      if (voiceEnabled) {
        soundEngine.speak(replyText.replace(/[*#_`]/g, ''));
      }
    } catch {
      setLoading(false);
    }
  };

  const presetPills = [
    { label: '🎯 Evaluate Job Fit', prompt: 'Evaluate Mudasir for a Full Stack / Frontend Engineer role.' },
    { label: '🏗️ Project Breakdown', prompt: 'Explain the architecture of his AI-Powered Resume Builder & E-Commerce App.' },
    { label: '📄 Open ATS Resume', prompt: 'Can you show and open Mudasir\'s ATS Resume for me?' },
    { label: '🎓 Meta & Google Certs', prompt: 'Tell me about Mudasir\'s 4x Meta and Google professional credentials.' },
    { label: '💼 How to Hire', prompt: 'What are Mudasir\'s contact details and availability for hire?' },
  ];

  return (
    <>
      {/* Floating JARVIS AI Launcher (Bottom-Left Corner) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-3">
        {/* Animated Teaser Bubble when closed */}
        <AnimatePresence>
          {!isOpen && showTeaser && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                soundEngine.playClick();
                setIsOpen(true);
              }}
              className="cursor-pointer hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md text-xs font-mono text-cyan-300 hover:border-cyan-400 transition-all hover:scale-105 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>Ask JARVIS AI Agent</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Ctrl + J
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="floating-jarvis-orb-button"
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(!isOpen);
          }}
          className="relative p-3.5 rounded-full bg-slate-950 border border-cyan-500/60 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:scale-110 transition-all group flex items-center justify-center"
          title="Toggle JARVIS 2050 Quantum AI Assistant (Ctrl + J)"
        >
          {/* Animated Orbital Cyber Rings */}
          <span className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-spin-slow pointer-events-none" />
          <span className="absolute -inset-4 rounded-full border border-purple-400/30 animate-spin-reverse-slow pointer-events-none border-dashed" />

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
            className="fixed bottom-24 left-4 sm:left-6 w-[92vw] sm:w-[440px] h-[560px] max-h-[82vh] z-50 rounded-2xl bg-[#060a14]/95 border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.35)] backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-slate-900/90 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>JARVIS 2050 AI AGENT</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                      GEMINI 3.7 FLASH
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    AUTONOMOUS CANDIDATE AGENT
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
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin scrollbar-thumb-cyan-500/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-xl font-mono leading-relaxed text-xs ${
                      msg.sender === 'user'
                        ? 'bg-cyan-950/90 border border-cyan-500/50 text-cyan-100 rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1.5 border-b border-slate-800/60 pb-1">
                      <span className="font-bold text-cyan-400 flex items-center gap-1">
                        {msg.sender === 'user' ? 'GUEST USER' : '🤖 JARVIS 2050'}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                    {msg.action && (
                      <div className="mt-2 pt-1.5 border-t border-cyan-500/20 text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span>UI ACTION EXECUTED: [{msg.action}]</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-300 font-mono text-xs flex items-center space-x-2 shadow-inner">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                    <span>JARVIS is analyzing with Gemini 3.7 Flash...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Prompt Chips */}
            <div className="p-2 bg-slate-950/90 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
              {presetPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSend(pill.prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 whitespace-nowrap transition-all flex items-center gap-1 shrink-0"
                >
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask JARVIS about Mudasir's projects, tech stack..."
                className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 text-slate-950 font-bold disabled:opacity-40 hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                title="Send Message"
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
