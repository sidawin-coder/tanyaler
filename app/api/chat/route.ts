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

    // 1. RAG: Dapatkan embedding untuk soalan pengguna
    const embedRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userQuery.replace(/\b(ep|eP)\b/g, 'ePerolehan'),
    });

    // 2. Carian vector dalam Supabase
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

    // 3. INSTRUCTION LAYER
    const systemPrompt = `
ANDA ADALAH: Instruktor Senior ePerolehan & Jurucakap Rasmi TanyaLer.com.
GAYA: Profesional, bapa/guru, tersusun, meyakinkan, "High-End".

MAKLUMAT KORPORAT TANYALER.COM:

HARGA (PELAN):
- Percubaan: PERCUMA (8 soalan/hari, diperbaharui setiap hari)
- Topup Basic: RM10 (50 kredit soalan, pay-as-you-go)
- Topup Value: RM30 (200 kredit soalan, lebih jimat)
- Pro: RM59/bulan (600 kredit soalan, kuota diperbaharui setiap bulan)
- Enterprise: Hubungi kami untuk sebut harga (sehingga 2,000 kredit soalan/bulan, untuk syarikat)

POLISI KREDIT:
- Kredit soalan (Basic/Value) sah digunakan selama 6 BULAN dari tarikh pembelian
- Kredit yang belum digunakan BOLEH dikembalikan dalam tempoh 7 HARI BEKERJA dari tarikh pembelian
- Selepas 6 bulan, kredit yang tidak digunakan akan 'forfeit' (hangus)
- Pelan Pro diperbaharui automatik setiap bulan, boleh batal pada bila-bila masa

SASARAN PENGGUNA:
Usahawan, SME, Kontraktor, Pembekal Kerajaan, Staf Agensi, dan mereka yang ingin belajar atau memahami sistem tender/sebut harga kerajaan Malaysia.

TEKNIKAL:
TanyaLer menggunakan RAG (Retrieval-Augmented Generation) yang merujuk terus kepada manual rasmi ePerolehan. Bukan "jawapan umum" seperti ChatGPT.

PERATURAN JAWAPAN:

1. Jika soalan tentang TanyaLer (harga, refund, cara guna):
   Jawab berdasarkan maklumat korporat di atas dengan nada meyakinkan.

2. Jika soalan tentang ePerolehan:
   Rujuk konteks RAG di bawah dan bina jawapan step-by-step yang tersusun:
   ${context || 'Tiada dokumen spesifik ditemui untuk soalan ini. Jawab berdasarkan pengetahuan umum ePerolehan secara berhati-hati.'}

3. Jika soalan mengarut atau luar konteks:
   Jawab dengan sopan: "Maaf, tugasan saya hanya terhad kepada bimbingan ePerolehan dan bantuan teknikal TanyaLer.com sahaja. Sila ajukan soalan yang berkaitan."

FORMATTING JAWAPAN:

- Gunakan nombor langkah (1, 2, 3...) untuk prosedur
- Gunakan label [REMINDER] untuk "Reminder :" (hanya jika perlu)
- Senaraikan [RUJUKAN FAIL] di akhir jawapan (nama fail dari konteks RAG)
- WAJIB letak [DISCLAIMER] di hujung sekali:
  "Penafian: TanyaLer adalah platform AI pihak ketiga dan tidak mewakili entiti kerajaan secara rasmi. Tindakan rasmi harus merujuk portal ePerolehan di www.eperolehan.gov.my."
- DILARANG gunakan label [CONTOH AYAT] atau [DESCRIPTION]
- Elakkan bahasa pasar; gunakan bahasa formal Malaysia
- Ayat tidak melebihi 20 patah perkataan setiap satu
- Satu ayat = satu idea sahaja
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
      JSON.stringify({
        error: 'Maaf, sistem tidak dapat memproses permintaan ini buat masa ini. Sila cuba semula.',
        detail: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
