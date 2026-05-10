'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, BookOpen, Briefcase } from 'lucide-react';
import { teamMembers } from '@/lib/data';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: 'general' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Message sent! We\'ll reply within 48 hours.', { icon: '✉️' });
    setForm({ name: '', email: '', subject: '', message: '', type: 'general' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="badge bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] mb-4">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Contact &<br /><span className="text-gradient">Collaboration</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Interested in our research, products, or partnership? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass border border-white/8 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Send a Message
              </h2>

              {/* Inquiry Type */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { val: 'general', label: 'General', icon: MessageSquare },
                  { val: 'research', label: 'Research', icon: BookOpen },
                  { val: 'business', label: 'Business', icon: Briefcase },
                ].map(t => (
                  <button
                    key={t.val}
                    onClick={() => setForm({ ...form, type: t.val })}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-all border ${
                      form.type === t.val
                        ? 'bg-[#f5c842]/10 border-[#f5c842]/30 text-[#f5c842]'
                        : 'bg-white/3 border-white/8 text-white/40 hover:text-white/70'
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">Your Name</label>
                    <input
                      type="text"
                      placeholder="Dr. Ahmed Hassan"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    placeholder="Research collaboration on chitosan extraction..."
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project, research interest, or business inquiry..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-[#f5c842]/20 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {/* Contact Cards */}
            <div className="glass border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-bold text-base mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', val: 'enactus@bsu.edu.eg', color: 'text-[#f5c842]' },
                  { icon: Phone, label: 'Phone', val: '+20 82 XXX XXXX', color: 'text-[#00b4d8]' },
                  { icon: MapPin, label: 'Address', val: 'Beni-Suef University, Faculty of Science, Beni Suef 62511, Egypt', color: 'text-green-400' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                      <c.icon className={`w-4 h-4 ${c.color}`} />
                    </div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-widest">{c.label}</div>
                      <div className="text-white text-sm mt-0.5 leading-relaxed">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="glass border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-bold text-base mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Follow the Project
              </h3>
              <div className="space-y-2">
                {[
                  { platform: 'LinkedIn', handle: 'Enactus BSU Chapter', emoji: '💼' },
                  { platform: 'ResearchGate', handle: 'ChitoShell Project', emoji: '🔬' },
                  { platform: 'Twitter/X', handle: '@EnactusBSU2026', emoji: '🐦' },
                  { platform: 'YouTube', handle: 'ChitoShell Lab Tour', emoji: '▶️' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                    <span className="text-xl">{s.emoji}</span>
                    <div className="flex-1">
                      <div className="text-white/60 text-xs uppercase tracking-widest">{s.platform}</div>
                      <div className="text-white text-sm font-medium">{s.handle}</div>
                    </div>
                    <div className="text-white/20 group-hover:text-white/50 transition-colors">→</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliation */}
            <div className="glass border border-[#f5c842]/10 rounded-2xl p-5">
              <p className="text-white/30 text-xs leading-relaxed text-center">
                🏆 <strong className="text-white/50">Enactus BSU</strong> is an official chapter of Enactus Egypt and Enactus Global,
                affiliated with Beni-Suef University under the Faculty of Science and Engineering.
                ChitoShell is our 2026 flagship social entrepreneurship project.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass border border-white/8 rounded-2xl p-4 text-center hover:border-[#f5c842]/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f5c842]/15 to-[#d97706]/15 flex items-center justify-center text-2xl mx-auto mb-3">
                  {member.avatar}
                </div>
                <div className="text-white font-semibold text-xs leading-snug">{member.name}</div>
                <div className="text-[#f5c842] text-xs mt-0.5">{member.role.split(' ')[0]}</div>
                <div className="text-white/20 text-xs mt-0.5">{member.department.split(' ')[0]}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
