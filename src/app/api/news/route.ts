import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: "AKIA5VJGYPZAOKG7TIS5",
    secretAccessKey: "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",
  },
});

export async function GET() {
  try {
    const scanCmd = new ScanCommand({
      TableName: "newssection-ao7ebzdnjvahrhfgmey6i6vzfu-NONE",
    });

    const result = await client.send(scanCmd);
    const items = result.Items || [];

    // Transform DynamoDB items to a more usable format
    const newsItems = items.map((item) => ({
      id: item.id?.S || "",
      title: item.title?.S || "",
      description: item.description?.S || "",
      createdAt: item.createdAt?.S || "",
    }));

    return NextResponse.json({ newsItems }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
