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

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Tanya<span className="text-emerald-400">Ler</span></h2>
        <p className="text-xs text-slate-400">Admin Dashboard</p>
      </div>

      <div className="space-y-2">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
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

      <div className="mt-12 pt-6 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          Tanyaler System V1.0<br/>
          Admin Analytics
        </p>
      </div>
    </nav>
  );
}
