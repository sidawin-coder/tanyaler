'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function DocumentPerformancePage() {
  const [dateRange, setDateRange] = useState(30);
  const { data, loading } = useAnalytics('document-performance', dateRange);
  const docs = data || [];

  const total = docs.length;
  const excellent = docs.filter((d: any) => d.quality_status === 'Excellent').length;
  const good = docs.filter((d: any) => d.quality_status === 'Good').length;
  const poor = docs.filter((d: any) => d.quality_status === 'Poor').length;
  const poorDocs = docs.filter((d: any) => d.quality_status === 'Poor' || d.quality_status === 'Fair');

  const cleanName = (s: any) => {
    try { const a = JSON.parse(s); return Array.isArray(a) ? a[0] : s; } catch { return s; }
  };

  const badgeColor = (status: string) =>
    status === 'Excellent' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
    status === 'Good' ? 'bg-amber-100 text-amber-700 border-amber-200' :
    status === 'Fair' ? 'bg-orange-100 text-orange-700 border-orange-200' :
    'bg-red-100 text-red-700 border-red-200';

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Document Performance 📄</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Setiap dokumen — usage + confidence + quality status.</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Docs Used', value: total, color: 'blue' },
            { label: 'Excellent', value: excellent, color: 'green' },
            { label: 'Good', value: good, color: 'amber' },
            { label: 'Poor/Fair', value: poor + docs.filter((d:any)=>d.quality_status==='Fair').length, subtitle: 'Perlu reindex', color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6 overflow-x-auto">
            <h2 className="text-lg font-bold mb-1">Document Performance Table</h2>
            <p className="text-sm text-slate-500 mb-4">Sorted by usage (most-referenced first).</p>
            {!docs.length ? (
              <p className="text-slate-400 text-sm">Tiada data.</p>
            ) : (
              <div className="space-y-2 min-w-[600px] md:min-w-0">
                {docs.slice(0, 20).map((d: any, i: number) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-900 flex-1 min-w-0 truncate">{cleanName(d.source_files)}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeColor(d.quality_status)} flex-shrink-0`}>
                        {d.quality_status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>🔁 {d.reference_count}× referenced</span>
                      <span>📊 Avg conf: {(d.avg_confidence || 0).toFixed(3)}</span>
                      <span>📅 Last: {d.last_reference}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {poorDocs.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">🚨</div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2">Documents Perlu Reindex ({poorDocs.length})</h3>
                  <p className="text-sm text-red-800 mb-3">Documents below 0.60 avg confidence — pertimbangkan reindex atau replace dengan source rasmi yang baru.</p>
                  <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                    {poorDocs.slice(0, 5).map((d: any, i: number) => (
                      <li key={i} className="truncate">{cleanName(d.source_files)} — conf {(d.avg_confidence || 0).toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>Documents Poor → kandidat utama untuk Blocker #8 X2/X3 reindex (Format A)</li>
                  <li>Documents Excellent → contoh baik, banding chunking strategy untuk apply ke yang Poor</li>
                  <li>Documents dengan reference_count tinggi tapi confidence rendah = high impact untuk improve</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
