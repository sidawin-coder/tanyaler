'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function TopicClusteringPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data, loading } = useAnalytics('topic-clustering', dateRange);
  const topics = data || [];

  const total = topics.reduce((s: number, t: any) => s + (t.frequency || t.count || 0), 0);
  const sorted = [...topics].sort((a: any, b: any) => (b.frequency || b.count || 0) - (a.frequency || a.count || 0));
  const top = sorted[0];

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Topic Clustering 🏷️</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Topik/tema yang user kerap tanya.</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Topics', value: topics.length, color: 'blue' },
            { label: 'Total Mentions', value: total, color: 'green' },
            { label: 'Top Topic', value: top ? (top.topic || top.keyword || top.cluster || '—') : '—', subtitle: top ? `${top.frequency || top.count} mentions` : '', color: 'amber' },
            { label: 'Avg per Topic', value: topics.length ? Math.round(total / topics.length) : 0, color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-1">Topics Distribution</h2>
            <p className="text-sm text-slate-500 mb-4">Sorted by frequency (top first).</p>
            {!topics.length ? (
              <p className="text-slate-400 text-sm">Tiada data topic clustering untuk tempoh ini.</p>
            ) : (
              <div className="space-y-2">
                {sorted.slice(0, 25).map((t: any, i: number) => {
                  const freq = t.frequency || t.count || 0;
                  const max = sorted[0]?.frequency || sorted[0]?.count || 1;
                  const pct = (freq / max) * 100;
                  return (
                    <div key={i} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50">
                      <div className="flex flex-wrap justify-between items-center mb-1 gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                          <span className="text-slate-400 mr-2">#{i + 1}</span>
                          {t.topic || t.keyword || t.cluster || JSON.stringify(t).slice(0, 80)}
                        </span>
                        <span className="text-xs text-slate-500 flex-shrink-0">{freq} mentions</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${pct}%` }}/>
                      </div>
                      {t.sample_questions && (
                        <p className="text-xs text-slate-400 mt-2 italic line-clamp-1">
                          e.g., {(Array.isArray(t.sample_questions) ? t.sample_questions[0] : t.sample_questions)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-purple-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                  <li>Top topics → prioritize untuk content marketing / blog posts</li>
                  <li>Topics yang tidak diliputi dokumen rasmi → tambah doc baru</li>
                  <li>Banding topic distribution dengan ePerolehan official categories</li>
                  <li>Pola topik = panduan untuk SEO keyword strategy</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
