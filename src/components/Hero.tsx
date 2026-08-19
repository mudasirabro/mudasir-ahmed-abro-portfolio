import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, FileText, ArrowRight, Github, Linkedin, Mail, MapPin, Phone, ShieldCheck, CheckCircle2, Sparkles, Code2, Scan, Eye, Activity, Cpu, Zap, Radio, Lock, Bot } from 'lucide-react';
import { personalDetails } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResumeModal: () => void;
  onOpenJarvis?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResumeModal, onOpenJarvis }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const titles = [
    '2050 Full Stack Software Architect',
    'Quantum AI & Mobile Systems Engineer',
    'MERN & Distributed REST API Expert',
    'Meta & Google Certified AI & Web Engineer',
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLaserScanning, setIsLaserScanning] = useState(true);
  const [hologramBoost, setHologramBoost] = useState(false);

  useEffect(() => {
    const currentFullTitle = titles[titleIndex];
    let speed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedTitle === currentFullTitle) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && typedTitle === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setTypedTitle(
          isDeleting
            ? currentFullTitle.substring(0, typedTitle.length - 1)
            : currentFullTitle.substring(0, typedTitle.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedTitle, titleIndex, isDeleting]);

  const currentAvatarSrc = personalDetails.originalAvatarUrl;

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-cyber-grid">
      {/* 2050 Cyber-Quantum Radial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating 2050 Background HUD Reticles & Data Ticker */}
      <div className="absolute top-12 left-8 hidden xl:flex flex-col space-y-1 font-mono text-[10px] text-cyan-500/50 pointer-events-none">
        <div className="flex items-center space-x-2">
          <Activity className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>NEURAL LINK: 99.98% OPTIMAL</span>
        </div>
        <div>LATENCY: 0.12ms [QUANTUM REASONING]</div>
        <div>YEAR: 2050 A.D. // EARTH ORBIT 07</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Personal Intro & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* 2050 Quantum Status Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/50 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <span className="text-slate-400">STATUS [2050 AD]:</span>
              <span className="text-cyan-300 font-bold tracking-wide flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" /> AVAILABLE FOR CONTRACT / REMOTE
              </span>
            </div>

            {/* Name Heading with Sci-Fi Hologram Glow */}
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1 flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>BIOMETRIC ARCHITECT PROFILE // ID: MUDASIR-ABRO-2050</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                {personalDetails.name}
              </h1>
              
              {/* Animated Typewriter Subtitle */}
              <div className="mt-3 text-xl sm:text-2xl font-mono text-cyan-400 h-9 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-indigo-300 bg-clip-text text-transparent font-semibold">
                  {typedTitle}
                </span>
                <span className="w-2.5 h-6 bg-cyan-400 inline-block animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
            </div>

            {/* Resume Summary Text with 2050 HUD Container */}
            <div className="relative p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] backdrop-blur-md">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-950/80 text-[9px] font-mono text-cyan-400 border-l border-b border-cyan-500/40 rounded-bl">
                SYSTEM SUMMARY // SDLC READY
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans pt-1">
                {personalDetails.summary}
              </p>
            </div>

            {/* Contact Quick Pills with Cyber Hovering */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Karachi, Sindh, Pakistan</span>
              </div>
              <a
                href={`mailto:${personalDetails.email}`}
                onClick={() => soundEngine.playClick()}
                className="flex items-center space-x-1.5 bg-slate-900/90 hover:bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalDetails.email}</span>
              </a>
              <a
                href={`tel:${personalDetails.phone}`}
                onClick={() => soundEngine.playClick()}
                className="flex items-center space-x-1.5 bg-slate-900/90 hover:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalDetails.phone}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {onOpenJarvis && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenJarvis();
                  }}
                  className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm flex items-center space-x-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:scale-105 transition-all group"
                >
                  <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
                  <span>⚡ Chat with JARVIS AI Agent</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </button>
              )}

              <a
                href="#projects"
                onClick={() => soundEngine.playClick()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 text-slate-950 font-bold text-sm flex items-center space-x-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all transform hover:-translate-y-0.5 group"
              >
                <span>Explore 2050 Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenTerminal();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-950 border border-cyan-500/60 hover:border-cyan-400 text-cyan-300 font-mono text-sm flex items-center space-x-2 hover:bg-cyan-950/50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>&gt; Quantum CLI Terminal</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenResumeModal();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-950 border border-emerald-500/60 hover:border-emerald-400 text-emerald-300 font-mono text-sm flex items-center space-x-2 hover:bg-emerald-950/50 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>ATS Resume Specification</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2 text-slate-400 text-xs font-mono">
              <span className="text-slate-500">QUANTUM LINK:</span>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github/mudasirabro</span>
              </a>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>linkedin/mudasir-ahmed-abro</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 2050 Cyber Avatar Frame & Biometric HUD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Holographic Avatar Box with Rotating 2050 HUD Rings */}
            <div className="relative mx-auto max-w-sm group">
              {/* Animated Outer Cyber Ring */}
              <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none border-dashed" />
              <div className="absolute -inset-8 rounded-full border border-emerald-500/15 animate-spin-reverse-slow pointer-events-none border-dotted" />

              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-600 opacity-60 blur-xl group-hover:opacity-100 transition-opacity" />
              
              <div className="relative rounded-2xl bg-slate-950 border border-cyan-500/50 p-4 shadow-[0_0_40px_rgba(6,182,212,0.25)] overflow-hidden">
                {/* Tech HUD Corners */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400 z-20" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400 z-20" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400 z-20" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400 z-20" />

                {/* Avatar Visual Header Badge */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono">
                  <div className="flex items-center space-x-1.5 text-cyan-400">
                    <Scan className="w-3.5 h-3.5 animate-spin-slow" />
                    <span className="font-bold tracking-wider">2050 BIOMETRIC HUD</span>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="flex items-center space-x-1 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/40 text-[9px] font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>EXACT VERIFIED PHOTO</span>
                  </div>
                </div>

                {/* Cyber Avatar Image Canvas Frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden border border-cyan-500/40 bg-black group/img">
                  <img
                    src={currentAvatarSrc}
                    alt={personalDetails.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Holographic Laser Scanner Beam Animation */}
                  {isLaserScanning && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-laser-sweep pointer-events-none z-10" />
                  )}

                  {/* Matrix Scanline Filter */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none animate-scanline" />

                  {/* HUD Reticle Target Crosshair Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 group-hover/img:opacity-60 transition-opacity">
                    <div className="w-32 h-32 rounded-full border border-cyan-400 border-dashed animate-spin-slow" />
                    <div className="absolute w-20 h-20 rounded-full border border-emerald-400 animate-spin-reverse-slow" />
                    <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>

                  {/* Floating Biometric Badge Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/50 text-xs font-mono text-slate-200 flex items-center justify-between z-10">
                    <div className="flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-bold text-white text-xs">Mudasir A. Abro</div>
                        <div className="text-[10px] text-cyan-300">BS Software Engineering</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-400 font-bold">VERIFIED 2050</div>
                      <div className="text-[9px] text-slate-400">100% Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Laser Scan Toggle & Certification Badges Row */}
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setIsLaserScanning(!isLaserScanning);
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded border transition-colors ${
                      isLaserScanning
                        ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/30'
                        : 'border-slate-800 text-slate-500'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>SCANNER: {isLaserScanning ? 'ON' : 'OFF'}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Python</span>
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> PM</span>
                    <span className="text-purple-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2050 Quantum Stats HUD Grid */}
            <div className="grid grid-cols-2 gap-3">
              {personalDetails.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all hover:bg-slate-900/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 font-mono group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-200 mt-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{stat.subtext}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

