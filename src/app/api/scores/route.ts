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
      TableName: "Score-table",
    });

    const result = await client.send(command);

    const scores = result.Items?.filter((item) => item.PositionID?.S !== "METADATA").map((item) => ({
      id: item.EventID?.S + "#" + item.PositionID?.S,
      eventId: item.EventName?.S || "",
      points: parseInt(item.Position?.N || "0") === 1 ? 5 : parseInt(item.Position?.N || "0") === 2 ? 3 : parseInt(item.Position?.N || "0") === 3 ? 1 : 0,
      playerOrTeamName: item.StudentName?.S || "",
      schoolName: item.SchoolName?.S || "",
      chestNo: item.ChestNo?.S || "",
      position: parseInt(item.Position?.N || "0"),
    })) || [];

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json({ error: "Failed to load Scores" }, { status: 500 });
  }
}
