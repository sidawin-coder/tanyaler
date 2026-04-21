-- =============================================
-- TanyaLer - Supabase Database Schema
-- Jalankan ini dalam SQL Editor Supabase
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: credits
-- Simpan baki kredit setiap pengguna
-- =============================================
CREATE TABLE IF NOT EXISTS public.credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance INT NOT NULL DEFAULT 0,           -- kredit berbayar (topup)
  daily_free_used INT NOT NULL DEFAULT 0,   -- soalan percuma hari ini
  daily_free_limit INT NOT NULL DEFAULT 5,  -- had percuma sehari
  last_reset DATE NOT NULL DEFAULT CURRENT_DATE,
  total_used INT NOT NULL DEFAULT 0,
  plan TEXT NOT NULL DEFAULT 'free',        -- 'free', 'basic', 'pro', 'enterprise'
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: chat_logs
-- Log semua soalan (tanpa data sensitif)
-- =============================================
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  language TEXT DEFAULT 'ms',
  tokens_used INT DEFAULT 0,
  credit_type TEXT DEFAULT 'free',          -- 'free' atau 'paid'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: transactions
-- Rekod semua pembayaran
-- =============================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  credits_purchased INT NOT NULL,
  billplz_bill_id TEXT,
  billplz_url TEXT,
  status TEXT DEFAULT 'pending',            -- 'pending', 'paid', 'failed'
  plan TEXT DEFAULT 'topup',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Keselamatan - pengguna hanya boleh lihat data mereka sendiri
-- =============================================
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Credits: pengguna boleh lihat & kemaskini kredit sendiri
CREATE POLICY "Users can view own credits"
  ON public.credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON public.credits FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role boleh buat semua (untuk API routes)
CREATE POLICY "Service role full access credits"
  ON public.credits FOR ALL
  USING (auth.role() = 'service_role');

-- Chat logs: pengguna boleh insert & view sendiri
CREATE POLICY "Users can insert own chat logs"
  ON public.chat_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own chat logs"
  ON public.chat_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access chat_logs"
  ON public.chat_logs FOR ALL
  USING (auth.role() = 'service_role');

-- Transactions
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access transactions"
  ON public.transactions FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- FUNCTION: Auto-create credits row bila register
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.credits (user_id, balance, daily_free_used, daily_free_limit)
  VALUES (NEW.id, 0, 0, 5);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: panggil function di atas bila user baru daftar
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- INDEXES (untuk query laju)
-- =============================================
CREATE INDEX idx_credits_user_id ON public.credits(user_id);
CREATE INDEX idx_chat_logs_user_id ON public.chat_logs(user_id);
CREATE INDEX idx_chat_logs_created ON public.chat_logs(created_at DESC);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_billplz ON public.transactions(billplz_bill_id);
