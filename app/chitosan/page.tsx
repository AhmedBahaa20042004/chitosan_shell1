'use client';
import { motion } from 'framer-motion';
import { Thermometer, Clock, CheckCircle, Atom } from 'lucide-react';
import { chitosanSteps } from '@/lib/data';

const ddComparison = [
  { material: 'Chitin (raw)', dd: 5, color: '#ff6b6b' },
  { material: 'Partially deacetylated', dd: 50, color: '#fca03d' },
  { material: 'Chitosan (1 cycle)', dd: 72, color: '#f5c842' },
  { material: 'Chitosan (2 cycles)', dd: 88, color: '#4ecdc4' },
  { material: 'Chitosan (optimized)', dd: 95, color: '#00b4d8' },
];

export default function ChitosanPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge bg-[#a29bfe]/10 border border-[#a29bfe]/20 text-[#a29bfe] mb-4">Chemical Process</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Chitosan Conversion<br /><span className="text-gradient">via Deacetylation</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            The alkaline N-deacetylation of chitin to chitosan — a controlled reaction converting
            acetamido groups to free amino groups, unlocking remarkable biological and industrial properties.
          </p>
        </motion.div>

        {/* Chitin vs Chitosan comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                🧊 Chitin [C₈H₁₃NO₅]ₙ
              </h3>
              <div className="chem-formula text-sm mb-4">
                Repeat unit: 2-acetamido-2-deoxy-β-D-glucose<br />
                Functional group: –NHCOCH₃ (acetamido)<br />
                DA (degree of acetylation): 80–95%<br />
                Solubility: Insoluble in water and most solvents
              </div>
              <ul className="space-y-1 text-white/40 text-xs">
                <li>• Rigid, crystalline α-chitin structure</li>
                <li>• Poor processability limits applications</li>
                <li>• Strong intermolecular H-bonding</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass border border-[#f5c842]/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                ✨ Chitosan [C₆H₁₁NO₄]ₙ
              </h3>
              <div className="chem-formula text-sm mb-4">
                Repeat unit: 2-amino-2-deoxy-β-D-glucose<br />
                Functional group: –NH₂ (free amine, pKa ≈ 6.5)<br />
                DD (degree of deacetylation): 60–95%<br />
                Solubility: Soluble in dilute acids (pH &lt; 6.5)
              </div>
              <ul className="space-y-1 text-white/40 text-xs">
                <li>• Positively charged in acidic conditions → antimicrobial</li>
                <li>• Mucoadhesive → ideal for drug delivery</li>
                <li>• Chelates heavy metals → water treatment</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Core Reaction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="chem-formula text-center">
            <div className="text-[#a29bfe] text-xs tracking-widest uppercase mb-4">Deacetylation Reaction</div>
            <div className="text-base sm:text-lg leading-loose">
              [C₈H₁₃NO₅]ₙ + n NaOH <span className="text-[#f5c842]">──[50% NaOH, 100°C, 2-4h]──▶</span><br />
              [C₆H₁₁NO₄]ₙ + n CH₃COONa<br />
              <span className="text-white/40 text-sm">Chitin + Sodium Hydroxide → Chitosan + Sodium Acetate</span>
            </div>
          </div>
        </motion.div>

        {/* DD Progress Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-white/8 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Atom className="w-5 h-5 text-[#a29bfe]" />
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Degree of Deacetylation (DD%) Progress
            </h2>
          </div>
          <div className="space-y-4">
            {ddComparison.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/60 text-sm">{item.material}</span>
                  <span className="font-bold text-sm" style={{ color: item.color }}>{item.dd}% DD</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.dd}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white/3 rounded-xl">
            <p className="text-white/40 text-xs">
              DD measured by potentiometric titration or ¹H NMR (D₂O, 90°C). Chitosan is operationally defined as chitin with DD ≥ 60%.
              Source: Younes & Rinaudo, <em>Marine Drugs</em> 2015.
            </p>
          </div>
        </motion.div>

        {/* Conversion Steps */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Step-by-Step Procedure
          </h2>
          {chitosanSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass border border-white/8 rounded-2xl p-6"
                style={{ borderColor: step.color + '25' }}>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                      style={{ background: step.color + '15', color: step.color, fontFamily: 'var(--font-display)' }}>
                      {String(step.step).padStart(2, '0')}
                    </div>
                  </div>
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
                          <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/50">pH {step.pH}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{step.description}</p>
                    {step.equation && (
                      <div className="font-mono text-sm p-3 rounded-xl border whitespace-pre-line"
                        style={{ background: step.color + '08', borderColor: step.color + '30', color: step.color }}>
                        {step.equation}
                      </div>
                    )}
                  </div>
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

        {/* Properties Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-white/8 rounded-2xl p-8 mb-10"
        >
          <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Chitosan Physicochemical Properties
          </h2>
          <div className="table-responsive">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/40 font-medium">Property</th>
                  <th className="text-left py-2 pr-4 text-white/40 font-medium">Value / Range</th>
                  <th className="text-left py-2 text-white/40 font-medium">Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { prop: 'Molecular Weight', val: '50–2,000 kDa', sig: 'Affects viscosity, drug release rate, and film-forming ability' },
                  { prop: 'Degree of Deacetylation', val: '60–95%', sig: 'Higher DD = better solubility and antimicrobial activity' },
                  { prop: 'pKₐ of –NH₂', val: '≈ 6.5', sig: 'Protonated (–NH₃⁺) below pH 6.5 → positively charged → antimicrobial' },
                  { prop: 'Solubility', val: '1% acetic acid (pH < 6.5)', sig: 'pH-responsive solubility enables controlled drug release' },
                  { prop: 'Viscosity (1% in 1% AcOH)', val: '200–800 mPa·s', sig: 'Determines film thickness and coating applications' },
                  { prop: 'Crystallinity', val: 'Semi-crystalline (lower than chitin)', sig: 'Better reactivity and functionalization capability' },
                  { prop: 'Biodegradation', val: 'Lysozyme → N-acetyl glucosamine', sig: 'Biocompatible and biodegradable in vivo' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 text-[#f5c842] font-medium">{row.prop}</td>
                    <td className="py-3 pr-4 text-white font-mono text-xs">{row.val}</td>
                    <td className="py-3 text-white/40 text-xs">{row.sig}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* QC */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass border border-green-500/20 rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Final Product Specifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { test: 'Degree of Deacetylation', spec: '85–90% (¹H NMR / potentiometric titration)' },
              { test: 'Molecular Weight', spec: '200–400 kDa (GPC)' },
              { test: 'Moisture content', spec: '< 10% (105°C, 3h)' },
              { test: 'Ash content', spec: '< 1%' },
              { test: 'Solubility test', spec: 'Fully soluble in 1% AcOH at 25°C' },
              { test: 'Antimicrobial (MIC vs E. coli)', spec: '≤ 1.0 mg/mL' },
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
          <p className="text-white/20 text-xs mt-4 text-center">
            Reference: Younes & Rinaudo (2015) Marine Drugs DOI: 10.3390/md13031133 | Kong et al. (2010) Int. J. Food Microbiology
          </p>
        </motion.div>
      </div>
    </div>
  );
}
