import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Check, Copy, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { personalDetails } from '../data/resumeData';
import { soundEngine } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playParticleExplosion();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>DISPATCH_PROTOCOL // TRANSMIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Initiate Contact & Collaboration
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Open for full-stack engineering opportunities, client projects, and technical discussions. Transmit a message directly to Mudasir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white font-sans">Direct Communication Hub</h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">Fast Response Guaranteed</p>
              </div>

              {/* Email Card */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Email Dispatch</div>
                    <a href={`mailto:${personalDetails.email}`} className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 font-mono">
                      {personalDetails.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalDetails.email, 'email')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Phone Contact</div>
                    <a href={`tel:${personalDetails.phone}`} className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-400 font-mono">
                      {personalDetails.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalDetails.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-slate-950 text-purple-400 border border-purple-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Geographic Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 font-mono">
                    {personalDetails.location}
                  </div>
                </div>
              </div>

              {/* External Profiles Links */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Verified External Profiles:</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={personalDetails.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center space-x-2"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href={personalDetails.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: High Tech Transmit Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-sans">Cyber Message Terminal</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">Encrypted Direct Payload Delivery</p>
                </div>
                <div className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SECURE_FORM</span>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono space-y-3 text-center"
                >
                  <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white">MESSAGE TRANSMITTED SUCCESSFULLY!</h4>
                  <p className="text-xs text-slate-200">
                    Thank you for reaching out, {formState.name}. Mudasir will respond to <span className="text-cyan-300 font-bold">{formState.email}</span> shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-bold">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold">Subject / Project Role</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Full Stack Opportunity / Web Project Inquiry"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold">Message Payload *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Details regarding your project requirements, tech stack, or role..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundEngine.playHoverBeep()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500 text-slate-950 font-bold font-mono text-sm flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    <Send className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>TRANSMIT MESSAGE NOW</span>
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
