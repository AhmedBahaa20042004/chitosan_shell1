'use client';
import Link from 'next/link';
import { Microscope, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060d18] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f5c842] to-[#d97706] flex items-center justify-center">
                <Microscope className="w-5 h-5 text-[#0a1628]" />
              </div>
              <div>
                <div className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>Enactus BSU</div>
                <div className="text-[#f5c842] text-xs tracking-widest uppercase">ChitoShell 2026</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Converting shrimp shell waste into valuable chitin and chitosan products — creating a sustainable circular economy from marine biopolymers.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Project Active — BSU 2026</span>
            </div>
          </div>

          {/* Science Pages */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-widest uppercase">Science</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Shell Waste', href: '/about' },
                { label: 'Chitin Extraction', href: '/chitin' },
                { label: 'Chitosan Conversion', href: '/chitosan' },
                { label: 'Research & Papers', href: '/research' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-[#f5c842] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-widest uppercase">Products</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Pure Chitosan', href: '/products' },
                { label: 'Chitosan-Metformin Capsules', href: '/products' },
                { label: 'Natural Preservatives', href: '/products' },
                { label: 'Water Filter Kit', href: '/products' },
                { label: 'Shop All', href: '/shop' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/40 hover:text-[#f5c842] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-widest uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-[#f5c842] mt-0.5 flex-shrink-0" />
                Beni-Suef University, Beni Suef, Egypt
              </li>
              <li className="flex items-center gap-2.5 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-[#f5c842] flex-shrink-0" />
                enactus@bsu.edu.eg
              </li>
              <li className="flex items-center gap-2.5 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-[#f5c842] flex-shrink-0" />
                +20 82 XXX XXXX
              </li>
            </ul>
            <div className="mt-5 pt-5 border-t border-white/5">
              <p className="text-white/30 text-xs mb-3">Affiliated with</p>
              <div className="flex flex-wrap gap-2">
                {['Enactus Egypt', 'Enactus Global', 'BSU'].map(org => (
                  <span key={org} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/40 text-xs flex items-center gap-1">
                    {org} <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-white/20 text-sm">
            © 2026 Enactus BSU — ChitoShell Project. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Citations'].map(item => (
              <Link key={item} href="/contact" className="text-white/20 hover:text-white/50 text-xs transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Scientific Disclaimer */}
        <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <p className="text-white/20 text-xs leading-relaxed text-center">
            ⚗️ Scientific data and chemical processes referenced from peer-reviewed sources: Rinaudo (2006), No & Meyers (1995), Younes & Rinaudo (2015), Kong et al. (2010), and FAO (2022).
            Pharmaceutical products are research formulations. Not intended as medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
