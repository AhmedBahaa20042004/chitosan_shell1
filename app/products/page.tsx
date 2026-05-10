'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const categories = ['All', 'Raw Material', 'Pharmaceutical', 'Food & Agriculture', 'Environmental'];

const emojiMap: Record<string, string> = {
  'p1': '🧪', 'p2': '💊', 'p3': '🌿', 'p4': '🌱', 'p5': '⚗️', 'p6': '💧',
};

export default function ProductsPage() {
  const [category, setCategory] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const addItem = useCartStore(s => s.addItem);

  const filtered = category === 'All' ? products : products.filter(p => p.category === category);

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, { icon: '🛒' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge bg-green-500/10 border border-green-500/20 text-green-400 mb-4">Product Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Chitosan-Based<br /><span className="text-gradient">Product Line</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Research-grade and commercial products derived from sustainably processed shrimp shell waste.
            All products backed by peer-reviewed science.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat
                  ? 'bg-[#f5c842] text-[#0a1628] font-bold'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="glass border border-white/8 rounded-2xl overflow-hidden hover:border-[#f5c842]/20 transition-all duration-300 flex flex-col"
              >
                {/* Product Visual */}
                <div className="relative h-40 bg-gradient-to-br from-[#112240] to-[#0a1628] flex items-center justify-center">
                  <span className="text-6xl animate-float">{emojiMap[product.id]}</span>
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#f5c842] text-[#0a1628] text-xs font-bold rounded-lg">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3 h-3 fill-[#f5c842] text-[#f5c842]" />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-auto">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>
                        {product.name}
                      </h3>
                      <span className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-lg text-xs font-medium ${
                        product.inStock ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {product.scientificName && (
                      <div className="text-[#00b4d8] text-xs mb-2 italic">{product.scientificName}</div>
                    )}

                    <p className="text-white/40 text-xs leading-relaxed mb-3">{product.description}</p>

                    {(product.purity || product.concentration) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.purity && (
                          <span className="px-2 py-0.5 bg-[#f5c842]/8 border border-[#f5c842]/15 rounded-md text-[#f5c842] text-xs">
                            Purity: {product.purity}
                          </span>
                        )}
                        {product.concentration && (
                          <span className="px-2 py-0.5 bg-[#00b4d8]/8 border border-[#00b4d8]/15 rounded-md text-[#00b4d8] text-xs">
                            {product.concentration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expandable Details */}
                  <div className="mb-4">
                    <button
                      onClick={() => setExpanded(expanded === product.id ? null : product.id)}
                      className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded === product.id ? 'rotate-180' : ''}`} />
                      Specifications
                    </button>
                    <AnimatePresence>
                      {expanded === product.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-2"
                        >
                          <ul className="space-y-1">
                            {product.details.map((detail, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-xs text-white/40">
                                <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price & Add */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <div className="text-2xl font-bold text-[#f5c842]" style={{ fontFamily: 'var(--font-display)' }}>
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="text-white/20 text-xs">per unit</div>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-[#f5c842]/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 glass border border-white/5 rounded-xl p-4 text-center"
        >
          <p className="text-white/20 text-xs">
            ⚗️ All products are produced from sustainably sourced shrimp shell waste.
            Pharmaceutical products (Chitosan-Metformin Capsules) are research/investigational formulations —
            not approved for clinical use without regulatory clearance. Food-grade and agricultural products
            comply with applicable regulations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
