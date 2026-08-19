import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CertificationsEducation } from './components/CertificationsEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { AtsResumeModal } from './components/AtsResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { JarvisBot } from './components/JarvisBot';
import { Terminal } from 'lucide-react';
import { soundEngine } from './utils/audio';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [jarvisOpen, setJarvisOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTimeInverted, setIsTimeInverted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden transition-colors duration-1000 ${
        isTimeInverted ? 'bg-[#0a0514] hue-rotate-15' : 'bg-[#05070c]'
      }`}
    >
      {/* 2050 Geometric Crosshair Custom Cursor */}
      <CustomCursor />

      {/* Interactive Matrix Background & 3D Tesseract Canvas */}
      <MatrixBackground isTimeInverted={isTimeInverted} />

      {/* Top HUD Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenJarvis={() => setJarvisOpen(true)}
        activeSection={activeSection}
        isTimeInverted={isTimeInverted}
        onToggleTimeInversion={() => setIsTimeInverted(!isTimeInverted)}
      />

      {/* Main Sections Content */}
      <main className="relative z-10">
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenJarvis={() => setJarvisOpen(true)}
        />
        
        <TechStack />

        <ProjectsShowcase />

        <ExperienceTimeline />

        <CertificationsEducation />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating JARVIS 2050 AI Assistant Widget */}
      <JarvisBot
        isOpen={jarvisOpen}
        onClose={() => setJarvisOpen(false)}
        onOpen={() => setJarvisOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating CLI Terminal Fab Button (Bottom Right) */}
      <button
        id="floating-terminal-fab"
        onClick={() => {
          soundEngine.playClick();
          setTerminalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:scale-105 flex items-center space-x-2 font-mono text-xs group"
        title="Open High-Tech Interactive Terminal"
      >
        <div className="relative">
          <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="hidden sm:inline font-bold">&gt; Quantum CLI</span>
      </button>

      {/* Modals */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenJarvis={() => {
          setTerminalOpen(false);
          setJarvisOpen(true);
        }}
      />

      <AtsResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}

