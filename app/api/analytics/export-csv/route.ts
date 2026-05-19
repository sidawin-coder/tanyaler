import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const dateRange = request.nextUrl.searchParams.get('date_range') || '30';

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/analytics/export-csv?date_range=${dateRange}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: response.status });
    }

    const csvContent = await response.text();
    
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=tanyaler-analytics-${dateRange}d.csv`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
