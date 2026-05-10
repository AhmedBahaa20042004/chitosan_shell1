import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ChitoShell — Enactus BSU 2026 | Shrimp Shell to Chitosan',
  description: 'Converting shrimp shell waste into valuable chitin and chitosan products. A sustainable bioeconomy project by Enactus Beni-Suef University.',
  keywords: ['chitosan', 'chitin', 'shrimp shell', 'biopolymer', 'Enactus', 'BSU', 'sustainable', 'pharmaceutical'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#0a1628] text-white" style={{ fontFamily: 'var(--font-body)' }}>
        <Navbar />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#112240',
              color: '#f8fafc',
              border: '1px solid rgba(245,200,66,0.2)',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
