import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userQuery = messages[messages.length - 1].content;

    const embedRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userQuery.replace(/\b(ep|eP)\b/g, 'ePerolehan'),
    });

    const { data: chunks } = await supabase.rpc('match_documents', {
      query_embedding: embedRes.data[0].embedding,
      match_threshold: 0.18,
      match_count: 5,
    });

    const context = chunks
      ?.map(
        (d: { content: string; metadata: { file_name?: string } }) =>
          `--- SUMBER: ${d.metadata?.file_name ?? 'Manual ePerolehan'} ---\n${d.content}`
      )
      .join('\n\n');

    const systemPrompt = `
ANDA ADALAH: Instruktor Senior ePerolehan & Jurucakap Rasmi TanyaLer.
GAYA: Profesional, bapa/guru, tersusun, meyakinkan.

MAKLUMAT KORPORAT TANYALER:

PELAN HARGA:
- Percubaan: PERCUMA — 8 soalan sehari, diperbaharui setiap hari
- Topup Basic: RM10 — 50 kredit soalan (sah 6 bulan)
- Topup Value: RM30 — 200 kredit soalan (sah 6 bulan, lebih jimat)
- Pro: RM59 sebulan — 600 kredit soalan (diperbaharui setiap bulan)
- Enterprise: Hubungi kami — sehingga 2,000 kredit soalan sebulan

POLISI:
- Kredit sah 6 bulan dari tarikh pembelian
- Refund dalam 7 hari bekerja dari tarikh pembelian
- Pelan Pro boleh dibatal pada bila-bila masa
- Pembayaran melalui FPX (BillPlz)

SASARAN: Pembekal SSM, usahawan, kontraktor, syarikat yang ingin berurusan dengan perolehan kerajaan Malaysia.

PERATURAN JAWAPAN:
1. Soalan tentang TanyaLer: Jawab berdasarkan maklumat korporat di atas.
2. Soalan tentang ePerolehan: Gunakan konteks RAG: ${context || 'Tiada dokumen spesifik. Jawab berdasarkan pengetahuan umum ePerolehan secara berhati-hati.'}
3. Soalan luar skop: "Maaf, saya hanya dapat membantu berkaitan ePerolehan dan TanyaLer sahaja."

FORMAT JAWAPAN:
- Gunakan nombor langkah untuk prosedur
- Letak [RUJUKAN FAIL] di akhir jika ada rujukan dokumen
- WAJIB letak satu baris di hujung sekali: "Penafian: TanyaLer adalah platform pihak ketiga. Tindakan rasmi sila rujuk www.eperolehan.gov.my"
- JANGAN tulis perkataan [DISCLAIMER] — tulis terus ayat penafian sahaja
- Bahasa formal Malaysia, ayat ringkas dan jelas
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.2,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(new TextEncoder().encode(content));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Sistem tidak dapat memproses permintaan ini. Sila cuba semula.', detail: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
