'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Microscope, FlaskConical, Leaf, ChevronDown } from 'lucide-react';
import { globalStats, productionData, chitosanApplications } from '@/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]" />

        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#f5c842]/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#00b4d8]/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#f5c842]/5 blur-2xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5c842]/10 border border-[#f5c842]/20 rounded-full text-[#f5c842] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#f5c842] rounded-full animate-pulse" />
              Enactus BSU 2026 — ChitoShell Project
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-white">From Ocean</span>
            <br />
            <span className="text-gradient">Waste to</span>
            <br />
            <span className="text-white">Science</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transforming 3.8 million metric tons of shrimp shell waste annually into{' '}
            <span className="text-white">chitin and chitosan</span> — bioactive polymers revolutionizing
            medicine, agriculture, and environmental science.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chitin" className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-[#f5c842]/20 transition-all duration-300">
              <Microscope className="w-4 h-4" />
              Explore the Science
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/shop" className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              Shop Products
            </Link>
          </motion.div>

          {/* Key numbers */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
          >
            {[
              { val: '9.4M', label: 'MT Shrimp/yr' },
              { val: '85%', label: 'Purity DD' },
              { val: '$1.2B', label: 'Market 2024' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#f5c842]" style={{ fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <div className="text-white/30 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 bg-[#060d18] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge bg-red-500/10 border border-red-500/20 text-red-400 mb-4">Environmental Crisis</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              The Scale of the Problem
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {globalStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass border border-white/8 rounded-2xl p-6 hover:border-[#f5c842]/20 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#f5c842] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                {stat.unit && <div className="text-white/40 text-xs mb-2">{stat.unit}</div>}
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                {stat.trend && (
                  <div className={`text-xs mt-2 font-medium ${stat.trend.startsWith('+') ? 'text-green-400' : stat.trend.startsWith('-') ? 'text-red-400' : 'text-white/30'}`}>
                    {stat.trend} YoY
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Chart */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge bg-[#f5c842]/10 border border-[#f5c842]/20 text-[#f5c842] mb-4">Global Data</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Shrimp Production &<br />Waste Trends
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Global shrimp aquaculture has grown 30% since 2018, generating proportionally more shell waste.
                The gap between waste generated and chitin recovered represents a massive untapped opportunity.
              </p>
              <div className="space-y-3">
                {[
                  { color: '#f5c842', label: 'Total Production (Million MT)' },
                  { color: '#ff6b6b', label: 'Shell Waste (Million MT)' },
                  { color: '#00b4d8', label: 'Chitin Recovered (Million MT)' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-white/50 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass border border-white/8 rounded-2xl p-6"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#0d1b2a', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8 }}
                    labelStyle={{ color: '#f5c842' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.7)' }}
                  />
                  <Line type="monotone" dataKey="production" stroke="#f5c842" strokeWidth={2} dot={{ fill: '#f5c842', r: 4 }} name="Production" />
                  <Line type="monotone" dataKey="waste" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 4 }} name="Waste" />
                  <Line type="monotone" dataKey="chitin" stroke="#00b4d8" strokeWidth={2} dot={{ fill: '#00b4d8', r: 4 }} name="Chitin" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-white/20 text-xs text-center mt-2">Source: FAO Fisheries Data 2022 + Projections</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-[#060d18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] mb-4">The Science</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Shell → Chitin → Chitosan
            </h2>
            <p className="text-white/40 mt-3 max-w-xl mx-auto text-sm">
              A precise multi-step biochemical process transforming crustacean waste into pharmaceutical-grade biopolymers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🦐',
                step: '01',
                title: 'Shrimp Shell Waste',
                desc: 'Collected from processing facilities. 40-50% of total weight is shell (exoskeleton), containing 20-30% chitin by dry weight.',
                color: '#f5c842',
                href: '/about',
              },
              {
                icon: '⚗️',
                step: '02',
                title: 'Chitin Extraction',
                desc: 'Demineralization with 1M HCl removes CaCO₃. Deproteinization with 1N NaOH at 90°C removes proteins. Yields ≥90% pure α-chitin.',
                color: '#00b4d8',
                href: '/chitin',
              },
              {
                icon: '🧬',
                step: '03',
                title: 'Chitosan Conversion',
                desc: 'Alkaline deacetylation with 50% NaOH at 100-120°C for 2-4 hours removes acetyl groups. Results in chitosan with DD >85%.',
                color: '#a29bfe',
                href: '/chitosan',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link href={item.href} className="block h-full group">
                  <div className="glass border border-white/8 rounded-2xl p-7 h-full hover:border-opacity-40 transition-all duration-300 relative overflow-hidden"
                    style={{ ['--hover-color' as string]: item.color }}>
                    <div className="absolute top-4 right-4 text-5xl font-black opacity-5" style={{ color: item.color, fontFamily: 'var(--font-display)' }}>
                      {item.step}
                    </div>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: item.color }}>
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Pie + Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass border border-white/8 rounded-2xl p-8"
            >
              <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Chitosan Market Applications
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <PieChart width={180} height={180}>
                  <Pie data={chitosanApplications} cx={90} cy={90} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {chitosanApplications.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="space-y-2.5 flex-1">
                  {chitosanApplications.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        <span className="text-white/60 text-sm">{item.name}</span>
                      </div>
                      <span className="text-white font-semibold text-sm">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/20 text-xs mt-4 text-center">Source: Global Chitosan Market Report 2024</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge bg-green-500/10 border border-green-500/20 text-green-400 mb-4">Our Products</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Commercial Products<br />from Shell Waste
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                We produce pharmaceutical-grade chitosan, innovative drug delivery systems, natural food preservatives, and environmental solutions — all from zero-cost shrimp shell waste.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '💊', name: 'Chitosan-Metformin Capsules', color: 'text-[#f5c842]' },
                  { icon: '🧪', name: 'Pure Chitosan Powder', color: 'text-[#00b4d8]' },
                  { icon: '🌿', name: 'Natural Preservatives', color: 'text-green-400' },
                  { icon: '💧', name: 'Water Filter Kit', color: 'text-[#a29bfe]' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white/3 border border-white/5 rounded-xl">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-white/60 text-xs leading-tight">{p.name}</span>
                  </div>
                ))}
              </div>
              <Link href="/products" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-[#f5c842]/20 transition-all duration-300">
                View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="py-20 bg-gradient-to-r from-[#0a1628] via-[#112240] to-[#0a1628] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex justify-center gap-3 mb-8">
              {[TrendingDown, FlaskConical, Leaf].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-[#f5c842]/10 border border-[#f5c842]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#f5c842]" />
                </div>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Circular Economy.<br />
              <span className="text-gradient">Zero Waste. Real Impact.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-2xl mx-auto">
              Every kilogram of shrimp shell we process saves 2.3 kg of CO₂ equivalent from entering landfills,
              produces pharmaceutical-grade biopolymers worth 40× the raw material cost, and creates sustainable
              local employment in Egypt's growing aquaculture sector.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
