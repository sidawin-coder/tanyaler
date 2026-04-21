import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: "Billplz API working",
      data: body
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}