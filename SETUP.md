# 🚀 PANDUAN SETUP TANYALER — LANGKAH DEMI LANGKAH

Panduan ini untuk Sidawin — baca dari atas ke bawah, ikut setiap langkah mengikut urutan.

---

## ✅ SENARAI SEMAK YANG DIPERLUKAN

Sebelum mula, pastikan anda ada:
- [ ] Komputer / laptop dengan internet
- [ ] Akaun e-mel aktif (Gmail disyorkan)
- [ ] Kad kredit / debit untuk bayaran API (boleh guna prepaid)
- [ ] Lebih kurang RM50-100 untuk kos awal API

---

## LANGKAH 1 — Install Node.js (10 minit)

Node.js diperlukan untuk jalankan projek Next.js ini.

1. Pergi ke **https://nodejs.org**
2. Klik butang **"LTS"** (bukan Current)
3. Muat turun dan install seperti biasa
4. Buka **Command Prompt** (Windows) atau **Terminal** (Mac)
5. Taip: `node --version`
6. Jika keluar nombor seperti `v20.x.x`, Node.js sudah berjaya install

---

## LANGKAH 2 — Daftar Supabase (Percuma) (15 minit)

Supabase adalah database dan auth anda.

1. Pergi ke **https://app.supabase.com**
2. Klik "Sign Up" — daftar dengan GitHub atau e-mel
3. Klik "New Project"
4. Isi:
   - **Name:** `tanyaler`
   - **Database Password:** (tulis dan simpan password ini!)
   - **Region:** Southeast Asia (Singapore)
5. Klik "Create new project" — tunggu 2-3 minit
6. Selepas siap, pergi ke **Settings → API**
7. **Salin dan simpan** 3 perkara ini:
   - `Project URL` → masukkan dalam `.env.local` sebagai `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → sebagai `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → sebagai `SUPABASE_SERVICE_ROLE_KEY`

### Setup Database

1. Dalam Supabase, klik **"SQL Editor"** di menu kiri
2. Klik **"New Query"**
3. Buka fail `/supabase/schema.sql` dari folder projek ini
4. Copy semua kandungan fail tersebut
5. Paste ke dalam SQL Editor
6. Klik **"Run"** (butang hijau)
7. Pastikan tiada error — jika ada, hubungi saya

### Enable Google Auth (Optional tapi digalakkan)

1. Dalam Supabase → **Authentication → Providers**
2. Klik **"Google"**
3. Enable toggle
4. Pergi ke **https://console.cloud.google.com**
5. Buat OAuth credentials (ada tutorial di Supabase)
6. Copy Client ID dan Secret ke Supabase

---

## LANGKAH 3 — Daftar OpenAI API (20 minit)

1. Pergi ke **https://platform.openai.com**
2. Sign up atau log masuk
3. Pergi ke **API Keys** (menu kiri)
4. Klik **"Create new secret key"**
5. Namakan: `TanyaLer Production`
6. **Salin key — ini HANYA ditunjukkan sekali!**
7. Masukkan dalam `.env.local` sebagai `OPENAI_API_KEY`

### Top-up Credit OpenAI

1. Pergi ke **Billing → Add payment method**
2. Masukkan kad kredit/debit
3. Klik **"Add credits"** — cadangan: tambah **USD10 (~RM47)** untuk permulaan
4. Ini akan tahan untuk ribuan soalan dengan GPT-4o mini

---

## LANGKAH 4 — Daftar BillPlz (30 minit)

1. Pergi ke **https://www.billplz.com**
2. Klik "Daftar" / "Sign Up"
3. Pilih jenis akaun: **Business**
4. Isi maklumat syarikat anda
5. Hantar dokumen yang diperlukan (SSM, IC)
6. Tunggu pengesahan (1-3 hari bekerja)

### Sementara menunggu — guna Sandbox untuk testing

1. Pergi ke **https://www.billplz-sandbox.com**
2. Daftar dengan e-mel yang sama
3. Pergi ke **Settings → API**
4. Salin:
   - API Key → `BILLPLZ_API_KEY`
   - Buat Collection baru, salin ID → `BILLPLZ_COLLECTION_ID`
5. Pergi ke **Settings → X Signature** — salin → `BILLPLZ_X_SIGNATURE`
6. Pastikan `BILLPLZ_MODE=sandbox` dalam `.env.local`

---

## LANGKAH 5 — Setup Projek di Komputer (15 minit)

### A. Muat turun kod projek

Anda ada 2 pilihan:

**Pilihan 1: Guna fail yang disediakan**
- Salin folder `tanyaler` ke desktop anda

**Pilihan 2: Buat dari awal dengan GitHub (lebih baik)**
1. Buat akaun GitHub percuma di github.com
2. Buat repository baharu bernama `tanyaler`
3. Upload semua fail ke repository

### B. Install dependencies

1. Buka **Command Prompt** / **Terminal**
2. Navigasi ke folder projek:
   ```
   cd Desktop/tanyaler
   ```
3. Jalankan:
   ```
   npm install
   ```
4. Tunggu sehingga selesai (5-10 minit)

### C. Buat fail .env.local

1. Dalam folder projek, buat fail baharu: `.env.local`
2. Isi dengan maklumat yang anda dah kumpul:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1N...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1N...
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
BILLPLZ_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
BILLPLZ_COLLECTION_ID=xxxxxxxx
BILLPLZ_X_SIGNATURE=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
BILLPLZ_MODE=sandbox
```

### D. Test secara lokal

```
npm run dev
```

Buka browser, pergi ke: **http://localhost:3000**

Jika nampak laman TanyaLer — berjaya! 🎉

---

## LANGKAH 6 — Deploy ke Vercel (Percuma) (20 minit)

### A. Daftar Vercel

1. Pergi ke **https://vercel.com**
2. Sign up dengan GitHub (lebih mudah)
3. Authorize Vercel akses ke GitHub

### B. Import projek

1. Klik **"Add New Project"**
2. Import dari GitHub → pilih repository `tanyaler`
3. Klik **"Import"**

### C. Tambah Environment Variables

Sebelum deploy, tambah semua variables dari `.env.local`:

1. Klik **"Environment Variables"**
2. Tambah satu persatu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `BILLPLZ_API_KEY`
   - `BILLPLZ_COLLECTION_ID`
   - `BILLPLZ_X_SIGNATURE`
   - `NEXT_PUBLIC_APP_URL` = `https://tanyaler.com` (guna domain anda)
   - `BILLPLZ_MODE` = `production` (selepas BillPlz approve)

4. Klik **"Deploy"**
5. Tunggu 2-3 minit

### D. Connect domain

1. Dalam Vercel → **Settings → Domains**
2. Tambah: `tanyaler.com` dan `tanyaler.my`
3. Vercel akan bagi DNS settings
4. Pergi ke tempat anda beli domain → tukar DNS mengikut arahan Vercel
5. Tunggu 24-48 jam untuk DNS propagate

---

## LANGKAH 7 — Update BillPlz untuk Production

Selepas domain confirmed:

1. Dalam BillPlz (live, bukan sandbox):
   - Buka collection anda
   - Set **Callback URL**: `https://tanyaler.com/api/payment/callback`
   - Set **Redirect URL**: `https://tanyaler.com/chat?payment=success`
2. Tukar dalam Vercel env vars:
   - `BILLPLZ_MODE` = `production`
   - Ganti semua BILLPLZ keys dengan keys live

---

## ⚠️ PERKARA PENTING — JANGAN LUPA

### Keselamatan
- ❌ Jangan share fail `.env.local` dengan sesiapapun
- ❌ Jangan commit `.env.local` ke GitHub (sudah ada dalam `.gitignore`)
- ✅ Simpan semua keys dalam tempat selamat (e.g. 1Password, Notepad encrypted)

### PDPA Compliance
- Tambah Privacy Policy di `/privacy` — template ada dalam kod
- Tambah link "Unsubscribe" dalam e-mel
- Jangan simpan data yang tidak perlu

### Monitor Kos
- Semak OpenAI usage setiap minggu: platform.openai.com/usage
- Set spending limit: platform.openai.com → Billing → Limits
- Cadangan: Set hard limit USD50/bulan untuk awal

---

## 🆘 CARA DAPATKAN BANTUAN

Jika ada masalah teknikal:

1. **Error dalam browser:** Tekan F12 → tab "Console" → copy error message
2. **Error dalam terminal:** Copy paste error tersebut
3. Google error message — biasanya ada jawapan di StackOverflow
4. Supabase ada dokumentasi lengkap di docs.supabase.com
5. Vercel ada support chat di vercel.com

---

## 📊 KOS BULANAN SELEPAS LAUNCH

| Item | Kos |
|---|---|
| Vercel (hosting) | RM0 (free tier) |
| Supabase (database) | RM0 (free tier) |
| Domain .com (tahunan) | ~RM50/tahun |
| Domain .my (tahunan) | ~RM60/tahun |
| OpenAI API (est. 1,000 soalan/hari) | ~RM40-80/bulan |
| **Jumlah** | **~RM40-80/bulan** |

**Potensi pendapatan** (100 pengguna berbayar × RM5 avg): **RM500/bulan**
**Margin**: ~85%

---

## 🎯 CHECKLIST SEBELUM LAUNCH

- [ ] Supabase database schema sudah dijalankan
- [ ] OpenAI API key bekerja (test di playground)
- [ ] BillPlz live mode aktif
- [ ] Domain tanyaler.com connected ke Vercel
- [ ] Domain tanyaler.my connected ke Vercel
- [ ] SSL certificate aktif (Vercel auto)
- [ ] Test daftar pengguna baru
- [ ] Test chat dengan soalan ePerolehan
- [ ] Test payment flow (kecil — RM5)
- [ ] Disclaimer visible di semua halaman
- [ ] Privacy Policy page ada
- [ ] Mobile-friendly (test di telefon)

---

Selamat maju jaya TanyaLer! 🚀
