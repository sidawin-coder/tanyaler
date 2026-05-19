'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function RagQualityPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data: confData, loading: l1 } = useAnalytics('confidence-distribution', dateRange);
  const { data: outScope, loading: l2 } = useAnalytics('out-of-scope', dateRange);
  const loading = l1 || l2;

  const total = (confData || []).reduce((s: number, x: any) => s + (x.count || 0), 0);
  const findBand = (key: string) => (confData || []).find((x: any) => x.confidence_band?.includes(key));
  const excellent = findBand('Excellent')?.percentage || 0;
  const good = findBand('Good')?.percentage || 0;
  const low = findBand('Low')?.percentage || 0;
  const lowCount = findBand('Low')?.count || 0;

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">RAG Quality 🎯</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Distribution confidence + soalan low-quality untuk tindakan.</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Soalan', value: total, color: 'blue' },
            { label: 'Excellent (≥0.80)', value: `${excellent}%`, color: 'green' },
            { label: 'Good (0.60-0.79)', value: `${good}%`, color: 'amber' },
            { label: 'Low (<0.40)', value: `${low}%`, subtitle: `${lowCount} soalan`, color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Confidence Distribution</h2>
            <div className="space-y-3">
              {(confData || []).map((band: any, i: number) => {
                const color = band.confidence_band?.includes('Excellent') ? 'bg-emerald-500' :
                              band.confidence_band?.includes('Good') ? 'bg-amber-400' :
                              band.confidence_band?.includes('Fair') ? 'bg-orange-400' : 'bg-red-500';
                return (
                  <div key={i}>
                    <div className="flex flex-wrap justify-between text-sm mb-1 gap-2">
                      <span className="font-medium text-slate-700">{band.confidence_band}</span>
                      <span className="text-slate-500 text-xs">{band.count} soalan ({band.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-3 ${color} rounded-full transition-all`} style={{ width: `${Math.min(band.percentage, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-1">Top Out-of-Scope Questions</h2>
            <p className="text-sm text-slate-500 mb-4">Soalan dengan low confidence — kandidat untuk tambah dokumen baru.</p>
            {!(outScope || []).length ? (
              <p className="text-slate-400 text-sm">Tiada data untuk tempoh ini.</p>
            ) : (
              <div className="space-y-2">
                {(outScope || []).slice(0, 10).map((q: any, i: number) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50">
                    <p className="text-sm font-medium text-slate-900">{q.question}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                      <span>📊 Conf: {(q.avg_confidence || 0).toFixed(2)}</span>
                      <span>🔁 {q.frequency || 1}×</span>
                      <span>📅 {q.last_asked}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Insight & Action</h3>
                <p className="text-sm text-amber-800 leading-relaxed mb-3">
                  {low > 50 ? `🔴 ${low}% soalan low confidence — KRITIKAL. Periksa RAG engine, MIN_SCORE threshold, atau tambah dokumen rasmi untuk topik yang lemah.` :
                   low > 20 ? `🟡 ${low}% soalan low confidence — pertimbangkan reindex docs atau tambah dokumen baru.` :
                   `✅ ${low}% low confidence — sistem sihat.`}
                </p>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>Top out-of-scope questions = signal user tanya tapi system tak ada jawapan</li>
                  <li>Soalan berulang dengan confidence rendah = prioritize tambah dokumen</li>
                  <li>Banding tarikh — kalau low confidence trending naik, ada regression dalam RAG pipeline</li>
                  <li>Filter test_eval data dahulu untuk metric pelanggan sebenar</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
