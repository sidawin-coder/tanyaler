import { NextRequest } from 'next/server';

const RAG_API_URL = 'http://127.0.0.1:8000';
const RAG_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3ZWJfMDAxIiwiZXhwIjoxNzgwNDAyNzc2fQ.2nep30uKEA2klacUks5w1xsmhq4-R_tXD6b-1gdTNRw';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: { role: string; content: string }[] = body.messages || [];
    if (!messages.length) {
      return Response.json({ error: 'Tiada mesej' }, { status: 400 });
    }

    const question = messages[messages.length - 1].content;
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch(`${RAG_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAG_API_TOKEN}`,
      },
      body: JSON.stringify({
        question,
        session_id: 'web',
        conversation_history: history,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const detail = errData?.detail || {};
      const errorType = typeof detail === 'object' ? detail?.error : '';
      const errorMsg = typeof detail === 'object' ? detail?.message : String(detail);

      if (errorType === 'multiple_questions') {
        return Response.json({
          answer: '⚠️ ' + errorMsg + '\n\nSila tanya satu soalan pada satu masa.',
          source_files: [],
          has_sources: false,
          confidence: 0,
        });
      }

      if (errorType === 'insufficient_credits' || response.status === 402) {
        return Response.json({
          answer: 'Kredit anda telah habis. Sila topup untuk teruskan.',
          source_files: [],
          has_sources: false,
          confidence: 0,
          credit_balance: 0,
        });
      }

      if (errorType === 'out_of_scope') {
        return Response.json({
          answer: errorMsg || 'Soalan di luar skop ePerolehan.',
          source_files: [],
          has_sources: false,
          confidence: 0,
          is_out_of_scope: true,
        });
      }

      return Response.json({
        answer: errorMsg || 'Ralat berlaku. Sila cuba semula.',
        source_files: [],
        has_sources: false,
        confidence: 0,
      });
    }

    const data = await response.json();
    return Response.json({
      answer: data.answer || '',
      source_files: data.source_files || [],
      has_sources: data.has_sources || false,
      confidence: data.confidence || 0,
      credit_balance: data.credit_balance ?? null,
      credit_used: data.credit_used ?? 1,
      share_urls: data.share_urls || null,
      is_out_of_scope: data.is_out_of_scope || false,
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Tanyaler RAG API Error]', msg);
    return Response.json({
      answer: 'Maaf, sistem AI tidak dapat diakses sekarang. Sila cuba sebentar lagi.',
      source_files: [],
      has_sources: false,
      confidence: 0,
    }, { status: 500 });
  }
}