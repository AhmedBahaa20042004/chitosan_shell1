'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Package, ShoppingBag, TrendingUp,
  AlertCircle, CheckCircle, Clock, Truck, ChevronRight, Settings, BarChart3
} from 'lucide-react';
import { products, teamMembers } from '@/lib/data';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 2400, orders: 12 },
  { month: 'Feb', revenue: 3600, orders: 18 },
  { month: 'Mar', revenue: 2800, orders: 14 },
  { month: 'Apr', revenue: 4200, orders: 21 },
  { month: 'May', revenue: 5100, orders: 26 },
];

const recentOrders = [
  { id: 'ORD-2026-003', user: 'Sara Ibrahim', product: 'Pure Chitosan', amount: 45.00, status: 'processing' },
  { id: 'ORD-2026-002', user: 'Ahmed Hassan', product: 'Chitosan-Metformin', amount: 120.00, status: 'shipped' },
  { id: 'ORD-2026-001', user: 'Nour Mohamed', product: 'Natural Preservative', amount: 35.00, status: 'delivered' },
  { id: 'ORD-2026-004', user: 'Khaled Youssef', product: 'Water Filter Kit', amount: 75.00, status: 'pending' },
];

const statusBadge: Record<string, string> = {
  processing: 'bg-[#f5c842]/10 text-[#f5c842] border-[#f5c842]/20',
  shipped: 'bg-[#00b4d8]/10 text-[#00b4d8] border-[#00b4d8]/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-white/10 text-white/50 border-white/10',
};

type AdminTab = 'dashboard' | 'orders' | 'products' | 'users' | 'analytics';

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('dashboard');

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#060d18]">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed left-0 top-20 bottom-0 w-64 bg-[#0a1628] border-r border-white/5 z-40 hidden lg:flex flex-col"
        >
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f5c842] to-[#d97706] flex items-center justify-center">
                <Settings className="w-4 h-4 text-[#0a1628]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Admin Panel</div>
                <div className="text-white/30 text-xs">ChitoShell 2026</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === item.id
                    ? 'bg-[#f5c842]/10 text-[#f5c842] border border-[#f5c842]/15'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {tab === item.id && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f5c842]/30 to-[#d97706]/30 flex items-center justify-center text-sm">👨‍💼</div>
              <div>
                <div className="text-white text-sm font-medium">Admin</div>
                <div className="text-white/30 text-xs">admin@bsu.edu.eg</div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main */}
        <main className="flex-1 lg:ml-64 min-h-screen p-6">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
                <p className="text-white/30 text-sm mt-1">ChitoShell project overview — May 2026</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', val: '$18,100', change: '+23%', icon: TrendingUp, color: 'text-[#f5c842]', bg: 'bg-[#f5c842]/10' },
                  { label: 'Total Orders', val: '91', change: '+18%', icon: ShoppingBag, color: 'text-[#00b4d8]', bg: 'bg-[#00b4d8]/10' },
                  { label: 'Active Users', val: '247', change: '+31%', icon: Users, color: 'text-green-400', bg: 'bg-green-500/10' },
                  { label: 'Products', val: `${products.length}`, change: 'Stable', icon: Package, color: 'text-[#a29bfe]', bg: 'bg-[#a29bfe]/10' },
                ].map((kpi, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass border border-white/8 rounded-2xl p-5"
                  >
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{kpi.val}</div>
                    <div className="text-white/40 text-xs mt-0.5">{kpi.label}</div>
                    <div className={`text-xs mt-2 font-medium ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-white/30'}`}>
                      {kpi.change} this month
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Revenue Chart */}
              <div className="glass border border-white/8 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Revenue Overview</h3>
                  <span className="text-white/30 text-xs">Jan–May 2026</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f5c842" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f5c842" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: '#0d1b2a', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8 }} />
                    <Area type="monotone" dataKey="revenue" stroke="#f5c842" strokeWidth={2} fill="url(#revGrad)" name="Revenue ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Orders */}
              <div className="glass border border-white/8 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Recent Orders</h3>
                  <button onClick={() => setTab('orders')} className="text-[#f5c842] text-xs hover:underline">View all</button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white/3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm">🛒</div>
                        <div>
                          <div className="text-white text-sm font-medium">{order.user}</div>
                          <div className="text-white/30 text-xs">{order.product}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-11 sm:ml-0">
                        <span className="text-[#f5c842] font-semibold text-sm">${order.amount.toFixed(2)}</span>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border capitalize ${statusBadge[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {tab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>All Orders</h1>
              <div className="glass border border-white/8 rounded-2xl overflow-hidden">
                <div className="table-responsive">
                  <table className="w-full">
                    <thead className="border-b border-white/8">
                      <tr>
                        {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentOrders.map((order, i) => (
                        <tr key={i} className="hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-white font-mono text-sm">{order.id}</td>
                          <td className="px-4 py-3 text-white/70 text-sm">{order.user}</td>
                          <td className="px-4 py-3 text-white/70 text-sm">{order.product}</td>
                          <td className="px-4 py-3 text-[#f5c842] font-semibold text-sm">${order.amount.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border capitalize ${statusBadge[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-white/30 hover:text-white text-xs transition-colors">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {tab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Products</h1>
                <button className="px-4 py-2 bg-[#f5c842] text-[#0a1628] font-bold rounded-xl text-sm hover:bg-[#fcd34d] transition-colors">
                  + Add Product
                </button>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass border border-white/8 rounded-2xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{'🧪💊🌿🌱⚗️💧'[i]}</div>
                      <span className={`px-2 py-0.5 rounded-lg text-xs border ${p.inStock ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{p.name}</h4>
                    <p className="text-white/30 text-xs mb-3">{p.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f5c842] font-bold">${p.price.toFixed(2)}</span>
                      <div className="flex gap-1.5">
                        <button className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-lg text-white/50 text-xs hover:text-white transition-colors">Edit</button>
                        <button className="px-2.5 py-1 bg-red-500/5 border border-red-500/10 rounded-lg text-red-400/50 text-xs hover:text-red-400 transition-colors">Delete</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {tab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>Team & Users</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass border border-white/8 rounded-2xl p-5 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f5c842]/20 to-[#d97706]/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">{member.name}</div>
                      <div className="text-[#f5c842] text-xs">{member.role}</div>
                      <div className="text-white/30 text-xs mt-0.5">{member.department}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {tab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>Analytics</h1>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Monthly Revenue ($)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: '#0d1b2a', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8 }} />
                      <Bar dataKey="revenue" fill="#f5c842" radius={[4, 4, 0, 0]} name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Monthly Orders</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00b4d8" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#00b4d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: '#0d1b2a', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8 }} />
                      <Area type="monotone" dataKey="orders" stroke="#00b4d8" strokeWidth={2} fill="url(#ordGrad)" name="Orders" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary Cards */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Avg Order Value', val: '$199', icon: '💰' },
                    { label: 'Conversion Rate', val: '3.8%', icon: '📈' },
                    { label: 'Return Customers', val: '42%', icon: '🔁' },
                    { label: 'Chitin Processed', val: '125 kg', icon: '🧪' },
                  ].map((s, i) => (
                    <div key={i} className="glass border border-white/8 rounded-2xl p-4 text-center">
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <div className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{s.val}</div>
                      <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
