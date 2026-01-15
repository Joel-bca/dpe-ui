import { NextRequest, NextResponse } from "next/server";
import { saveChavaraCupRegistration } from "@/lib/Dynamodb";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Validate required fields
    if (!payload.TeamID || !payload.CaptainPhone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to DynamoDB
    const result = await saveChavaraCupRegistration(payload);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to process registration" },
      { status: 500 }
    );
  }
}