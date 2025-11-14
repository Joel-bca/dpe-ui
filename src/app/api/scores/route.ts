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

    const scores = result.Items?.filter((item) => item.PositionID?.S !== "METADATA").map((item) => {
      const position = parseInt(item.Position?.N || "0");
      const positionPoints = position === 1 ? 5 : position === 2 ? 3 : position === 3 ? 1 : 0;
      const manualPoints = parseInt(item.Points?.N || "0");
      const totalPoints = positionPoints + manualPoints;
      return {
        id: item.EventID?.S + "#" + item.PositionID?.S,
        eventId: item.EventName?.S || "",
        points: totalPoints,
        manualPoints: item.Points?.S || "",
        playerOrTeamName: item.StudentName?.S || "",
        schoolName: item.SchoolName?.S || "",
        chestNo: item.ChestNo?.S || "",
        position: position,
      };
    }) || [];

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json({ error: "Failed to load Scores" }, { status: 500 });
  }
}
