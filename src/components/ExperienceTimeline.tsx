import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, ShieldCheck, Terminal, Award } from 'lucide-react';
import { experienceData } from '../data/resumeData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER_TRACK // LOGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Professional Experience & Track Record
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Proven track record of delivering end-to-end full stack web and mobile solutions for international clients and engineering teams.
          </p>
        </div>

        {/* Timeline Circuit Visualizer */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Neon Circuit Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-indigo-500 -translate-x-1/2 opacity-40 hidden sm:block" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative flex flex-col sm:flex-row items-center group"
                >
                  {/* Central Cyber Circuit Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform hidden sm:flex">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, rotateX: isEven ? 2 : -2, rotateY: isEven ? -2 : 2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all space-y-4 relative overflow-hidden group-hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] backdrop-blur-md"
                    >
                      {/* Top Holographic Laser Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none group-hover:opacity-25 transition-opacity" />
                      
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-800">
                        <div>
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono mb-1">
                            <Terminal className="w-3 h-3" />
                            <span>{exp.isCurrent ? 'CURRENT ROLE' : 'COMPLETED INTERNSHIP'}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="text-sm font-semibold text-cyan-400 font-mono">
                            {exp.company}
                          </div>
                        </div>

                        <div className="text-right text-xs font-mono text-slate-400 space-y-1">
                          <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center justify-end space-x-1 text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Experience Bullets */}
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Impact Metrics Badges */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="text-[11px] font-mono text-slate-400 font-bold flex items-center space-x-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>KEY PERFORMANCE METRICS:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.keyMetrics.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>

                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
