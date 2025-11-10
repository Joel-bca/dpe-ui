import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: "School-table",
    });

    const result = await client.send(command);

    const schools = result.Items?.map((item) => ({
      schoolShort: item.SchoolID?.S?.replace("SCHOOL#", "") || "",
      fullName: item.SchoolName?.S || "",
      color: "#3B82F6", // Default color since not in DB
      totalPoints: parseInt(item.TotalPoints?.N || "0"),
    })) || [];

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Failed to load Schools" }, { status: 500 });
  }
}
