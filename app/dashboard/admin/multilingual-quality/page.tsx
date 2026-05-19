'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

const langName: Record<string, string> = { ms: 'Bahasa Malaysia', en: 'English', zh: '中文', cn: '中文' };

export default function MultilingualQualityPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data, loading } = useAnalytics('language-quality', dateRange);
  const langs = data || [];

  const totalQ = langs.reduce((s: number, x: any) => s + (x.question_count || x.count || 0), 0);
  const sorted = [...langs].sort((a: any, b: any) => (b.avg_confidence || 0) - (a.avg_confidence || 0));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Multilingual Quality 🌐</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Kualiti jawapan per bahasa (BM / EN / 中文).</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Soalan', value: totalQ, color: 'blue' },
            { label: 'Bilangan Bahasa', value: langs.length, color: 'green' },
            { label: 'Best Performer', value: best ? (langName[best.language] || best.language || '—') : '—', subtitle: best ? `Conf ${(best.avg_confidence || 0).toFixed(2)}` : '', color: 'amber' },
            { label: 'Needs Improvement', value: worst && langs.length > 1 ? (langName[worst.language] || worst.language) : '—', subtitle: worst && langs.length > 1 ? `Conf ${(worst.avg_confidence || 0).toFixed(2)}` : '', color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-1">Per-Language Breakdown</h2>
            <p className="text-sm text-slate-500 mb-4">Volume + avg confidence per bahasa.</p>
            {!langs.length ? (
              <p className="text-slate-400 text-sm">Tiada data multilingual untuk tempoh ini.</p>
            ) : (
              <div className="space-y-3">
                {langs.map((l: any, i: number) => {
                  const conf = l.avg_confidence || 0;
                  const color = conf >= 0.75 ? 'bg-emerald-500' : conf >= 0.55 ? 'bg-amber-400' : 'bg-red-500';
                  return (
                    <div key={i} className="border border-slate-100 rounded-xl p-3">
                      <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                        <p className="font-semibold text-slate-900">{langName[l.language] || l.language || 'Unknown'}</p>
                        <span className="text-xs text-slate-500">{l.question_count || l.count || 0} soalan</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-3 ${color} rounded-full`} style={{ width: `${conf * 100}%` }}/>
                        </div>
                        <span className="text-sm font-mono text-slate-700 w-16 text-right">{conf.toFixed(3)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>Bahasa dengan confidence rendah → pertimbangkan tambah translation/synonym dalam expandQuery()</li>
                  <li>Banding volume per bahasa → tahu target market sebenar (BM vs EN vs 中文)</li>
                  <li>BGE-M3 multilingual native — tapi corpus dominan BM. Untuk EN/中文 mungkin perlu enrichment.</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
