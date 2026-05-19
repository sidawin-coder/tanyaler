import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as jose from 'jose';

const BACKEND = 'http://127.0.0.1:8000';
const JWT_SECRET = process.env.JWT_SECRET!;

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const reqId = Math.random().toString(36).substring(2, 8);
  console.log(`[CHAT-${reqId}] === New chat request at ${new Date().toISOString()} ===`);

  try {
    const body = await req.json();
    const userToken = req.headers.get('X-User-Token') || '';

    console.log(`[CHAT-${reqId}] X-User-Token length: ${userToken.length}, first 20 chars: "${userToken.substring(0, 20)}"`);
    console.log(`[CHAT-${reqId}] Body keys: ${Object.keys(body).join(',')} | messages count: ${body.messages?.length || 0}`);

    if (!userToken) {
      console.error(`[CHAT-${reqId}] ❌ FAIL: No X-User-Token header sent by frontend`);
      return NextResponse.json({ error: 'Token tidak ditemui. Sila log keluar dan masuk semula.', debug: 'no_token' }, { status: 401 });
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(userToken);
    if (error) {
      console.error(`[CHAT-${reqId}] ❌ FAIL: Supabase getUser error: code=${error.code} status=${error.status} message="${error.message}"`);
      return NextResponse.json({ error: 'Token tidak sah. Sila log keluar dan masuk semula.', debug: error.message, debug_code: error.code }, { status: 401 });
    }
    if (!user) {
      console.error(`[CHAT-${reqId}] ❌ FAIL: getUser returned no user (no error but no user either)`);
      return NextResponse.json({ error: 'Token tidak sah. Sila log keluar dan masuk semula.', debug: 'no_user_returned' }, { status: 401 });
    }

    console.log(`[CHAT-${reqId}] ✅ User authenticated: ${user.id} (${user.email})`);

    const secret = new TextEncoder().encode(JWT_SECRET);
    const internalToken = await new jose.SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];
    const question = lastMessage?.content || '';
    const history = messages.slice(0, -1).map((m: {role: string; content: string}) => ({
      role: m.role,
      content: m.content,
    }));

    console.log(`[CHAT-${reqId}] → Backend with question: "${question.substring(0, 60)}..."`);

    const t0 = Date.now();
    const res = await fetch(`${BACKEND}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${internalToken}`,
      },
      body: JSON.stringify({ question, conversation_history: history }),
    });
    const elapsed = Date.now() - t0;

    console.log(`[CHAT-${reqId}] ← Backend response: status=${res.status} time=${elapsed}ms`);

    const data = await res.json();

    if (!data.answer) {
      console.error(`[CHAT-${reqId}] ⚠️  No 'answer' in response. Keys: ${Object.keys(data).join(',')} | First 200: ${JSON.stringify(data).substring(0, 200)}`);
    } else {
      console.log(`[CHAT-${reqId}] ✅ Success: conf=${data.confidence}, balance=${data.credit_balance}`);
    }

    return NextResponse.json(data, { status: res.status });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error(`[CHAT-${reqId}] 💥 EXCEPTION: ${message}`);
    if (e instanceof Error && e.stack) {
      console.error(`[CHAT-${reqId}] Stack: ${e.stack.substring(0, 500)}`);
    }
    return NextResponse.json(
      { error: 'Sistem tidak dapat memproses permintaan ini.', detail: message },
      { status: 500 }
    );
  }
}
