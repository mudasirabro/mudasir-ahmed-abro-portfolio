import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, CheckCircle2, Sparkles, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { certificationsData, educationData } from '../data/resumeData';

export const CertificationsEducation: React.FC = () => {
  const getBadgeStyle = (badgeType: string) => {
    switch (badgeType) {
      case 'python':
        return {
          gradient: 'from-cyan-500 to-blue-500',
          borderColor: 'border-cyan-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
          textColor: 'text-cyan-400',
          verifyColor: 'bg-cyan-950 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 hover:border-cyan-400',
        };
      case 'pm':
        return {
          gradient: 'from-emerald-500 to-teal-500',
          borderColor: 'border-emerald-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
          textColor: 'text-emerald-400',
          verifyColor: 'bg-emerald-950 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 hover:border-emerald-400',
        };
      case 'ai':
        return {
          gradient: 'from-purple-500 to-indigo-500',
          borderColor: 'border-purple-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
          textColor: 'text-purple-400',
          verifyColor: 'bg-purple-950 border-purple-500/50 text-purple-300 hover:bg-purple-900 hover:border-purple-400',
        };
      case 'meta':
        return {
          gradient: 'from-blue-500 to-sky-500',
          borderColor: 'border-blue-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
          textColor: 'text-blue-400',
          verifyColor: 'bg-blue-950 border-blue-500/50 text-blue-300 hover:bg-blue-900 hover:border-blue-400',
        };
      case 'data':
        return {
          gradient: 'from-orange-500 to-amber-500',
          borderColor: 'border-orange-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]',
          textColor: 'text-orange-400',
          verifyColor: 'bg-orange-950 border-orange-500/50 text-orange-300 hover:bg-orange-900 hover:border-orange-400',
        };
      default:
        return {
          gradient: 'from-cyan-500 to-emerald-500',
          borderColor: 'border-cyan-500/40',
          bgGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
          textColor: 'text-cyan-400',
          verifyColor: 'bg-cyan-950 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 hover:border-cyan-400',
        };
    }
  };

  return (
    <section id="certifications" className="py-20 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIALS // VERIFIED_CERTIFIED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Certifications &amp; Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified professional credentials from Google &amp; Meta, and formal Software Engineering degree from Sukkur IBA.
          </p>
        </div>

        {/* Certifications 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certificationsData.map((cert, idx) => {
            const style = getBadgeStyle(cert.badgeType);
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, rotateY: 5, rotateX: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-slate-950/90 border ${style.borderColor} ${style.bgGlow} shadow-2xl space-y-4 transition-all group relative overflow-hidden backdrop-blur-md flex flex-col`}
              >
                {/* Holographic Verification Stamp Overlay */}
                <div className="absolute -right-4 -bottom-4 w-28 h-28 border border-emerald-500/20 rounded-full animate-spin-slow pointer-events-none flex items-center justify-center text-[8px] font-mono text-emerald-400/40 uppercase tracking-tighter rotate-12">
                  <span>★ COURSERA VERIFIED ★ 2026 CERTIFIED ★</span>
                </div>

                {/* Badge Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border ${style.borderColor} ${style.textColor} group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.4)]`}>
                      <Award className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{cert.issuer}</div>
                      <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified Credential</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors relative z-10 flex-1">
                  {cert.title}
                </h3>

                {/* Skills Tags */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2 relative z-10">
                  <p className="text-[11px] font-mono text-slate-400 font-bold">Acquired Competencies:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800 hover:border-cyan-500/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verify Certificate Button */}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 mt-1 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl border text-[11px] font-mono font-bold transition-all ${style.verifyColor} shadow-sm`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Education Section Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-cyan-500/30 p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-cyan-400">
            <GraduationCap className="w-48 h-48" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC_QUALIFICATION</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {educationData.institution}
              </h3>

              <p className="text-emerald-400 font-mono font-semibold text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{educationData.degree}</span>
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Comprehensive four-year Software Engineering program specializing in Software Development Life Cycle (SDLC), Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, Software Architecture, and Agile Software Testing.
              </p>
            </div>

            <div className="flex md:flex-col items-start md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800 text-xs font-mono text-slate-300 gap-2">
              <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{educationData.period}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{educationData.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
