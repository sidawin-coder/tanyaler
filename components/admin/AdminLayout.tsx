'use client';
import { useState } from 'react';
import { AdminNav } from './AdminNav';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <h2 className="text-lg font-bold">Tanya<span className="text-emerald-400">Ler</span> <span className="text-slate-400 font-normal text-sm">· Admin</span></h2>
        <button onClick={() => setOpen(true)} className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-800" aria-label="Buka menu">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </header>

      <div className="md:flex">
        {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" aria-hidden="true"/>}
        <AdminNav open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 p-4 md:p-8 min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
