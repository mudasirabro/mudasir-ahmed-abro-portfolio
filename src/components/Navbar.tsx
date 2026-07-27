import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Volume2, VolumeX, FileText, Cpu, Code2, Layers, Briefcase, Award, Mail, RotateCcw, Clock } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResumeModal: () => void;
  activeSection: string;
  isTimeInverted: boolean;
  onToggleTimeInversion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenResumeModal,
  activeSection,
  isTimeInverted,
  onToggleTimeInversion,
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted());
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Cpu },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-hud-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(6,182,212,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Terminal Callout */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-button"
              onClick={() => scrollTo('hero')}
              className="group flex items-center space-x-2 font-mono text-left focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold tracking-wider text-slate-100 flex items-center space-x-1">
                  <span className="text-cyan-400">&lt;</span>
                  <span>MUDASIR.DEV</span>
                  <span className="text-cyan-400">/&gt;</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  System Online
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/40 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* HUD Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Tenet Time Inversion Toggle */}
            <button
              onClick={() => {
                soundEngine.playWormholeWarp();
                onToggleTimeInversion();
              }}
              title="Toggle Tenet Time Inversion Effect"
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-all ${
                isTimeInverted
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isTimeInverted ? 'rotate-180 transition-transform' : ''}`} />
              <span className="hidden lg:inline">{isTimeInverted ? 'TIME: INVERTED' : 'TIME: FORWARD'}</span>
            </button>

            {/* Audio Synth Toggle */}
            <button
              id="audio-toggle-button"
              onClick={handleAudioToggle}
              title={isMuted ? 'Enable Tech Sound Feedback' : 'Mute Sound Feedback'}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-xs flex items-center gap-1 font-mono"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
            </button>

            {/* Terminal Quick Trigger */}
            <button
              id="terminal-trigger-button"
              onClick={() => {
                soundEngine.playClick();
                onOpenTerminal();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>&gt; CLI</span>
            </button>

            {/* ATS Resume View Button */}
            <button
              id="resume-modal-button"
              onClick={() => {
                soundEngine.playClick();
                onOpenResumeModal();
              }}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-mono font-medium shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xs:inline">ATS Resume</span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-cyan-400 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 w-full bg-cyan-400 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-cyan-400 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800/80 bg-slate-950/95 rounded-2xl p-4 shadow-2xl border border-cyan-500/20 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-2 rounded-lg border border-cyan-500/30"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch CLI Terminal</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

