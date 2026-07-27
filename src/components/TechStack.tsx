import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Smartphone, Code, Database, Wrench, Layers, CheckCircle, Terminal, Copy, Check } from 'lucide-react';
import { skillsData } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'express' | 'python' | 'sql'>('react');
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Languages', 'Databases', 'DevOps & Tools', 'Practices'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((cat) => cat.category === activeCategory);

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Frontend': return Layout;
      case 'Backend': return Server;
      case 'Mobile': return Smartphone;
      case 'Languages': return Code;
      case 'Databases': return Database;
      case 'DevOps & Tools': return Wrench;
      case 'Practices': return Layers;
      default: return Code;
    }
  };

  const codeSnippets = {
    react: {
      title: 'React Custom Hook & Responsive UI State',
      lang: 'TypeScript / React',
      code: `// Real-time Order Cart Pipeline Hook
import { useState, useCallback } from 'react';

export const useCheckoutFlow = <T extends { price: number; qty: number }>() => {
  const [items, setItems] = useState<T[]>([]);

  const calculateSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  const addItem = (newItem: T) => {
    setItems((prev) => [...prev, newItem]);
  };

  return { items, calculateSubtotal, addItem };
};`,
    },
    express: {
      title: 'Node.js Express REST API with JWT Auth',
      lang: 'JavaScript / Node.js',
      code: `// Secure RESTful Middleware & RBAC Pipeline
const jwt = require('jsonwebtoken');

const authenticateJWT = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized access' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err || (roles.length && !roles.includes(user.role))) {
        return res.status(403).json({ message: 'Forbidden access' });
      }
      req.user = user;
      next();
    });
  };
};`,
    },
    python: {
      title: 'Python Google IT Automation & Scripting',
      lang: 'Python 3',
      code: `# Automated System Health & Log Parsing Script
import os, sys, requests, logging

def run_health_checks(server_url):
    try:
        response = requests.get(f"{server_url}/health", timeout=5)
        if response.status_code == 200:
            logging.info("Server status: ONLINE")
            return True
    except requests.RequestException as e:
        logging.error(f"Health check failed: {e}")
        return False`,
    },
    sql: {
      title: 'Relational Database MySQL Schema & Indexing',
      lang: 'SQL',
      code: `-- Normalized Student Transcript Relational Query
SELECT 
    students.student_id,
    students.full_name,
    courses.course_title,
    grades.score,
    CASE 
        WHEN grades.score >= 90 THEN 'A'
        WHEN grades.score >= 80 THEN 'B'
        ELSE 'C'
    END AS letter_grade
FROM students
INNER JOIN grades ON students.student_id = grades.student_id
INNER JOIN courses ON grades.course_id = courses.course_id
ORDER BY grades.score DESC;`,
    },
  };

  const handleCopyCode = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(codeSnippets[activeCodeTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYSTEM_CAPABILITIES // MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Technical Skills & Engineering Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Comprehensive proficiency in modern front-end frameworks, robust RESTful backend APIs, cross-platform mobile apps, databases, and DevOps practices.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((catGroup, idx) => {
            const CategoryIcon = getCategoryIcon(catGroup.category);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-cyan-500/50 p-5 shadow-2xl transition-all group relative overflow-hidden backdrop-blur-md"
              >
                {/* Circuit Line Glow Background */}
                <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                      <CategoryIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">{catGroup.category}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">{catGroup.skills.length} Competencies</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  {catGroup.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-200 font-medium flex items-center gap-1.5">
                          {skill.isPrimary && <CheckCircle className="w-3 h-3 text-emerald-400 inline" />}
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-2 font-mono text-[11px]">
                          <span className="text-slate-500">{skill.experienceYear}</span>
                          <span className="text-cyan-400 font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Animated Streaming Progress Meter Bar */}
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.1 * sIdx }}
                          className={`h-full rounded-full relative ${
                            skill.isPrimary
                              ? 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.7)]'
                              : 'bg-cyan-500/80'
                          }`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Code Snippet Playground Box */}
        <div className="mt-16 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Code className="w-4 h-4" />
                <span>Code Paradigm Architecture</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {codeSnippets[activeCodeTab].title}
              </h3>
            </div>

            {/* Code Language Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['react', 'express', 'python', 'sql'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCodeTab(tab);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                    activeCodeTab === tab
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Code Window Box */}
          <div className="relative mt-4 bg-[#080d1a] rounded-xl border border-cyan-500/20 p-4 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto">
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs"
              title="Copy snippet"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="pr-16 leading-relaxed">
              <code>{codeSnippets[activeCodeTab].code}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
};
