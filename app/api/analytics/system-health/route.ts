import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const dateRange = request.nextUrl.searchParams.get('date_range') || '30';

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/analytics/system-health?date_range=${dateRange}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
