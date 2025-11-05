import { NextResponse } from "next/server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface UpdateGenderRequest {
  clearId: string;
  gender: string;
}

export async function POST(req: Request) {
  try {
    const body: UpdateGenderRequest = await req.json();
    const { clearId, gender } = body;

    if (!clearId || !gender) {
      return NextResponse.json(
        { message: "Missing Clear ID or gender" },
        { status: 400 }
      );
    }

    // 1️⃣ Check if the Clear ID exists
    const getCmd = new GetItemCommand({
      TableName: "test-backup",
      Key: {
        clearId: { S: clearId },
      },
    });

    const existingItem = await client.send(getCmd);
    console.log("Fetched item from DynamoDB:", JSON.stringify(existingItem, null, 2));

    if (!existingItem.Item) {
      return NextResponse.json(
        { message: "Clear ID not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Update the gender field
const updateCmd = new UpdateItemCommand({
  TableName: process.env.DYNAMODB_TABLE_NAME,
  Key: { clearId: { S: clearId } },
  UpdateExpression: "SET gender = :g",
  ConditionExpression: "attribute_not_exists(gender)",
  ExpressionAttributeValues: {
    ":g": { S: gender },
  },
});

    await client.send(updateCmd);

    return NextResponse.json(
      { message: "Gender updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating gender:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
