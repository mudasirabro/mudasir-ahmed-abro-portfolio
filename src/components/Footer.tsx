import React, { useState, useEffect } from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { personalDetails } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 relative z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Left Brand info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wider flex items-center space-x-1">
                <span>MUDASIR AHMED ABRO</span>
                <span className="text-cyan-400">&lt;/&gt;</span>
              </div>
              <div className="text-[10px] text-slate-500">
                Full Stack Engineer | React.js & Node.js Specialist
              </div>
            </div>
          </div>

          {/* System Uptime Clock */}
          <div className="flex items-center space-x-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold">SYSTEM TIME:</span>
            </div>
            <span className="text-white font-bold">{time || '00:00:00'}</span>
          </div>

          {/* Quick Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalDetails.email}`}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>© {new Date().getFullYear()} Mudasir Ahmed Abro. Built with React, Tailwind CSS & Motion.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all text-xs"
          >
            <span>Return To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
