'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard/admin', label: 'Overview', icon: '📊' },
  { href: '/dashboard/admin/rag-quality', label: 'RAG Quality', icon: '🎯' },
  { href: '/dashboard/admin/usage-behavior', label: 'Usage & Behavior', icon: '📈' },
  { href: '/dashboard/admin/document-performance', label: 'Documents', icon: '📄' },
  { href: '/dashboard/admin/revenue-plans', label: 'Revenue', icon: '💰' },
  { href: '/dashboard/admin/multilingual-quality', label: 'Languages', icon: '🌐' },
  { href: '/dashboard/admin/system-health', label: 'System Health', icon: '⚕️' },
  { href: '/dashboard/admin/topic-clustering', label: 'Topics', icon: '🏷️' }
];

interface AdminNavProps {
  open?: boolean;
  onClose?: () => void;
}

export function AdminNav({ open = false, onClose }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav className={`fixed md:sticky top-0 left-0 z-50 md:z-auto w-72 md:w-64 h-screen bg-slate-900 text-white p-6 flex flex-col transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto`}>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Tanya<span className="text-emerald-400">Ler</span></h2>
          <p className="text-xs text-slate-400">Admin Dashboard</p>
        </div>
        <button onClick={onClose} className="md:hidden p-1 rounded hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center" aria-label="Tutup">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6L18 18M6 18L18 6"/></svg>
        </button>
      </div>

      <div className="space-y-2 flex-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
              pathname === item.href
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700 space-y-2">
        <Link href="/dashboard" onClick={onClose} className="block text-xs text-slate-400 hover:text-emerald-400 transition-colors">
          ← Kembali ke User Dashboard
        </Link>
        <p className="text-xs text-slate-500 text-center pt-2">
          Tanyaler System V1.0
        </p>
      </div>
    </nav>
  );
}
