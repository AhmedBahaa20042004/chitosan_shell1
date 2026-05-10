# 🦐 ChitoShell — Enactus BSU 2026

> **Converting shrimp shell waste into chitin and chitosan products.**
> A sustainable bioeconomy project by Enactus Beni-Suef University.

---

## 🌟 Project Overview

ChitoShell is a social entrepreneurship initiative that transforms 3.8 million metric tons of annual shrimp shell waste into high-value chitin and chitosan biopolymers — addressing environmental pollution while creating pharmaceutical, agricultural, and environmental products.

**Tech Stack:** Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · Supabase · Recharts · Zustand

---

## 🗂️ Pages

| Route | Description |
|-------|-------------|
| `/` | Hero homepage with charts and mission |
| `/about` | Shrimp shell waste statistics and environmental impact |
| `/chitin` | Step-by-step chitin extraction protocol with equations |
| `/chitosan` | Deacetylation process, DD charts, QC specs |
| `/research` | Searchable peer-reviewed paper citations |
| `/products` | Full product catalog with specifications |
| `/shop` | Filterable shop with cart |
| `/login` | Auth page (Sign In / Sign Up) |
| `/profile` | User dashboard with orders and settings |
| `/admin` | Admin dashboard: KPIs, orders, products, analytics |
| `/contact` | Contact form and team directory |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/enactus-bsu/chitoshell.git
cd chitoshell
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `supabase-schema.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Environment Variables

```bash
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Scientific Foundation

All chemical data, procedures, temperatures, pH values, and yield statistics are sourced from peer-reviewed literature:

| Reference | DOI |
|-----------|-----|
| Rinaudo (2006) — Chitin & Chitosan Properties | `10.1016/j.progpolymsci.2006.06.001` |
| No & Meyers (1995) — Extraction Protocol | `10.1021/jf00055a041` |
| Younes & Rinaudo (2015) — Deacetylation | `10.3390/md13031133` |
| Kong et al. (2010) — Antimicrobial Activity | `10.1016/j.ijfoodmicro.2010.09.012` |
| Azuma et al. (2015) — Drug Delivery | `10.1007/s10719-015-9608-4` |
| FAO (2022) — Global Shrimp Statistics | FAO Technical Paper |
| Babel & Kurniawan (2004) — Water Treatment | `10.1016/j.chemosphere.2004.04.028` |

---

## 🧬 Key Chemical Processes

### Chitin Extraction
```
Shrimp Shell → [1M HCl, 25°C, 30min] → Demineralization
             → [1N NaOH, 90°C, 90min] → Deproteinization
             → α-Chitin [C₈H₁₃NO₅]ₙ (≥90% purity)

CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
```

### Chitosan Conversion
```
[C₈H₁₃NO₅]ₙ + NaOH → [C₆H₁₁NO₄]ₙ + CH₃COONa
    Chitin    50% NaOH     Chitosan    Sodium Acetate
             100-120°C
             2-4 hours
             DD ≥ 85%
```

---

## 🛍️ Products

| Product | Category | Price |
|---------|----------|-------|
| Pure Chitosan Powder (DD 85-90%) | Raw Material | $45.00 |
| Chitosan–Metformin Capsules | Pharmaceutical | $120.00 |
| Natural Food Preservative (2% w/v) | Food & Agriculture | $35.00 |
| Agricultural Chitosan Spray | Food & Agriculture | $28.00 |
| Chitin Raw Powder | Raw Material | $55.00 |
| Chitosan Water Filter Kit | Environmental | $75.00 |

---

## 🗄️ Database Schema

```
profiles         → User accounts (linked to Supabase Auth)
products         → Product catalog with JSONB details
orders           → Customer orders with status tracking
order_items      → Line items per order
contact_messages → Contact form submissions
```

All tables use Row-Level Security (RLS) so users only access their own data; admins access everything.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary (Navy) | `#0a1628` |
| Accent (Gold) | `#f5c842` |
| Highlight (Teal) | `#00b4d8` |
| Display Font | Playfair Display |
| Body Font | DM Sans |
| Mono Font | JetBrains Mono |

---

## 📁 Project Structure

```
enactus-bsu/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # Shrimp shell waste
│   ├── chitin/page.tsx     # Chitin extraction
│   ├── chitosan/page.tsx   # Chitosan conversion
│   ├── research/page.tsx   # Research papers
│   ├── products/page.tsx   # Product catalog
│   ├── shop/page.tsx       # Shop with cart
│   ├── login/page.tsx      # Auth
│   ├── profile/page.tsx    # User dashboard
│   ├── admin/page.tsx      # Admin dashboard
│   ├── contact/page.tsx    # Contact
│   └── globals.css         # Design tokens + utilities
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── CartDrawer.tsx
├── lib/
│   ├── data.ts             # Static data, products, papers
│   └── supabase.ts         # Supabase client
├── store/
│   └── cartStore.ts        # Zustand cart state
├── types/
│   └── index.ts            # TypeScript interfaces
├── supabase-schema.sql     # Run this in Supabase SQL editor
└── .env.local.example      # Environment variable template
```

---

## 🔐 Authentication Flow

1. **Sign Up** → Supabase Auth creates user → trigger auto-creates `profiles` row
2. **Sign In** → JWT session stored in cookies via `@supabase/auth-helpers-nextjs`
3. **RLS** → Every DB query automatically scoped to authenticated user
4. **Admin** → Role set to `'admin'` in `profiles.role` column

---

## 🌍 Impact Metrics

- **9.4M MT** of shrimp produced globally per year
- **3.8M MT** of shell waste generated annually
- **$1.2B** global chitosan market (2024)
- **2.3 kg CO₂e** saved per kg of shells processed
- **15–25%** chitin yield from dry shell weight

---

## 👥 Team — Enactus BSU 2026

| Name | Role |
|------|------|
| Dr. Ahmed Hassan | Project Lead & Biochemist |
| Nour El-Din Mohamed | Chemical Engineer |
| Sara Ibrahim | Pharmaceutical Researcher |
| Khaled Youssef | Environmental Scientist |
| Mariam Tarek | Business Development |
| Omar Sayed | Marketing & Outreach |

---

## 📜 License

© 2026 Enactus BSU — ChitoShell Project. All rights reserved.
Scientific content is for educational purposes. Pharmaceutical products are research formulations.

---

*Built with ❤️ by Enactus Beni-Suef University | Powered by Next.js + Supabase*
