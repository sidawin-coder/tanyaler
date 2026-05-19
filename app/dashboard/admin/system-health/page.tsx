'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function SystemHealthPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data, loading } = useAnalytics('system-health', dateRange);
  const rows = data || [];

  const totalQ = rows.reduce((s: number, r: any) => s + (r.question_count || 0), 0);
  const totalLow = rows.reduce((s: number, r: any) => s + (r.low_confidence_count || 0), 0);
  const avgConf = rows.length ? (rows.reduce((s: number, r: any) => s + (Number(r.avg_confidence) || 0), 0) / rows.length).toFixed(3) : 0;
  const lowPct = totalQ > 0 ? ((totalLow / totalQ) * 100).toFixed(1) : 0;

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">System Health ⚕️</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Hourly breakdown — quality + volume per jam.</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Total Soalan', value: totalQ, color: 'blue' },
            { label: 'Avg Confidence', value: avgConf, color: 'green' },
            { label: 'Low Confidence', value: totalLow, subtitle: `${lowPct}% dari total`, color: 'red' },
            { label: 'Hourly Records', value: rows.length, color: 'amber' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6 overflow-x-auto">
            <h2 className="text-lg font-bold mb-1">Hourly Breakdown</h2>
            <p className="text-sm text-slate-500 mb-4">Last 50 records (newest first).</p>
            {!rows.length ? (
              <p className="text-slate-400 text-sm">Tiada data system health.</p>
            ) : (
              <div className="min-w-[500px]">
                <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-2 mb-2">
                  <span>Tarikh</span>
                  <span>Jam</span>
                  <span>Soalan</span>
                  <span>Avg Conf</span>
                  <span>Low %</span>
                </div>
                <div className="space-y-1">
                  {rows.slice(0, 50).map((r: any, i: number) => (
                    <div key={i} className="grid grid-cols-5 gap-2 text-sm py-2 border-b border-slate-50 hover:bg-slate-50">
                      <span className="font-mono text-xs text-slate-600">{r.date}</span>
                      <span className="font-mono text-xs">{String(r.hour).padStart(2, '0')}:00</span>
                      <span className="font-semibold">{r.question_count}</span>
                      <span className={`font-mono text-xs ${Number(r.avg_confidence) >= 0.6 ? 'text-emerald-700' : Number(r.avg_confidence) >= 0.4 ? 'text-amber-700' : 'text-red-700'}`}>
                        {(Number(r.avg_confidence) || 0).toFixed(3)}
                      </span>
                      <span className={`font-semibold text-xs ${Number(r.low_confidence_percentage) > 50 ? 'text-red-700' : Number(r.low_confidence_percentage) > 20 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {r.low_confidence_percentage || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>Avg conf {avgConf} — target ≥0.55 untuk BGE-M3 BM</li>
                  <li>Low % per jam tinggi konsisten → ada regression dalam RAG pipeline pada masa itu</li>
                  <li>Banding pola hourly — system performant ke pada peak hours?</li>
                  <li>Untuk monitoring real-time, integrate dengan PM2 logs + journalctl</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
