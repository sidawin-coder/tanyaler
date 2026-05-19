'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton';

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState(30);
  const { data: topQ } = useAnalytics('top-questions', dateRange);
  const { data: outScope } = useAnalytics('out-of-scope', dateRange);
  const { data: confData } = useAnalytics('confidence-distribution', dateRange);
  const { data: revData } = useAnalytics('revenue-tracker', dateRange);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-slate-600 mb-8">Analytics Tanyaler Real-time</p>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        {topQ ? <OverviewCards cards={[{label:'Soalan',value:topQ.length||0,color:'blue'},{label:'Out Scope',value:outScope?.length||0,color:'red'},{label:'High Conf',value:confData?.filter((d:any)=>d.confidence_band?.includes('0.80')).length||0,color:'green'},{label:'Users',value:revData?.[0]?.active_users||0,color:'amber'}]} /> : <LoadingSkeleton />}
      </div>
    </AdminLayout>
  );
}
