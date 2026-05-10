'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Microscope, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Science', href: '#',
    children: [
      { label: 'About Shell Waste', href: '/about' },
      { label: 'Chitin Extraction', href: '/chitin' },
      { label: 'Chitosan Conversion', href: '/chitosan' },
      { label: 'Research & Papers', href: '/research' },
    ]
  },
  { label: 'Products', href: '/products' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const count = useCartStore(s => s.count());
  const toggleCart = useCartStore(s => s.toggleCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f5c842] to-[#d97706] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Microscope className="w-5 h-5 text-[#0a1628]" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00b4d8] rounded-full animate-pulse" />
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wide leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  Enactus BSU
                </div>
                <div className="text-[#f5c842] text-xs font-medium tracking-widest uppercase">
                  ChitoShell 2026
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname.startsWith('/about') || pathname.startsWith('/chitin') || pathname.startsWith('/chitosan') || pathname.startsWith('/research')
                        ? 'text-[#f5c842]' : 'text-white/70 hover:text-white'
                    }`}>
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-[#f5c842] bg-[#f5c842]/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-3 text-sm transition-all duration-150 ${
                              pathname === child.href
                                ? 'text-[#f5c842] bg-[#f5c842]/10'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Account</span>
              </Link>

              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#f5c842] text-[#0a1628] text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white"
              >
                {mobileOpen ? <X className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> : <Menu className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#0a1628]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <div className="px-3 py-2 text-xs font-semibold tracking-widest uppercase text-[#f5c842]/60">
                          {item.label}
                        </div>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2.5 text-white/70 hover:text-white text-sm rounded-lg hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 text-white font-medium text-sm rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-white/5">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-[#f5c842] text-sm font-medium">
                    <User className="w-4 h-4" /> Account
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
