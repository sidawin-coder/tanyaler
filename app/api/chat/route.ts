import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { getSystemPrompt } from '@/lib/knowledge-base';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, language = 'ms' } = await req.json();

    // 1. Semak auth
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Semak kredit (guna service client untuk bypass RLS dengan selamat)
    const serviceClient = createServiceClient();
    const { data: credits, error: creditError } = await serviceClient
      .from('credits')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (creditError || !credits) {
      return new Response(JSON.stringify({ error: 'credits_not_found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Reset daily count jika hari baru
    const today = new Date().toISOString().split('T')[0];
    if (credits.last_reset < today) {
      await serviceClient
        .from('credits')
        .update({ daily_free_used: 0, last_reset: today })
        .eq('user_id', user.id);
      credits.daily_free_used = 0;
    }

    // 4. Tentukan jenis kredit — free atau paid
    const hasFreeCredit = credits.daily_free_used < credits.daily_free_limit;
    const hasPaidCredit = credits.balance > 0;

    if (!hasFreeCredit && !hasPaidCredit) {
      return new Response(JSON.stringify({ error: 'insufficient_credits' }), {
        status: 402,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const creditType = hasFreeCredit ? 'free' : 'paid';

    // 5. Stream jawapan dari OpenAI
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: getSystemPrompt(language),
      messages,
      temperature: 0.7,
      maxTokens: 1500,
      onFinish: async ({ text, usage }) => {
        // 6. Tolak kredit selepas jawapan selesai
        if (creditType === 'free') {
          await serviceClient
            .from('credits')
            .update({ daily_free_used: credits.daily_free_used + 1 })
            .eq('user_id', user.id);
        } else {
          await serviceClient
            .from('credits')
            .update({ balance: credits.balance - 1, total_used: credits.total_used + 1 })
            .eq('user_id', user.id);
        }

        // 7. Log chat (tanpa data sensitif)
        const lastMessage = messages[messages.length - 1];
        await serviceClient.from('chat_logs').insert({
          user_id: user.id,
          question: lastMessage?.content?.substring(0, 500) || '',
          answer: text.substring(0, 1000),
          language,
          tokens_used: usage?.totalTokens || 0,
          credit_type: creditType,
        });
      },
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'server_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function GET() {
  return Response.json({
    message: "API TanyaLer berfungsi 👍"
  });
}
