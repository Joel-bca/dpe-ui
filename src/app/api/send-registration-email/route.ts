import { NextRequest, NextResponse } from "next/server";

const LAMBDA_API_URL = process.env.NEXT_PUBLIC_API_URL // ✅ your invoke URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ forward this to your AWS Lambda API
    const response = await fetch(`${LAMBDA_API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error proxying to Lambda:", error);
    return NextResponse.json(
      { error: "Failed to reach AWS Lambda or send email" },
      { status: 500 }
    );
  }
}
