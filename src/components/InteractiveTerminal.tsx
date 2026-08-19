import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CornerDownLeft, Sparkles, RefreshCw, Bot } from 'lucide-react';
import { personalDetails, skillsData, projectsData, experienceData, certificationsData, educationData } from '../data/resumeData';
import { generateAgentResponse } from '../utils/aiAgent';
import { soundEngine } from '../utils/audio';
import { MessageRenderer } from './MessageRenderer';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJarvis?: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs sm:text-sm font-mono text-cyan-300">
          <p className="text-emerald-400 font-bold">╔════════════════════════════════════════════════════════════╗</p>
          <p className="text-emerald-400 font-bold">║  MUDASIR AHMED ABRO - HIGH TECH CLI TERMINAL v2.6.0       ║</p>
          <p className="text-emerald-400 font-bold">╚════════════════════════════════════════════════════════════╝</p>
          <p className="text-slate-300">Welcome to Mudasir&apos;s interactive shell environment.</p>
          <p className="text-slate-400">Type <span className="text-cyan-400 font-bold">help</span> to list available commands or click quick suggestions below.</p>
        </div>
      ),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const quickCommands = [
    'help',
    'ai <ask anything>',
    'summary',
    'skills',
    'projects',
    'experience',
    'certifications',
    'contact',
    'sudo hire',
    'clear',
  ];

  const handleCommand = async (cmdToRun?: string) => {
    const rawCmd = (cmdToRun !== undefined ? cmdToRun : input).trim();
    if (!rawCmd) return;

    soundEngine.playTerminalKey();
    const cmd = rawCmd.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let outputNode: React.ReactNode = null;

    if (cmd.startsWith('ai ') || cmd.startsWith('jarvis ') || cmd === 'ai' || cmd === 'jarvis') {
      const prompt = rawCmd.replace(/^(ai|jarvis)\s*/i, '').trim();

      if (!prompt) {
        outputNode = (
          <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-lg space-y-2 text-xs sm:text-sm font-mono text-purple-200">
            <div className="flex items-center space-x-2 text-purple-300 font-bold">
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>JARVIS 2050 AI AGENT (GEMINI 3.7 FLASH)</span>
            </div>
            <p>Usage: <span className="text-cyan-300 font-bold">ai &lt;question about Mudasir&gt;</span></p>
            <p className="text-slate-300">Examples:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5">
              <li>ai Explain his MERN &amp; Python project architectures</li>
              <li>ai Evaluate Mudasir for a Full Stack engineer opening</li>
              <li>ai What are his 4x Meta and Google certifications?</li>
            </ul>
            {onOpenJarvis && (
              <button
                onClick={onOpenJarvis}
                className="mt-1 px-3 py-1 bg-cyan-950 border border-cyan-500/50 text-cyan-300 rounded text-xs hover:bg-cyan-900 flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Launch Holographic AI Assistant Chat</span>
              </button>
            )}
          </div>
        );
        setHistory((prev) => [...prev, { command: rawCmd, output: outputNode, time }]);
        setInput('');
        return;
      }

      // Show temporary analyzing node
      const loadingNode = (
        <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 py-1">
          <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
          <span>JARVIS AI is reasoning with Gemini 3.7 Flash...</span>
        </div>
      );

      setHistory((prev) => [...prev, { command: rawCmd, output: loadingNode, time }]);
      setInput('');

      try {
        const { text: aiResponse } = await generateAgentResponse([], prompt);
        const finalNode = (
          <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg space-y-2 text-xs sm:text-sm font-mono text-slate-200">
            <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold border-b border-purple-500/20 pb-1">
              <span className="flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                JARVIS AI RESPONSE
              </span>
              <span className="text-emerald-400">GEMINI 3.7 FLASH</span>
            </div>
            <div className="pt-1 text-slate-200">
              <MessageRenderer content={aiResponse} />
            </div>
          </div>
        );

        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { command: rawCmd, output: finalNode, time };
          return updated;
        });
      } catch {
        // Fallback error
      }
      return;
    }

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              <div><span className="text-purple-400 font-bold">ai &lt;query&gt;</span> - Query JARVIS 2050 Gemini AI Agent</div>
              <div><span className="text-emerald-400 font-bold">summary</span> - Full candidate profile overview</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Categorized technical skill matrix</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - Production projects &amp; architecture</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - Work history &amp; impact metrics</div>
              <div><span className="text-emerald-400 font-bold">certifications</span> - Professional certified credentials (Meta &amp; Google)</div>
              <div><span className="text-emerald-400 font-bold">education</span> - University degree details</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Phone, Email, LinkedIn, GitHub</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> - Initiate recruiter contact protocol</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal buffer history</div>
            </div>
          </div>
        );
        break;

      case 'summary':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <p className="text-cyan-400 font-bold">USER_PROFILE: {personalDetails.name}</p>
            <p className="text-slate-200 leading-relaxed">{personalDetails.summary}</p>
            <p className="text-emerald-400 text-xs">Primary Tech: React.js, Node.js, Express.js, MongoDB, MySQL, Python, React Native</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <p className="text-cyan-400 font-bold">TECHNICAL SKILLS BREAKDOWN:</p>
            {skillsData.map((cat, idx) => (
              <div key={idx} className="bg-slate-900/40 p-2 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">{cat.category}: </span>
                <span className="text-slate-300">
                  {cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <p className="text-cyan-400 font-bold">KEY PRODUCTION PROJECTS:</p>
            {projectsData.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-cyan-500/20 space-y-1">
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>{p.title}</span>
                  <span className="text-slate-400 text-xs">{p.category}</span>
                </div>
                <p className="text-slate-300 text-xs">{p.description}</p>
                <div className="text-[11px] text-cyan-300">
                  Stack: {p.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <p className="text-cyan-400 font-bold">WORK EXPERIENCE & IMPACT:</p>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between font-bold text-white">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-emerald-400 text-xs">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case 'certifications':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-cyan-400 font-bold">PROFESSIONAL CERTIFICATIONS (2026):</p>
            {certificationsData.map((cert, idx) => (
              <div key={idx} className="p-2 bg-slate-900/60 rounded border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <p className="text-emerald-300 font-bold">{cert.title}</p>
                  <p className="text-slate-400 text-xs">{cert.issuer} • Skills: {cert.skills.join(', ')}</p>
                </div>
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline font-bold text-xs shrink-0 flex items-center gap-1"
                  >
                    Verify ↗
                  </a>
                ) : (
                  <span className="text-cyan-400 font-bold text-xs shrink-0">Verified</span>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs sm:text-sm font-mono space-y-1">
            <p className="text-cyan-400 font-bold">{educationData.institution}</p>
            <p className="text-white">{educationData.degree}</p>
            <p className="text-slate-400">{educationData.location} | {educationData.period}</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="p-3 bg-slate-900/60 rounded-lg border border-cyan-500/30 text-xs sm:text-sm font-mono space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">CONTACT DIRECT PROTOCOL:</p>
            <p>📧 Email: <a href={`mailto:${personalDetails.email}`} className="text-emerald-400 underline">{personalDetails.email}</a></p>
            <p>📞 Phone: <a href={`tel:${personalDetails.phone}`} className="text-emerald-400 underline">{personalDetails.phone}</a></p>
            <p>💼 LinkedIn: <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalDetails.linkedin}</a></p>
            <p>🐙 GitHub: <a href={personalDetails.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalDetails.github}</a></p>
            <p>📍 Location: {personalDetails.location}</p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        outputNode = (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl space-y-2 font-mono text-xs sm:text-sm text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="flex items-center space-x-2 font-bold text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <span>ACCESS GRANTED: RECRUITMENT OVERRIDE AUTHORIZED</span>
            </div>
            <p className="text-slate-200">
              Mudasir Ahmed Abro is currently available for full-time engineering roles & remote contract opportunities.
            </p>
            <p className="text-slate-300">
              Direct Mail dispatch: <span className="font-bold text-cyan-300">{personalDetails.email}</span>
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs sm:text-sm font-mono">
            zsh: command not found: <span className="text-white">{rawCmd}</span>. Type <span className="text-cyan-400 font-bold">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode, time }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`w-full bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col transition-all duration-300 ${
            isMaximized ? 'h-[92vh] max-w-6xl' : 'h-[580px] max-w-3xl'
          }`}
        >
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  title="Close Terminal"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                  title="Minimize/Maximize"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  title="Maximize"
                />
              </div>
              <div className="pl-3 text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-200 font-bold">mudasir@macbook-pro: ~/portfolio</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCommand('clear')}
                className="p-1 rounded text-slate-400 hover:text-cyan-400 text-xs font-mono flex items-center gap-1 hover:bg-slate-800"
                title="Clear Output"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden xs:inline">Clear</span>
              </button>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 text-slate-400 hover:text-white"
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body Screen */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono scrollbar-thin scrollbar-thumb-cyan-500/20">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <span className="text-emerald-400 font-bold">mudasir@abro-dev:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-slate-500 ml-auto">{item.time}</span>
                </div>
                <div className="pl-2 pt-1">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px] font-mono">
            <span className="text-slate-500 py-0.5">Quick Commands:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 transition-all flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 text-cyan-400" />
                <span>{cmd}</span>
              </button>
            ))}
          </div>

          {/* Terminal Command Prompt Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 font-mono"
          >
            <span className="text-emerald-400 font-bold text-sm sm:text-base">mudasir@abro-dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command here (e.g., 'help', 'skills', 'projects')..."
              className="flex-1 bg-transparent text-cyan-200 text-sm focus:outline-none placeholder-slate-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-500/30"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
