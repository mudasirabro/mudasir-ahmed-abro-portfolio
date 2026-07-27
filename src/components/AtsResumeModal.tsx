import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Copy, Check, Printer, X, Download, ShieldCheck, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { personalDetails, skillsData, experienceData, projectsData, certificationsData, educationData } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

interface AtsResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtsResumeModal: React.FC<AtsResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getPlainTextResume = () => {
    return `${personalDetails.name}
${personalDetails.phone} | ${personalDetails.email} | ${personalDetails.linkedin} | ${personalDetails.github}
${personalDetails.location}

SUMMARY
${personalDetails.summary}

TECHNICAL SKILLS
${skillsData.map((cat) => `${cat.category}: ${cat.skills.map((s) => s.name).join(', ')}`).join('\n')}

PROFESSIONAL EXPERIENCE
${experienceData.map((exp) => `${exp.role} - ${exp.company} (${exp.period})\n${exp.bullets.map((b) => `• ${b}`).join('\n')}`).join('\n\n')}

KEY PROJECTS
${projectsData.map((p) => `${p.title} | ${p.technologies.join(', ')}\n• ${p.description}`).join('\n\n')}

CERTIFICATIONS
${certificationsData.map((c) => `${c.title} (${c.year}) - Skills: ${c.skills.join(', ')}`).join('\n')}

EDUCATION
${educationData.institution} - ${educationData.location}
${educationData.degree} (${educationData.period})
`;
  };

  const handleCopyText = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(getPlainTextResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] max-h-[90vh] overflow-y-auto space-y-6"
        >
          {/* Modal Top Control Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">ATS-Optimized Resume View</h3>
                <p className="text-xs font-mono text-emerald-400">Formatted for ATS Resume Scanners & Recruiters</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center space-x-1.5"
                title="Copy Plain Text for ATS"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy ATS Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-1.5"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document View */}
          <div id="printable-resume" className="p-8 bg-slate-900/90 text-slate-200 rounded-xl border border-slate-800 space-y-6 text-xs sm:text-sm leading-relaxed font-sans shadow-inner">
            
            {/* Header */}
            <div className="text-center border-b border-slate-700 pb-4 space-y-2">
              <h1 className="text-2xl font-bold text-white uppercase tracking-wider">{personalDetails.name}</h1>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300 font-mono">
                <span>{personalDetails.phone}</span>
                <span>|</span>
                <span>{personalDetails.email}</span>
                <span>|</span>
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-cyan-400 font-mono">
                <span>linkedin.com/in/mudasir-ahmed-abro</span>
                <span>|</span>
                <span>github.com/mudasirabro</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Summary</h2>
              <p className="text-slate-300">{personalDetails.summary}</p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Technical Skills</h2>
              <div className="space-y-1 text-slate-300">
                {skillsData.map((cat, idx) => (
                  <p key={idx}>
                    <strong className="text-white">{cat.category}: </strong>
                    {cat.skills.map((s) => s.name).join(', ')}
                  </p>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Professional Experience</h2>
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Key Projects */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Key Projects</h2>
              {projectsData.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="font-bold text-white">
                    {p.title} <span className="text-cyan-400 font-mono text-xs">| {p.technologies.join(', ')}</span>
                  </div>
                  <p className="text-slate-300">• {p.description}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Certifications</h2>
              {certificationsData.map((c) => (
                <p key={c.id} className="text-slate-300">
                  <strong className="text-white">{c.title}</strong> ({c.year}) — Skills: {c.skills.join(', ')}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-0.5">Education</h2>
              <p className="text-white font-bold">{educationData.institution} — {educationData.location}</p>
              <p className="text-slate-300">{educationData.degree} ({educationData.period})</p>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
