import { NextResponse } from "next/server";
import { generateClient } from "aws-amplify/api";
import { listSchools } from "@/graphql/queries";

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
