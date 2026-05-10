'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Microscope } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth — connect to Supabase in production
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    if (mode === 'login') {
      toast.success('Welcome back!', { icon: '👋' });
    } else {
      toast.success('Account created! Please verify your email.', { icon: '✉️' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#f5c842]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00b4d8]/8 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-grid opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5c842] to-[#d97706] flex items-center justify-center shadow-lg shadow-[#f5c842]/20">
              <Microscope className="w-7 h-7 text-[#0a1628]" />
            </div>
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
              ChitoShell
            </div>
            <div className="text-white/30 text-xs tracking-widest uppercase">Enactus BSU 2026</div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Tab Toggle */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? 'bg-[#f5c842] text-[#0a1628] shadow-md'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === 'register' && (
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="input-field pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Min. 8 characters' : 'Your password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    className="input-field pl-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'login' && (
                  <div className="text-right mt-1">
                    <button type="button" className="text-[#f5c842]/70 text-xs hover:text-[#f5c842] transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {mode === 'register' && (
                <div className="flex items-start gap-2 pt-1">
                  <input type="checkbox" id="agree" required className="mt-0.5 flex-shrink-0" />
                  <label htmlFor="agree" className="text-white/40 text-xs leading-relaxed">
                    I agree to the{' '}
                    <span className="text-[#f5c842]">Terms of Service</span> and{' '}
                    <span className="text-[#f5c842]">Privacy Policy</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-[#f5c842]/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/20 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Google', icon: '🇬', color: '#ea4335' },
              { name: 'GitHub', icon: '⚫', color: '#6e5494' },
            ].map(provider => (
              <button
                key={provider.name}
                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/8 rounded-xl text-white/60 text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <span>{provider.icon}</span>
                {provider.name}
              </button>
            ))}
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 glass border border-[#f5c842]/10 rounded-xl p-4">
          <p className="text-white/30 text-xs text-center mb-2">🔑 Demo Credentials</p>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2 bg-white/3 rounded-lg">
              <div className="text-[#f5c842] mb-0.5">Admin</div>
              <div className="text-white/40">admin@bsu.edu.eg</div>
              <div className="text-white/40">admin123</div>
            </div>
            <div className="p-2 bg-white/3 rounded-lg">
              <div className="text-[#00b4d8] mb-0.5">User</div>
              <div className="text-white/40">user@bsu.edu.eg</div>
              <div className="text-white/40">user123</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
