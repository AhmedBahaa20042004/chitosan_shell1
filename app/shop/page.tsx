'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, Filter, SlidersHorizontal, Check } from 'lucide-react';
import { products } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];
const categories = ['All', 'Raw Material', 'Pharmaceutical', 'Food & Agriculture', 'Environmental'];

const emojiMap: Record<string, string> = {
  'p1': '🧪', 'p2': '💊', 'p3': '🌿', 'p4': '🌱', 'p5': '⚗️', 'p6': '💧',
};

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem, items } = useCartStore();

  const isInCart = (id: string) => items.some(i => i.id === id);

  const filtered = products
    .filter(p => {
      const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    toast.success(`${product.name} added!`, { icon: '🛒' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="badge bg-[#f5c842]/10 border border-[#f5c842]/20 text-[#f5c842] mb-3">ChitoShell Store</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Shop Products
              </h1>
              <p className="text-white/40 mt-2">Sustainable biopolymers for science & industry</p>
            </div>
            <div className="text-white/30 text-sm">{filtered.length} products</div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                showFilters ? 'bg-[#f5c842] text-[#0a1628] border-[#f5c842]' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-white/30 text-xs uppercase tracking-widest mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            category === cat
                              ? 'bg-[#f5c842] text-[#0a1628]'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/8'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-white/30 text-xs uppercase tracking-widest mb-2 block">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setSort(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            sort === opt
                              ? 'bg-[#00b4d8]/20 text-[#00b4d8] border border-[#00b4d8]/30'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/8'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group glass border border-white/8 rounded-2xl overflow-hidden hover:border-[#f5c842]/25 transition-all duration-300 flex flex-col"
              >
                {/* Image Area */}
                <div className="relative h-44 bg-gradient-to-br from-[#0d1b2a] to-[#112240] flex items-center justify-center overflow-hidden">
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl"
                  >
                    {emojiMap[product.id]}
                  </motion.span>

                  {/* Radial glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-[#f5c842]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#f5c842] text-[#0a1628] text-xs font-bold rounded-lg shadow-lg">
                      {product.badge}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${
                    product.inStock ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                  }`}>
                    {product.inStock ? '● In Stock' : '○ Out of Stock'}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3 h-3 fill-[#f5c842] text-[#f5c842]" />
                    ))}
                    <span className="text-white/30 text-xs ml-1">(5.0)</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-1">
                    <span className="text-xs text-white/30 uppercase tracking-widest">{product.category}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                    {product.name}
                  </h3>
                  {product.concentration && (
                    <span className="inline-block mb-2 px-2 py-0.5 bg-[#00b4d8]/10 border border-[#00b4d8]/20 rounded-md text-[#00b4d8] text-xs">
                      {product.concentration}
                    </span>
                  )}
                  <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{product.description.slice(0, 100)}...</p>

                  {/* Specs preview */}
                  <div className="space-y-1 mb-4">
                    {product.details.slice(0, 2).map((d, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-white/30">
                        <Check className="w-3 h-3 text-[#f5c842] flex-shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-2xl font-bold text-[#f5c842]" style={{ fontFamily: 'var(--font-display)' }}>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isInCart(product.id)
                          ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                          : 'bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] hover:shadow-lg hover:shadow-[#f5c842]/20'
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {isInCart(product.id) ? (
                        <><Check className="w-4 h-4" /> Added</>
                      ) : (
                        <><ShoppingCart className="w-4 h-4" /> Add</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/40 text-lg">No products match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-[#f5c842] text-sm hover:underline">
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: '🔬', title: 'Research Grade', desc: 'Backed by peer-reviewed science' },
            { icon: '🌿', title: 'Sustainable', desc: 'Zero-waste shell valorization' },
            { icon: '🚚', title: 'Fast Shipping', desc: 'Egypt & international delivery' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'Supabase Auth + SSL encrypted' },
          ].map((badge, i) => (
            <div key={i} className="glass border border-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="text-white font-semibold text-sm">{badge.title}</div>
              <div className="text-white/30 text-xs mt-1">{badge.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
