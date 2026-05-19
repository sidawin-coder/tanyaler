'use client';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function CompleteAuth() {
  const params = useSearchParams();
  const next = params.get('next') ?? '/apps';

  useEffect(() => {
    // Handle token dari URL fragment (#access_token=...)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = next;
      } else {
        // Cuba parse dari hash
        const hash = window.location.hash;
        if (hash) {
          supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
              window.location.href = next;
            }
          });
        } else {
          window.location.href = '/login?error=auth_failed';
        }
      }
    });
  }, [next]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Mengesahkan akaun anda...</p>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CompleteAuth />
    </Suspense>
  );
}
