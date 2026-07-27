import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Layers, Sparkles, CheckCircle2, X, Code, Server, Database, ChevronRight, Terminal } from 'lucide-react';
import { projectsData } from '../data/resumeData';
import { Project } from '../types';
import { soundEngine } from '../utils/audio';

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'AI', 'Mobile', 'Enterprise'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO_DEPLOYMENTS // CASE_STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Key Engineering Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Production-ready web & mobile applications built with modern React.js, Node.js, Express.js, MongoDB, and MySQL architectures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 p-6 shadow-2xl flex flex-col justify-between transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] relative overflow-hidden"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span>PRODUCTION_READY</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">{project.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics Bullets */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono text-slate-400 font-bold uppercase">Key Impact Metrics:</p>
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedProject(project);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-semibold flex items-center space-x-1.5 hover:bg-cyan-900/50 transition-all shadow-sm"
                >
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture & Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      onClick={(e) => {
                        if (project.liveUrl === '#') {
                          e.preventDefault();
                          soundEngine.playClick();
                          setSelectedProject(project);
                        }
                      }}
                      className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 transition-colors"
                      title="Live Demo View"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] max-h-[90vh] overflow-y-auto space-y-6"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                      {selectedProject.category} Project Case Study
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">{selectedProject.title}</h3>
                    <p className="text-xs font-mono text-emerald-400">{selectedProject.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Architecture Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>System Architecture Overview:</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                        <Code className="w-3.5 h-3.5" />
                        <span>Frontend Tier</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {selectedProject.architectureDetails.frontend || selectedProject.technologies[0]}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                        <Server className="w-3.5 h-3.5" />
                        <span>Backend REST API</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {selectedProject.architectureDetails.backend || 'Node.js & Express REST Service'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center space-x-1.5 text-purple-400 font-bold">
                        <Database className="w-3.5 h-3.5" />
                        <span>Database Storage</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {selectedProject.architectureDetails.database || 'MongoDB / MySQL'}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                    <p className="font-mono text-cyan-400 font-bold uppercase">Engineering Highlights:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {selectedProject.architectureDetails.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Demo Code Snippet */}
                  {selectedProject.demoCodeSnippet && (
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-emerald-400 font-bold">Sample Architecture Code:</p>
                      <pre className="p-4 rounded-xl bg-[#080d1a] border border-cyan-500/30 font-mono text-xs text-cyan-200 overflow-x-auto">
                        <code>{selectedProject.demoCodeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-mono border border-slate-800"
                  >
                    Close Window
                  </button>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
