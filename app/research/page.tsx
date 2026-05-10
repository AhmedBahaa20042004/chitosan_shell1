'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Search, Filter } from 'lucide-react';
import { researchPapers } from '@/lib/data';

const sourceColors: Record<string, string> = {
  PubMed: '#ff6b6b',
  ScienceDirect: '#f5c842',
  'Google Scholar': '#00b4d8',
  Nature: '#a29bfe',
  RSC: '#4ecdc4',
};

export default function ResearchPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', ...Array.from(new Set(researchPapers.flatMap(p => p.tags)))];

  const filtered = researchPapers.filter(paper => {
    const matchSearch = search === '' ||
      paper.title.toLowerCase().includes(search.toLowerCase()) ||
      paper.authors.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || paper.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge bg-[#a29bfe]/10 border border-[#a29bfe]/20 text-[#a29bfe] mb-4">Scientific Literature</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Research &<br /><span className="text-gradient">Citations</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Peer-reviewed sources from PubMed, ScienceDirect, and Google Scholar underpinning
            the ChitoShell project's scientific methodology and product claims.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search papers, authors, topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {allTags.slice(0, 12).map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTag === tag
                    ? 'bg-[#f5c842] text-[#0a1628]'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-white/30 text-sm">{filtered.length} paper{filtered.length !== 1 ? 's' : ''} found</span>
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <Filter className="w-3 h-3" />
            Sources: PubMed, ScienceDirect, Google Scholar, Nature
          </div>
        </div>

        {/* Papers Grid */}
        <div className="space-y-5">
          {filtered.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white/30" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-base leading-snug flex-1 pr-4" style={{ fontFamily: 'var(--font-display)' }}>
                      {paper.title}
                    </h3>
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0"
                      style={{ background: sourceColors[paper.source] + '15', color: sourceColors[paper.source] }}
                    >
                      {paper.source}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-3 text-xs text-white/40">
                    <span>👥 {paper.authors.join(', ')}</span>
                    <span>📚 <em>{paper.journal}</em></span>
                    <span>📅 {paper.year}</span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4">{paper.abstract}</p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-md text-white/40 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5c842]/10 border border-[#f5c842]/20 text-[#f5c842] rounded-lg text-xs font-medium hover:bg-[#f5c842]/20 transition-colors flex-shrink-0"
                    >
                      DOI: {paper.doi.slice(0, 20)}... <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Citation Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 glass border border-white/5 rounded-xl p-6 text-center"
        >
          <h3 className="text-white font-semibold mb-2">Citation Policy</h3>
          <p className="text-white/30 text-sm max-w-2xl mx-auto">
            All scientific data, chemical procedures, temperatures, pH values, and yield percentages presented in
            ChitoShell project materials are derived from peer-reviewed literature. We follow APA 7th edition
            citation format. Product specifications are research-grade; pharmaceutical applications are for
            investigational use only.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
