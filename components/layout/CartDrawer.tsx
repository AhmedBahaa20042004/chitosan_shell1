'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0d1b2a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#f5c842]" />
                <h2 className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="bg-[#f5c842] text-[#0a1628] text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={toggleCart} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl">🦐</div>
                  <div>
                    <p className="text-white font-medium mb-1">Cart is empty</p>
                    <p className="text-white/40 text-sm">Add some products to get started</p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="mt-2 px-6 py-2.5 bg-[#f5c842] text-[#0a1628] rounded-xl font-semibold text-sm hover:bg-[#fcd34d] transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/5 border border-white/8 rounded-xl p-4 flex gap-3"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      🧪
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{item.name}</p>
                      <p className="text-[#f5c842] font-bold mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/30 hover:text-red-400 transition-colors self-start p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Subtotal</span>
                  <span className="text-white font-bold text-lg">${total().toFixed(2)}</span>
                </div>
                <Link
                  href="/shop"
                  onClick={toggleCart}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#f5c842] to-[#fcd34d] text-[#0a1628] font-bold rounded-xl hover:from-[#fcd34d] hover:to-[#f5c842] transition-all duration-200"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={toggleCart}
                  className="w-full py-2.5 text-white/50 text-sm hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
