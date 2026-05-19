'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function UsageBehaviorPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data: topQ, loading: l1 } = useAnalytics('top-questions', dateRange);
  const { data: peak, loading: l2 } = useAnalytics('peak-hours', dateRange);
  const { data: segs, loading: l3 } = useAnalytics('user-segmentation', dateRange);
  const loading = l1 || l2 || l3;

  const totalQ = (topQ || []).reduce((s: number, x: any) => s + (x.frequency || 0), 0);
  const totalUsers = (segs || []).reduce((s: number, x: any) => s + (x.user_count || x.count || 0), 0);
  const topQuestion = (topQ || [])[0];
  const peakHour = (peak || []).slice().sort((a: any, b: any) => (b.question_count || b.count || 0) - (a.question_count || a.count || 0))[0];

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Usage & Behavior 📈</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Bagaimana pengguna berinteraksi dengan TanyaLer.</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Soalan', value: totalQ, color: 'blue' },
            { label: 'Total Pengguna', value: totalUsers, color: 'green' },
            { label: 'Peak Hour', value: peakHour?.hour != null ? `${peakHour.hour}:00` : '—', subtitle: peakHour ? `${peakHour.question_count || peakHour.count} soalan` : '', color: 'amber' },
            { label: 'Soalan #1', value: topQuestion?.frequency || 0, subtitle: '× diulang', color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-1">Top 10 Questions</h2>
            <p className="text-sm text-slate-500 mb-4">Soalan paling kerap ditanya — kandidat untuk FAQ.</p>
            {!(topQ || []).length ? (
              <p className="text-slate-400 text-sm">Tiada data.</p>
            ) : (
              <div className="space-y-2">
                {(topQ || []).slice(0, 10).map((q: any, i: number) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex gap-3 items-start">
                      <span className="font-bold text-slate-400 text-sm flex-shrink-0">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{q.question}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                          <span>🔁 {q.frequency}×</span>
                          <span>📊 Conf: {(q.avg_confidence || 0).toFixed(2)}</span>
                          <span>📅 {q.last_asked}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(peak || []).length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
              <h2 className="text-lg font-bold mb-1">Peak Hours</h2>
              <p className="text-sm text-slate-500 mb-4">Bila pengguna paling aktif (top 10 jam).</p>
              <div className="space-y-2">
                {(peak || []).slice(0, 10).map((p: any, i: number) => {
                  const count = p.question_count || p.count || 0;
                  const max = Math.max(...(peak || []).map((x: any) => x.question_count || x.count || 0), 1);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-600 w-16 flex-shrink-0">{p.hour != null ? `${String(p.hour).padStart(2,'0')}:00` : (p.date || '')}</span>
                      <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                        <div className="h-6 bg-emerald-500 rounded-lg" style={{ width: `${(count / max) * 100}%` }}/>
                      </div>
                      <span className="text-xs text-slate-500 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Peak hour {peakHour?.hour != null ? `${peakHour.hour}:00` : '—'} → schedule maintenance OUTSIDE jam ini</li>
                  <li>Top questions berulang banyak → boleh tukar ke FAQ untuk save kredit user</li>
                  <li>Banding peak hours dengan working hours Malaysia (9am-5pm) untuk faham user behavior</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
