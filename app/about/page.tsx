'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, Globe, TrendingUp, Fish } from 'lucide-react';
import { globalStats, environmentalImpact, productionData } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="badge bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4">Environmental Impact</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Shrimp Shell Waste:<br />
            <span className="text-gradient">A Global Crisis</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            The global shrimp industry generates millions of metric tons of shell waste annually,
            creating serious environmental, economic, and public health challenges.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass border border-orange-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  The Problem
                </h2>
              </div>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>
                  Shrimp processing generates massive quantities of shell waste — heads, tails, and exoskeletons —
                  constituting <strong className="text-white">40–50% of total shrimp weight</strong>. In 2022,
                  global shrimp production reached <strong className="text-[#f5c842]">9.4 million metric tons</strong>,
                  generating approximately <strong className="text-white">3.8 million MT of shell waste</strong>.
                </p>
                <p>
                  In most developing countries, including Egypt, this waste is disposed of by open dumping, landfill,
                  or direct discharge into water bodies. This causes:
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    'Methane and ammonia emissions from protein decomposition',
                    'Eutrophication of water bodies from nitrogen overload',
                    'Unpleasant odors and public health risks in coastal communities',
                    'Loss of valuable biopolymers worth billions of USD',
                    'Soil and groundwater contamination',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass border border-[#f5c842]/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#f5c842]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#f5c842]" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  The Opportunity
                </h2>
              </div>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>
                  Shrimp shells are rich in <strong className="text-white">chitin</strong> (15–25% dry weight),
                  <strong className="text-white"> proteins</strong> (30–40%), <strong className="text-white">calcium carbonate</strong> (20–50%),
                  and <strong className="text-white">astaxanthin</strong> pigments — all recoverable as high-value products.
                </p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { component: 'Chitin', percent: '15–25%', color: '#f5c842' },
                    { component: 'Protein', percent: '30–40%', color: '#00b4d8' },
                    { component: 'CaCO₃', percent: '20–50%', color: '#ff6b6b' },
                    { component: 'Astaxanthin', percent: '0.1–0.5%', color: '#a29bfe' },
                  ].map((comp, i) => (
                    <div key={i} className="p-3 bg-white/3 rounded-xl border border-white/5">
                      <div className="font-bold text-sm" style={{ color: comp.color }}>{comp.percent}</div>
                      <div className="text-white/50 text-xs">{comp.component}</div>
                    </div>
                  ))}
                </div>
                <p>
                  The global chitosan market was valued at <strong className="text-[#f5c842]">$1.2 billion in 2024</strong>,
                  growing at 8.5% CAGR. Egypt's Mediterranean coast and Red Sea shrimp aquaculture sectors
                  produce sufficient waste for a commercially viable chitin/chitosan operation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Global Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {globalStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass border border-white/8 rounded-xl p-5"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-[#f5c842]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                {stat.unit && <div className="text-white/30 text-xs">{stat.unit}</div>}
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Production Chart */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Production vs Waste (Million MT)
            </h2>
            <div className="glass border border-white/8 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#0d1b2a', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8 }} />
                  <Bar dataKey="production" fill="#f5c842" radius={[4, 4, 0, 0]} name="Production" />
                  <Bar dataKey="waste" fill="#ff6b6b" radius={[4, 4, 0, 0]} name="Waste" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Environmental Impact Breakdown
            </h2>
            <div className="glass border border-white/8 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <PieChart width={160} height={160}>
                  <Pie data={environmentalImpact} cx={80} cy={80} outerRadius={70} paddingAngle={3} dataKey="value">
                    {environmentalImpact.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div className="space-y-3 flex-1">
                  {environmentalImpact.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-white/60 text-sm">{item.category}</span>
                      </div>
                      <span className="text-white font-semibold text-sm">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chemistry of Shells */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-[#00b4d8]/20 rounded-2xl p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Fish className="w-6 h-6 text-[#00b4d8]" />
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Composition of Shrimp Exoskeleton
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-white/60 text-sm leading-relaxed">
            <div>
              <h3 className="text-[#f5c842] font-semibold mb-2">Chitin Structure</h3>
              <p>Chitin is a linear polysaccharide composed of β-(1→4)-linked N-acetylglucosamine (GlcNAc) units. In crustaceans, it primarily occurs as α-chitin, with chains arranged in anti-parallel hydrogen-bonded sheets giving high crystallinity and mechanical strength.</p>
            </div>
            <div>
              <h3 className="text-[#00b4d8] font-semibold mb-2">Mineral Matrix</h3>
              <p>Calcium carbonate (CaCO₃) is the primary mineral, existing as calcite and aragonite polymorphs. The organic–mineral composite creates the hard, protective exoskeleton. CaCO₃ content varies 20–50% by dry weight depending on species and shell age.</p>
            </div>
            <div>
              <h3 className="text-green-400 font-semibold mb-2">Protein Network</h3>
              <p>Structural proteins (cuticlin, resilin) crosslink with chitin via covalent bonds. These must be completely removed during deproteinization to yield pure chitin. The protein hydrolysate recovered has value as animal feed supplement.</p>
            </div>
          </div>
        </motion.div>

        {/* Egypt Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-green-500/20 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              The Egyptian Context
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-white/60 text-sm leading-relaxed">
            <p>
              Egypt ranks among Africa's top shrimp producers, with aquaculture concentrated in the
              Nile Delta, Lake Manzala, Lake Burullus, and the Red Sea coast. Annual shrimp landings
              exceed <strong className="text-white">85,000 MT</strong>, generating approximately
              <strong className="text-[#f5c842]"> 34,000–42,000 MT of shell waste</strong> per year —
              nearly all of which is currently discarded untreated.
            </p>
            <p>
              The Beni Suef University ChitoShell project aims to establish a small-scale pilot plant
              that can process 500 kg of shell waste per day, producing 75–125 kg of chitin and
              60–100 kg of chitosan daily — demonstrating viability before scaling to industrial capacity.
              This creates direct employment for 15–20 workers and indirect benefits for the local
              shrimp processing industry.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
