-- ============================================================
-- ChitoShell — Enactus BSU 2026
-- Supabase PostgreSQL Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS / PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  image_url TEXT,
  badge TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  purity TEXT,
  concentration TEXT,
  details JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default products
INSERT INTO public.products (name, scientific_name, description, price, category, in_stock, purity, concentration, details) VALUES
(
  'Pure Chitosan Powder',
  'Poly-(1→4)-2-amino-2-deoxy-β-D-glucan',
  'Food-grade chitosan derived from shrimp shell waste via enzymatic deacetylation. 85-90% degree of deacetylation.',
  45.00,
  'Raw Material',
  TRUE,
  '≥95%',
  '85-90% DDA',
  '["DD: 85–90%", "MW: 200–400 kDa", "Viscosity: 200–800 mPa·s", "Ash Content: <1%", "Moisture: <10%", "Food-grade certified"]'
),
(
  'Chitosan–Metformin Capsules',
  'Chitosan-Metformin HCl Controlled Release',
  'Innovative controlled-release capsules combining pharmaceutical-grade chitosan with Metformin HCl.',
  120.00,
  'Pharmaceutical',
  TRUE,
  '99.9%',
  '500mg Metformin / 150mg Chitosan',
  '["Metformin HCl: 500mg/capsule", "Chitosan: 150mg", "Controlled-release matrix", "pH-sensitive coating pH 6.8–7.4"]'
),
(
  'Natural Food Preservative',
  'Chitosan Antimicrobial Solution 2% w/v',
  'Ready-to-use 2% chitosan solution with proven antimicrobial efficacy. Extends shelf life by 3–5 days naturally.',
  35.00,
  'Food & Agriculture',
  TRUE,
  NULL,
  '2% w/v in 1% acetic acid',
  '["Concentration: 2% w/v", "MIC vs S. aureus: 0.5 mg/mL", "Shelf-life extension: 3–5 days", "GRAS status (FDA 21 CFR)"]'
);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles: users read own, admin reads all
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can read all profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products: public read, admin write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT
  TO public USING (TRUE);

CREATE POLICY "Admin can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders: users see own orders, admin sees all
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage all orders"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Order Items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage order items"
  ON public.order_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contact Messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages FOR INSERT
  TO public WITH CHECK (TRUE);

CREATE POLICY "Admin can read all contact messages"
  ON public.contact_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
