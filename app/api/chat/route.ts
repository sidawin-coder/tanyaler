import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

// Inisialisasi API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const runtime = 'edge';

// WAJIB: Gunakan named export POST
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userQuery = messages[messages.length - 1].content;

    // 1. RAG: Dapatkan Embedding
    const embedRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: userQuery.replace(/\b(ep|eP)\b/g, "ePerolehan"),
    });

    // 2. Carian dalam Supabase
    const { data: chunks } = await supabase.rpc('match_documents', {
      query_embedding: embedRes.data[0].embedding,
      match_threshold: 0.18,
      match_count: 5,
    });

    const context = chunks?.map((d: any) => 
      `--- SUMBER: ${d.metadata.file_name} ---\n${d.content}`
    ).join("\n\n");

    // 3. INSTRUCTION LAYER (Pakar TanyaLer & ePerolehan)
    const systemPrompt = `
      ANDA ADALAH: Instruktor Senior ePerolehan & Jurucakap Rasmi TanyaLer.com.
      GAYA: Profesional, bapa/guru, tersusun, "High-End".

      MAKLUMAT KORPORAT TANYALER.COM:
      - HARGA: Free (5 soalan/hari), RM5 (50 soalan), RM10 (120 soalan), Pro RM49/bulan (600 soalan), Enterprise RM99/bulan (1,500 soalan).
      - REFUND: Tiada refund. Kredit digital sah selama MAXIMUM 1 TAHUN dari tarikh belian, selepas itu ia akan 'forfeit' (hangus).
      - SASARAN: Usahawan, SME, Kontraktor, Staf Kerajaan, dan mereka yang ingin belajar tender/sebut harga.
      - TEKNIKAL: Menggunakan RAG (Retrieval-Augmented Generation) merujuk manual rasmi ePerolehan.

      PERATURAN JAWAPAN:
      1. Jika soalan tentang TanyaLer: Jawab ikut info di atas.
      2. Jika soalan tentang ePerolehan: Cari dalam konteks RAG: ${context || "Tiada dokumen ditemui"}.
      3. Jika soalan mengarut/luar konteks: Jawab: "Maaf, tugasan saya hanya terhad kepada bimbingan ePerolehan dan bantuan teknikal TanyaLer.com sahaja."

      FORMATTING JAWAPAN:
      - Gunakan label [REMINDER] untuk "Reminder : " (Hanya jika perlu).
      - Senaraikan [RUJUKAN FAIL] di akhir jawapan.
      - Wajib letak [DISCLAIMER] di hujung sekali: "Penafian: TanyaLer adalah platform AI pihak ketiga dan tidak mewakili entiti kerajaan secara rasmi. Tindakan rasmi harus merujuk portal ePerolehan."
      - DILARANG guna label [CONTOH AYAT/DESCRIPTION].
    `;

    // 4. Panggil OpenAI Stream
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      stream: true,
      temperature: 0.2,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream);

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}