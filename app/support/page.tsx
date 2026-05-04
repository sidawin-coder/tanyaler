'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    category: 'Akaun & Log Masuk',
    items: [
      {
        q: 'Bagaimana cara mendaftar akaun TanyaLer?',
        a: 'Klik "Cuba Percuma" di mana-mana halaman, kemudian pilih "Teruskan dengan Google". Akaun anda akan dibuat secara automatik dalam masa kurang dari 30 saat. Tiada borang panjang, tiada kata laluan baru untuk diingat.',
      },
      {
        q: 'Bolehkah saya guna TanyaLer tanpa akaun Google?',
        a: 'Buat masa ini, TanyaLer menyokong log masuk melalui Google untuk keselamatan akaun anda. Kami merancang untuk menambah kaedah log masuk lain pada masa hadapan.',
      },
      {
        q: 'Saya terlupa akaun Google mana yang digunakan, macam mana?',
        a: 'Cuba log masuk dengan semua akaun Google yang ada. Jika masih tidak berjaya, hubungi kami di support@tanyaler.my bersama alamat e-mel yang mungkin anda gunakan.',
      },
    ],
  },
  {
    category: 'Kredit & Pelan Harga',
    items: [
      {
        q: 'Apakah pelan-pelan yang ditawarkan TanyaLer?',
        a: 'TanyaLer menawarkan 4 pelan: Explorer (Percuma — 5 kredit/hari), Rintis (RM39 — 50 kredit, sah 45 hari), Strategis (RM89 — 200 kredit, sah 120 hari, paling popular), dan Prestij (RM199 — 500 kredit, sah 250 hari). Semak halaman Harga untuk perbandingan penuh.',
      },
      {
        q: 'Berapa kredit percuma yang saya dapat setiap hari?',
        a: 'Pelan Explorer memberikan 5 kredit percuma setiap hari. Kredit ini diperbaharui secara automatik setiap tengah malam. Kredit yang tidak digunakan tidak akan dibawa ke hari berikutnya.',
      },
      {
        q: 'Apa itu Rollover Kredit dan pelan mana yang ada ciri ini?',
        a: 'Rollover bermakna kredit berbaki yang tidak digunakan akan dibawa ke hadapan apabila anda membeli semula. Hanya pelan Strategis (RM89) dan Prestij (RM199) mempunyai ciri Rollover. Pelan Rintis (RM39) TIDAK ada rollover — kredit akan hangus apabila tamat tempoh 45 hari.',
      },
      {
        q: 'Berapa lama kredit berbayar kekal sah?',
        a: 'Rintis: 45 hari | Strategis: 120 hari | Prestij: 250 hari. Kredit mula dikira dari tarikh pembelian. Pelan dengan Rollover akan membawa baki kredit ke tempoh pembelian berikutnya.',
      },
      {
        q: 'Adakah saya boleh mendapat bayaran balik?',
        a: 'Ya. Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Hubungi kami di support@tanyaler.my dengan subjek "Permohonan Refund" bersama bukti pembelian.',
      },
      {
        q: 'Apakah kaedah pembayaran yang diterima?',
        a: 'TanyaLer menerima pembayaran melalui FPX (internet banking semua bank utama Malaysia). Pembayaran diproses dengan selamat oleh BillPlz yang mematuhi standard keselamatan PCI-DSS.',
      },
      {
        q: 'Berapa lama kredit ditambah selepas bayar?',
        a: 'Kredit ditambah secara automatik dalam masa 1-2 minit selepas pembayaran berjaya disahkan oleh BillPlz.',
      },
    ],
  },
  {
    category: 'Penggunaan Sistem',
    items: [
      {
        q: 'Dalam bahasa apa saya boleh bertanya?',
        a: 'Anda boleh bertanya dalam Bahasa Malaysia, English, atau Bahasa Cina. Sistem dioptimumkan untuk Bahasa Malaysia tetapi boleh memahami dan menjawab dalam ketiga-tiga bahasa tersebut.',
      },
      {
        q: 'Topik apa yang boleh saya tanya?',
        a: 'TanyaLer memfokus kepada ePerolehan Malaysia — pendaftaran vendor, sijil MOF, sebut harga, tender, katalog produk, pemenuhan kontrak, kod UNSPSC, dan masalah teknikal sistem ePerolehan. Untuk soalan di luar topik ini, sistem akan memaklumkan anda dengan sopan.',
      },
      {
        q: 'Berapa banyak dokumen rasmi yang dirujuk sistem TanyaLer?',
        a: 'Sistem TanyaLer merujuk kepada 7,375 muka surat dari 56 dokumen rasmi ePerolehan Malaysia, termasuk PK 5.1 (Kuatkuasa pindaan 30 Jun 2025), pelbagai Manual Pengguna, Garis Panduan, dan Pekeliling MOF terkini.',
      },
      {
        q: 'Boleh saya percayai jawapan TanyaLer untuk buat keputusan tender?',
        a: 'Jawapan TanyaLer adalah untuk panduan dan rujukan am berdasarkan dokumen rasmi. Setiap jawapan disertakan dengan rujukan fail sumber spesifik yang boleh anda semak sendiri. Untuk keputusan perniagaan penting, sila sahkan dengan portal rasmi ePerolehan di www.eperolehan.gov.my atau hubungi pihak berkuasa berkenaan.',
      },
      {
        q: 'Mengapa jawapan ada badge "Ketepatan: Sederhana" atau "Tinggi"?',
        a: 'Badge Ketepatan menunjukkan tahap keyakinan sistem terhadap jawapan yang diberikan berdasarkan kepadanan dengan dokumen rasmi. Tinggi (80%+) = jawapan sangat disokong dokumen rasmi. Sederhana (55-79%) = jawapan ada rujukan tapi mungkin perlu pengesahan tambahan. Rendah (<55%) = sila sahkan dengan sumber rasmi.',
      },
      {
        q: 'Saya dapat mesej "kredit habis", apa perlu saya buat?',
        a: 'Ini bermakna kredit anda sudah habis. Pengguna Explorer: tunggu sehingga tengah malam untuk kredit percuma diperbaharui. Pengguna berbayar: topup kredit di halaman Harga. Pelan Strategis dan Prestij ada Rollover Kredit untuk keselesaan lebih.',
      },
      {
        q: 'Boleh saya share jawapan TanyaLer kepada rakan atau WhatsApp?',
        a: 'Ya! Setiap jawapan ada butang share di bawahnya. Anda boleh share terus ke WhatsApp, Telegram, Facebook, atau salin teks untuk dikongsi. Pastikan nyatakan sumber sebagai TanyaLer.my apabila berkongsi.',
      },
      {
        q: 'Adakah maklumat yang saya tanya disimpan atau dikongsi?',
        a: 'Soalan anda diproses untuk menghasilkan jawapan. Kami tidak menjual atau berkongsi data peribadi anda kepada pihak ketiga. Sila baca Dasar Privasi kami untuk maklumat lanjut tentang cara kami mengendalikan data anda.',
      },
    ],
  },
  {
    category: 'Teknikal & Sistem',
    items: [
      {
        q: 'Sistem TanyaLer menggunakan dokumen terkini?',
        a: 'Ya. Kami sentiasa mengemas kini dokumen apabila MOF atau portal ePerolehan menerbitkan panduan, pekeliling, atau manual baharu. Dokumen terkini dalam sistem termasuk PK 5.1 pindaan Jun 2025 dan pelbagai Garis Panduan 2025.',
      },
      {
        q: 'Kenapa ada rujukan "Sumber: [nama fail]" dalam jawapan?',
        a: 'Ini adalah ciri unik TanyaLer — setiap jawapan disertakan dengan nama fail rasmi yang menjadi sumber rujukan. Ini membolehkan anda verify sendiri maklumat dengan membuka dokumen asal. Ini bukan chatbot biasa — ini sistem rujukan berasaskan bukti.',
      },
      {
        q: 'Apakah yang perlu dilakukan jika sistem tidak dapat menjawab soalan saya?',
        a: 'Cuba ubah cara bertanya — jadikan lebih spesifik. Contoh: "Cara daftar vendor ePerolehan buat kali pertama" lebih baik dari "cara daftar". Jika masih tidak berjawab, kemungkinan soalan di luar skop ePerolehan atau maklumat belum ada dalam dokumen kami. Hubungi support@tanyaler.my untuk bantuan lanjut.',
      },
    ],
  },
];

export default function SupportPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Sokongan</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Kami sedia membantu.
          </h1>
          <p className="text-slate-500 text-lg">
            Ada soalan? Jumpa jawapan dalam senarai soalan lazim di bawah,
            atau hubungi pasukan kami terus.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <div className="text-2xl mb-3">📧</div>
            <h3 className="font-bold text-slate-900 mb-1">E-mel Sokongan</h3>
            <p className="text-slate-500 text-sm mb-3">Balas dalam 1-2 hari bekerja.</p>
            <a href="mailto:support@tanyaler.my"
              className="text-emerald-700 font-bold text-sm hover:underline">
              support@tanyaler.my
            </a>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="text-2xl mb-3">🕐</div>
            <h3 className="font-bold text-slate-900 mb-1">Waktu Operasi</h3>
            <p className="text-slate-500 text-sm mb-1">Sistem: 24/7 aktif</p>
            <p className="text-slate-500 text-sm">Sokongan e-mel: Isnin–Jumaat, 9am–6pm</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <div className="text-2xl mb-3">✅</div>
            <h3 className="font-bold text-slate-900 mb-1">Status Sistem</h3>
            <p className="text-slate-500 text-sm mb-2">Semua sistem berfungsi normal.</p>
            <span className="inline-flex items-center gap-1.5 text-green-700 text-sm font-bold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
              SYSTEM TANYALER V5.0 Aktif
            </span>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-slate-900 mb-8">Soalan Lazim</h2>

        <div className="space-y-10">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-black text-emerald-700 uppercase tracking-widest mb-4 pb-2 border-b border-emerald-100">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900 text-sm pr-4">{item.q}</span>
                        <span className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-slate-50 rounded-3xl p-8 text-center">
          <h3 className="font-black text-slate-900 text-xl mb-2">Tidak jumpa jawapan yang dicari?</h3>
          <p className="text-slate-500 text-sm mb-6">Hubungi pasukan sokongan kami terus melalui e-mel.</p>
          <a href="mailto:support@tanyaler.my"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-2xl text-sm transition-all">
            Hubungi Kami →
          </a>
        </div>
      </div>
    </div>
  );
}
