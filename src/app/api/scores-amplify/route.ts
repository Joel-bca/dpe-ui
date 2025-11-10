import { NextResponse } from "next/server";
import { generateClient } from "aws-amplify/api";
import { listScores } from "@/graphql/queries";
import { Amplify } from 'aws-amplify';
import amplifyOutputs from "../../../../amplify_outputs.json";

amplifyOutputs.data.default_authorization_type = "AWS_IAM";

// Configure Amplify
Amplify.configure(amplifyOutputs);

const client = generateClient();

export async function GET() {
  try {
    const result = await client.graphql({
      query: listScores
    });

    return NextResponse.json(result.data.listScores.items);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json({ error: "Failed to load Scores" }, { status: 500 });
  }
}
