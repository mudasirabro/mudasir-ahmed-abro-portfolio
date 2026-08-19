import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  FileText,
  Layers,
  Award,
  Mail,
  ArrowRight,
  Briefcase,
  Terminal,
  Cpu,
  UserCheck,
  Compass,
} from 'lucide-react';
import {
  generateAgentResponse,
  ChatMessage,
  executeUiAction,
  AgentMode,
} from '../utils/aiAgent';
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
  const isWidgetOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleOpen = () => {
    soundEngine.playClick();
    if (externalOnOpen) externalOnOpen();
    else setInternalIsOpen(true);
  };

  const handleClose = () => {
    soundEngine.playClick();
    if (externalOnClose) externalOnClose();
    else setInternalIsOpen(false);
  };

  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [currentMode, setCurrentMode] = useState<AgentMode>('general');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'jarvis',
      text: `Hello! I am **JARVIS 2050**, the Autonomous AI Representative for **Mudasir Ahmed Abro**.

I can evaluate Mudasir for job openings, explain the system architecture of his production applications, verify his **4x Meta & Google Certifications**, or assist you in hiring him.

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'general',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isWidgetOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isWidgetOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Sci-Fi Text-To-Speech engine
  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown symbols for voice
      const cleanSpokenText = text
        .replace(/[*#_`\[\]()]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .slice(0, 220);

      const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  const handleSendMessage = async (promptToSend?: string) => {
    const query = (promptToSend || input).trim();
    if (!query || isThinking) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: currentMode,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsThinking(true);

    try {
      const { text: responseText, action } = await generateAgentResponse(
        newHistory,
        query,
        currentMode
      );

      const jarvisMsg: ChatMessage = {
        id: `jarvis-${Date.now()}`,
        sender: 'jarvis',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
        mode: currentMode,
      };

      setMessages((prev) => [...prev, jarvisMsg]);
      speakText(responseText);

      // If user explicitly gave a direct command like "open resume", auto execute
      const lowerQuery = query.toLowerCase();
      if (
        (lowerQuery.includes('open resume') || lowerQuery.includes('show resume')) &&
        action === 'OPEN_RESUME'
      ) {
        executeUiAction(action, {
          openResume: onOpenResumeModal,
          openTerminal: onOpenTerminal,
        });
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `jarvis-err-${Date.now()}`,
        sender: 'jarvis',
        text: 'My quantum neural uplink encountered a momentary disruption. Mudasir is a Certified Meta Front-End & Google AI/Python Engineer available for hire. How can I assist you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: currentMode,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearChat = () => {
    soundEngine.playClick();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'jarvis',
        text: `Memory buffer cleared. Operating in **${currentMode.toUpperCase()}** Mode. Ask me anything regarding Mudasir's technical background, projects, or credentials.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: currentMode,
      },
    ]);
  };

  const modePresets: Record<AgentMode, string[]> = {
    general: [
      'What 4x Meta & Google Certifications does Mudasir have?',
      'Tell me about his Software Engineering degree at Sukkur IBA',
      'What is his full technical stack and proficiency?',
    ],
    recruiter: [
      'Evaluate Mudasir for a Full Stack React & Node role',
      'What are his key delivery metrics & performance boosts?',
      'Summarize his experience at EvoDynamics Vision',
    ],
    architect: [
      'Explain the system architecture of the AI Resume Builder',
      'How does his E-Commerce app ensure transactional reliability?',
      'How was the School Management MySQL database structured?',
    ],
    hire: [
      'Can you open Mudasir’s complete ATS Resume?',
      'What is Mudasir’s current hiring availability?',
      'What are his direct contact details?',
    ],
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'OPEN_RESUME':
        return { label: 'Launch ATS Resume Specification', icon: FileText, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' };
      case 'SCROLL_PROJECTS':
        return { label: 'Jump to 2050 Projects Showcase', icon: Layers, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' };
      case 'SCROLL_CERTS':
        return { label: 'View 4x Meta & Google Credentials', icon: Award, color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' };
      case 'SCROLL_SKILLS':
        return { label: 'Inspect Technical Skill Matrix', icon: Cpu, color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' };
      case 'SCROLL_CONTACT':
        return { label: 'Contact & Hire Mudasir', icon: Mail, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40' };
      default:
        return { label: 'Execute Action', icon: ArrowRight, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' };
    }
  };

  return (
    <>
      {/* Floating Holographic Orb Trigger */}
      {!isWidgetOpen && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-3 select-none">
          <motion.button
            id="floating-jarvis-orb"
            onClick={handleOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3.5 rounded-2xl bg-gradient-to-tr from-purple-950 via-slate-900 to-cyan-950 border border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center group"
            title="Chat with JARVIS 2050 Personal AI Agent (Ctrl+J)"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-cyan-300 group-hover:rotate-12 transition-transform animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </motion.button>

          {/* Teaser Bubble */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-purple-200 text-xs font-mono backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>JARVIS AI: Ask anything or evaluate fit</span>
            <span className="text-[10px] text-slate-500 font-sans border border-slate-700 rounded px-1">Ctrl+J</span>
          </motion.div>
        </div>
      )}

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isWidgetOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:left-6 z-50 flex items-center justify-center p-3 sm:p-0">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full bg-[#080d1a]/95 border border-purple-500/40 sm:rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? 'h-[92vh] sm:w-[680px]'
                  : 'h-[85vh] sm:h-[580px] sm:w-[460px]'
              }`}
            >
              {/* Header Bar */}
              <div className="px-4 py-3 bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border-b border-purple-500/30 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2.5">
                  <div className="relative p-1.5 rounded-lg bg-purple-900/40 border border-purple-500/50">
                    <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold font-mono text-cyan-200">JARVIS 2050</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-400/40 text-purple-200 font-mono">
                        GEMINI 3.7
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">Autonomous AI Representative</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Clear chat */}
                  <button
                    onClick={handleClearChat}
                    title="Clear Chat History"
                    className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Speech Toggle */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setSpeechEnabled(!speechEnabled);
                    }}
                    title={speechEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
                    className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    {speechEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setIsExpanded(!isExpanded);
                    }}
                    className="hidden sm:block p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Close */}
                  <button
                    onClick={handleClose}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-mono select-none">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentMode('general');
                  }}
                  className={`px-2 py-1 rounded-md transition-all flex items-center space-x-1 whitespace-nowrap ${
                    currentMode === 'general'
                      ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-300 shadow-[0_0_8px_rgba(168,85,247,0.3)] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-3 h-3 text-purple-400" />
                  <span>General</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentMode('recruiter');
                  }}
                  className={`px-2 py-1 rounded-md transition-all flex items-center space-x-1 whitespace-nowrap ${
                    currentMode === 'recruiter'
                      ? 'bg-purple-900/60 border border-purple-500/50 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  <span>Recruiter Fit</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentMode('architect');
                  }}
                  className={`px-2 py-1 rounded-md transition-all flex items-center space-x-1 whitespace-nowrap ${
                    currentMode === 'architect'
                      ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>Tech Architect</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentMode('hire');
                  }}
                  className={`px-2 py-1 rounded-md transition-all flex items-center space-x-1 whitespace-nowrap ${
                    currentMode === 'hire'
                      ? 'bg-purple-900/60 border border-purple-500/50 text-amber-300 shadow-[0_0_8px_rgba(234,179,8,0.3)] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Briefcase className="w-3 h-3 text-amber-400" />
                  <span>Hire Mudasir</span>
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm">
                {messages.map((msg) => {
                  const isJarvis = msg.sender === 'jarvis';
                  const actionDetails = msg.action ? getActionLabel(msg.action) : null;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${isJarvis ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 shadow-md space-y-2 leading-relaxed ${
                          isJarvis
                            ? 'bg-slate-900/90 border border-purple-500/30 text-slate-100'
                            : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium'
                        }`}
                      >
                        {/* Header tag */}
                        <div className="flex items-center justify-between text-[10px] opacity-70 font-mono border-b border-white/10 pb-1">
                          <span className="flex items-center space-x-1">
                            {isJarvis ? (
                              <>
                                <Bot className="w-3 h-3 text-cyan-400" />
                                <span className="font-bold text-cyan-300">JARVIS AI</span>
                              </>
                            ) : (
                              <span>Visitor</span>
                            )}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>

                        {/* Text Body */}
                        <div className="whitespace-pre-wrap space-y-1.5 text-slate-200">
                          {msg.text}
                        </div>

                        {/* Interactive In-Chat Action Card */}
                        {isJarvis && actionDetails && msg.action && (
                          <div className="pt-2 border-t border-purple-500/20">
                            <button
                              onClick={() => {
                                soundEngine.playClick();
                                executeUiAction(msg.action!, {
                                  openResume: onOpenResumeModal,
                                  openTerminal: onOpenTerminal,
                                });
                              }}
                              className={`w-full py-2 px-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all hover:scale-[1.02] shadow-sm ${actionDetails.color}`}
                            >
                              <span className="flex items-center space-x-2">
                                <actionDetails.icon className="w-3.5 h-3.5" />
                                <span className="font-bold">{actionDetails.label}</span>
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Thinking Animation */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start"
                  >
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-cyan-300 font-mono text-xs flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span>JARVIS is reasoning with Gemini 3.7 Flash...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Preset Query Chips */}
              <div className="px-3 py-1.5 bg-slate-950/60 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {modePresets[currentMode].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(preset)}
                    disabled={isThinking}
                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-all font-mono hover:bg-slate-800 disabled:opacity-50 shrink-0"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-slate-950 border-t border-purple-500/30 flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    currentMode === 'recruiter'
                      ? 'Ask about candidate fit, skills match, or metrics...'
                      : currentMode === 'architect'
                      ? 'Ask about system architecture, schemas, or REST APIs...'
                      : currentMode === 'hire'
                      ? 'Ask about availability, rates, or contact info...'
                      : 'Ask JARVIS anything about Mudasir...'
                  }
                  className="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-sans"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isThinking}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
