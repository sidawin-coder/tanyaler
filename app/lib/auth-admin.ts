import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function checkAdminAccess(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { isAdmin: false, userId: null };
  }

  const token = authHeader.substring(7);
  
  try {
    const { data } = await supabase.auth.getUser(token);
    if (!data.user) return { isAdmin: false, userId: null };

    const userId = data.user.id;
    
    // Check admin_users table
    const response = await fetch('http://127.0.0.1:8000/api/check-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });

    if (response.ok) {
      return { isAdmin: true, userId };
    }
    return { isAdmin: false, userId };
  } catch (error) {
    return { isAdmin: false, userId: null };
  }
}
