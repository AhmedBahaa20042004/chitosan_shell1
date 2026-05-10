'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut, Edit2, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';
import { products } from '@/lib/data';
import toast from 'react-hot-toast';

const mockOrders = [
  { id: 'ORD-2026-001', date: 'May 3, 2026', total: 165.00, status: 'delivered', items: [products[0], products[2]] },
  { id: 'ORD-2026-002', date: 'May 8, 2026', total: 120.00, status: 'shipped', items: [products[1]] },
  { id: 'ORD-2026-003', date: 'May 10, 2026', total: 83.00, status: 'processing', items: [products[3], products[5]] },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  delivered: { label: 'Delivered', color: 'text-green-400 bg-green-500/10 border-green-500/20', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  shipped: { label: 'Shipped', color: 'text-[#00b4d8] bg-[#00b4d8]/10 border-[#00b4d8]/20', icon: <Truck className="w-3.5 h-3.5" /> },
  processing: { label: 'Processing', color: 'text-[#f5c842] bg-[#f5c842]/10 border-[#f5c842]/20', icon: <Clock className="w-3.5 h-3.5" /> },
};

const emojiMap: Record<string, string> = {
  'p1': '🧪', 'p2': '💊', 'p3': '🌿', 'p4': '🌱', 'p5': '⚗️', 'p6': '💧',
};

type Tab = 'overview' | 'orders' | 'settings';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('overview');

  const handleLogout = () => {
    toast('Signed out successfully', { icon: '👋' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {/* Profile Card */}
            <div className="glass border border-white/8 rounded-2xl p-6 mb-4 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f5c842] to-[#d97706] flex items-center justify-center text-3xl shadow-lg shadow-[#f5c842]/20">
                  👩‍🔬
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#112240] border border-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Sara Ibrahim</h2>
              <p className="text-white/40 text-sm">sara@bsu.edu.eg</p>
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-[#f5c842]/10 border border-[#f5c842]/20 rounded-full text-[#f5c842] text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-[#f5c842] rounded-full" />
                BSU Researcher
              </span>
            </div>

            {/* Stats */}
            <div className="glass border border-white/8 rounded-2xl p-4 mb-4 grid grid-cols-3 gap-2 text-center">
              {[
                { val: '3', label: 'Orders' },
                { val: '$368', label: 'Spent' },
                { val: '6', label: 'Items' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-[#f5c842] font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>{s.val}</div>
                  <div className="text-white/30 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Nav */}
            <div className="glass border border-white/8 rounded-2xl overflow-hidden">
              {([
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'orders', label: 'My Orders', icon: Package },
                { id: 'settings', label: 'Settings', icon: Settings },
              ] as { id: Tab; label: string; icon: React.ElementType }[]).map(item => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all border-l-2 ${
                    tab === item.id
                      ? 'text-[#f5c842] bg-[#f5c842]/5 border-[#f5c842]'
                      : 'text-white/50 hover:text-white hover:bg-white/3 border-transparent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all border-l-2 border-transparent"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            {tab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Welcome back, Sara 👋
                </h1>

                {/* Recent Order */}
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#f5c842]" /> Recent Order
                    </h3>
                    <button onClick={() => setTab('orders')} className="text-[#f5c842] text-sm hover:underline">View all</button>
                  </div>
                  {mockOrders.slice(0, 1).map(order => {
                    const s = statusConfig[order.status];
                    return (
                      <div key={order.id} className="p-4 bg-white/3 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-white font-mono text-sm">{order.id}</div>
                            <div className="text-white/30 text-xs">{order.date}</div>
                          </div>
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${s.color}`}>
                            {s.icon} {s.label}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-lg">
                              <span className="text-base">{emojiMap[item.id]}</span>
                              <span className="text-white/50 text-xs">{item.name.split(' ').slice(0, 2).join(' ')}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-right text-[#f5c842] font-bold">${order.total.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass border border-white/8 rounded-2xl p-5">
                    <h4 className="text-white font-semibold mb-3 text-sm">Shipping Address</h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      123 University Street<br />
                      Beni Suef, 62511<br />
                      Egypt
                    </p>
                    <button className="mt-3 text-[#f5c842] text-xs hover:underline">Edit address</button>
                  </div>
                  <div className="glass border border-white/8 rounded-2xl p-5">
                    <h4 className="text-white font-semibold mb-3 text-sm">Account Info</h4>
                    <div className="space-y-2 text-sm text-white/40">
                      <div className="flex justify-between"><span>Member since</span><span className="text-white">Jan 2026</span></div>
                      <div className="flex justify-between"><span>Role</span><span className="text-[#f5c842]">Researcher</span></div>
                      <div className="flex justify-between"><span>2FA</span><span className="text-green-400">Enabled</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Order History
                </h1>
                <div className="space-y-4">
                  {mockOrders.map((order, i) => {
                    const s = statusConfig[order.status];
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass border border-white/8 rounded-2xl p-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <div>
                            <div className="text-white font-bold font-mono">{order.id}</div>
                            <div className="text-white/30 text-xs">{order.date}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${s.color}`}>
                              {s.icon} {s.label}
                            </span>
                            <span className="text-[#f5c842] font-bold">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-2 px-3 py-2 bg-white/3 border border-white/5 rounded-xl">
                              <span className="text-xl">{emojiMap[item.id]}</span>
                              <div>
                                <div className="text-white text-sm font-medium">{item.name}</div>
                                <div className="text-white/30 text-xs">${item.price.toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg text-white/60 text-xs transition-colors">
                            View Invoice
                          </button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-[#f5c842]/10 hover:bg-[#f5c842]/20 border border-[#f5c842]/20 rounded-lg text-[#f5c842] text-xs transition-colors">
                              Reorder
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Account Settings
                </h1>
                <div className="space-y-6">
                  {/* Profile Info */}
                  <div className="glass border border-white/8 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: 'First Name', val: 'Sara', type: 'text' },
                        { label: 'Last Name', val: 'Ibrahim', type: 'text' },
                        { label: 'Email', val: 'sara@bsu.edu.eg', type: 'email' },
                        { label: 'Phone', val: '+20 1234567890', type: 'tel' },
                      ].map(f => (
                        <div key={f.label}>
                          <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">{f.label}</label>
                          <input type={f.type} defaultValue={f.val} className="input-field" />
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 px-5 py-2.5 bg-[#f5c842] text-[#0a1628] font-bold rounded-xl text-sm hover:bg-[#fcd34d] transition-colors">
                      Save Changes
                    </button>
                  </div>

                  {/* Password */}
                  <div className="glass border border-white/8 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Change Password</h3>
                    <div className="space-y-3 max-w-sm">
                      {['Current Password', 'New Password', 'Confirm Password'].map(f => (
                        <div key={f}>
                          <label className="text-white/40 text-xs uppercase tracking-widest mb-1.5 block">{f}</label>
                          <input type="password" placeholder="••••••••" className="input-field" />
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-colors">
                      Update Password
                    </button>
                  </div>

                  {/* Danger Zone */}
                  <div className="glass border border-red-500/15 rounded-2xl p-6">
                    <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                    <p className="text-white/30 text-sm mb-4">Permanently delete your account and all associated data.</p>
                    <button className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold rounded-xl text-sm hover:bg-red-500/20 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
