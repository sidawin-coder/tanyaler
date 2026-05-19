'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function RevenuePlansPage() {
  const [dateRange, setDateRange] = useState(30);
  const { data, loading } = useAnalytics('revenue-tracker', dateRange);
  const days = data || [];

  const totalActiveUsers = Math.max(...days.map((d: any) => d.active_users || 0), 0);
  const totalCreditsUsed = days.reduce((s: number, d: any) => s + (Number(d.total_credits_used) || 0), 0);
  const avgPerUser = days.length ? (days.reduce((s: number, d: any) => s + (Number(d.avg_credits_per_user) || 0), 0) / days.length).toFixed(1) : 0;
  const peakDay = days.slice().sort((a: any, b: any) => (b.total_credits_used || 0) - (a.total_credits_used || 0))[0];

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Revenue & Plans 💰</h1>
      <p className="text-slate-600 mb-6 text-sm md:text-base">Daily credit usage + active users (excludes test accounts).</p>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {loading ? <LoadingSkeleton /> : (
        <>
          <OverviewCards cards={[
            { label: 'Peak Active Users', value: totalActiveUsers, color: 'blue' },
            { label: 'Total Credits Used', value: totalCreditsUsed, color: 'green' },
            { label: 'Avg/User/Day', value: avgPerUser, color: 'amber' },
            { label: 'Peak Day Usage', value: peakDay?.total_credits_used || 0, subtitle: peakDay?.date || '', color: 'red' },
          ]} />

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-1">Daily Usage</h2>
            <p className="text-sm text-slate-500 mb-4">Credits used per day (trend).</p>
            {!days.length ? (
              <p className="text-slate-400 text-sm">Tiada data revenue untuk tempoh ini.</p>
            ) : (
              <>
                <div className="space-y-2">
                  {days.slice(0, 14).map((d: any, i: number) => {
                    const max = Math.max(...days.map((x: any) => x.total_credits_used || 0), 1);
                    const pct = ((d.total_credits_used || 0) / max) * 100;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-600 w-24 flex-shrink-0">{d.date}</span>
                        <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                          <div className="h-6 bg-emerald-500 rounded-lg flex items-center px-2" style={{ width: `${Math.max(pct, 2)}%` }}>
                            {pct > 30 && <span className="text-xs text-white font-semibold">{d.total_credits_used}</span>}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 w-16 text-right">{d.active_users || 0} user</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Insight & Action</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Pre-launch: data ini reflect testing sahaja, bukan customer sebenar</li>
                  <li>Selepas launch: monitor trend daily credits — kalau tinggi, scale infrastructure</li>
                  <li>Peak day = pelaburan marketing pada hari sama minggu depan</li>
                  <li>Plan adoption per tier akan ditambah selepas user_topup_balance reach scale (post-launch)</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
