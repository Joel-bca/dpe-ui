import { NextResponse } from "next/server";
import { generateClient } from "aws-amplify/api";
import { listSchools } from "@/graphql/queries";
import { Amplify } from 'aws-amplify';
import amplifyOutputs from "../../../../amplify_outputs.json";

amplifyOutputs.data.default_authorization_type = "AWS_IAM";

// Configure Amplify
Amplify.configure(amplifyOutputs);

const client = generateClient();

export async function GET() {
  try {
    const result = await client.graphql({
      query: listSchools
    });

    return NextResponse.json(result.data.listSchools.items);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Failed to load Schools" }, { status: 500 });
  }
}
