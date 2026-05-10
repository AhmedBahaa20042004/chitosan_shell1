'use client';
import { motion } from 'framer-motion';
import { Thermometer, Clock, Beaker, FlaskConical, CheckCircle } from 'lucide-react';
import { chitinSteps } from '@/lib/data';

export default function ChitinPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] mb-4">Lab Procedure</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Chitin Extraction<br /><span className="text-gradient-teal">Protocol</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Step-by-step chemical extraction of pure α-chitin from crustacean shell waste,
            based on the validated protocol of No & Meyers (1995) and Rinaudo (2006).
          </p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass border border-[#f5c842]/20 rounded-2xl p-6 mb-12"
        >
          <div className="grid sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Thermometer className="w-4 h-4" />, label: 'Max Temp', val: '90°C', color: 'text-red-400' },
              { icon: <Clock className="w-4 h-4" />, label: 'Total Time', val: '~28h', color: 'text-[#f5c842]' },
              { icon: <Beaker className="w-4 h-4" />, label: 'Purity', val: '≥90%', color: 'text-green-400' },
              { icon: <FlaskConical className="w-4 h-4" />, label: 'Yield', val: '15–25%', color: 'text-[#00b4d8]' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`${item.color} opacity-60`}>{item.icon}</div>
                <div className={`text-2xl font-bold ${item.color}`} style={{ fontFamily: 'var(--font-display)' }}>{item.val}</div>
                <div className="text-white/30 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chemical Equation Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="chem-formula text-center">
            <div className="text-[#f5c842] text-xs tracking-widest uppercase mb-3">Overall Reaction Summary</div>
            <div className="text-lg sm:text-xl leading-relaxed">
              Shrimp Shell (CaCO₃ + Protein + Chitin)
              <br />
              <span className="text-white/40 text-sm">
                ──[1M HCl, 25°C, 30min]──[1N NaOH, 90°C, 90min]──▶
              </span>
              <br />
              α-Chitin [C₈H₁₃NO₅]ₙ (≥90% purity)
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {chitinSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass border border-white/8 rounded-2xl p-6 hover:border-opacity-30 transition-all duration-300"
                style={{ borderColor: step.color + '30' }}>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                      style={{ background: step.color + '15', color: step.color, fontFamily: 'var(--font-display)' }}>
                      {String(step.step).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                        {step.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/50">
                          <Thermometer className="w-3 h-3" /> {step.temperature}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/50">
                          <Clock className="w-3 h-3" /> {step.duration}
                        </span>
                        {step.pH && (
                          <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/50">
                            pH {step.pH}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed mb-4">{step.description}</p>

                    {step.equation && (
                      <div className="font-mono text-sm p-3 rounded-xl border text-left whitespace-pre-line"
                        style={{ background: step.color + '08', borderColor: step.color + '30', color: step.color }}>
                        {step.equation}
                      </div>
                    )}
                  </div>

                  {/* Reagent */}
                  <div className="flex-shrink-0 lg:w-44">
                    <div className="p-3 bg-white/3 border border-white/5 rounded-xl text-center">
                      <div className="text-white/30 text-xs mb-1">Reagent</div>
                      <div className="text-white font-semibold text-sm leading-tight">{step.reagent}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Control */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-green-500/20 rounded-2xl p-8 mb-10"
        >
          <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Quality Control Specifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { test: 'Appearance', spec: 'White to off-white powder' },
              { test: 'Purity (chitin)', spec: '≥ 90% by gravimetric analysis' },
              { test: 'Ash content', spec: '< 2% (CaCO₃ residue)' },
              { test: 'Protein content', spec: '< 3% (Bradford assay)' },
              { test: 'Moisture content', spec: '< 10% (LOD at 105°C)' },
              { test: 'Degree of acetylation', spec: '> 80% (FTIR or ¹H NMR)' },
            ].map((qc, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 bg-white/3 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium text-sm">{qc.test}</div>
                  <div className="text-white/40 text-xs mt-0.5">{qc.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reference */}
        <div className="glass border border-white/5 rounded-xl p-4 text-center">
          <p className="text-white/30 text-xs">
            📚 Protocol based on: No, H.K. & Meyers, S.P. (1995). <em>J. Agric. Food Chem.</em> DOI: 10.1021/jf00055a041 |
            Rinaudo, M. (2006). <em>Prog. Polym. Sci.</em> DOI: 10.1016/j.progpolymsci.2006.06.001
          </p>
        </div>
      </div>
    </div>
  );
}
