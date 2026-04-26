import { redirect } from 'next/navigation';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sejarah Transaksi — TanyaLer',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatAmount(amount: number) {
  return `RM${Number(amount).toFixed(2)}`;
}

const statusConfig: Record<string, { label: string; class: string }> = {
  paid: { label: 'Berjaya', class: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Dalam Proses', class: 'bg-amber-100 text-amber-700' },
  failed: { label: 'Gagal', class: 'bg-rose-100 text-rose-700' },
};

const planConfig: Record<string, { label: string; icon: string }> = {
  topup: { label: 'Topup Kredit', icon: '⚡' },
  pro: { label: 'Pro Plan', icon: '⭐' },
};

export default async function TransactionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const service = await createServiceClient();
  const { data: transactions } = await service
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const { data: credits } = await service
    .from('credits')
    .select('balance, daily_free_used, daily_free_limit, total_used, plan')
    .eq('user_id', user.id)
    .single();

  const totalSpent = transactions
    ?.filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                Sejarah Transaksi
              </h1>
              <p className="text-slate-600">
                Rekod semua pembelian kredit anda
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
              <p className="text-sm font-medium text-slate-600 mb-2">Kredit Berbaki</p>
              <p className="text-3xl font-bold text-slate-900">{credits?.balance || 0}</p>
              <p className="text-xs text-slate-500 mt-1">kredit berbayar</p>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
              <p className="text-sm font-medium text-slate-600 mb-2">Jumlah Dibelanjakan</p>
              <p className="text-3xl font-bold text-slate-900">{formatAmount(totalSpent)}</p>
              <p className="text-xs text-slate-500 mt-1">semua masa</p>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
              <p className="text-sm font-medium text-slate-600 mb-2">Soalan Dijawab</p>
              <p className="text-3xl font-bold text-slate-900">{credits?.total_used || 0}</p>
              <p className="text-xs text-slate-500 mt-1">soalan setakat ini</p>
            </div>
          </div>

          {/* Transactions list */}
          {!transactions || transactions.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Tiada transaksi lagi
              </h3>
              <p className="text-slate-600 mb-6">
                Anda belum membuat sebarang pembelian kredit.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Lihat Pelan Harga
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900">
                  {transactions.length} transaksi
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {transactions.map((tx) => {
                  const statusCfg = statusConfig[tx.status] || statusConfig.pending;
                  const planCfg = planConfig[tx.plan] || planConfig.topup;

                  return (
                    <div key={tx.id} className="px-6 py-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {planCfg.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">
                            {planCfg.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {formatDate(tx.created_at)}
                          </p>
                          {tx.payment_id && (
                            <p className="text-xs text-slate-400 mt-0.5 truncate">
                              ID: {tx.payment_id}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-sm">
                            {formatAmount(tx.amount)}
                          </p>
                          <p className="text-xs text-emerald-700 font-medium">
                            +{tx.credits_purchased} kredit
                          </p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.class}`}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Topup CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm"
            >
              Beli lebih banyak kredit →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
