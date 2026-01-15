import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// Initialize DynamoDB client with AWS credentials
const dynamoDBClient = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const TABLE_NAME = "ChavaraCupRegistrations";

export interface ChavaraCupRegistration {
  TeamID: string;
  TeamName: string;
  CollegeName: string;
  SportCategory: string;
  Category: "Men" | "Women" | "Mixed";
  CaptainName: string;
  CaptainPhone: string;
  CaptainEmail: string;
  CaptainDOB: string;
  CaptainID: string;
  Teammates: string; // JSON stringified array
  DedupKey: string; // SPORT#PHONE for unique constraint
  RegistrationDate: string;
}

/**
 * Save a Chavara Cup registration to DynamoDB
 */
export async function saveChavaraCupRegistration(
  registration: ChavaraCupRegistration
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    // Check for duplicate registration using DedupKey
    const existingReg = await checkDuplicateRegistration(registration.DedupKey);
    if (existingReg) {
      return {
        success: false,
        message: `A team is already registered with this phone number (${registration.CaptainPhone}) for ${registration.SportCategory}.`,
      };
    }

    // Put item into DynamoDB
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: marshall(registration, { removeUndefinedValues: true }),
    });

    const response = await dynamoDBClient.send(command);

    return {
      success: true,
      message: "Registration saved successfully",
      data: {
        teamId: registration.TeamID,
        teamName: registration.TeamName,
      },
    };
  } catch (error: any) {
    console.error("DynamoDB Save Error:", error);
    return {
      success: false,
      message: error.message || "Failed to save registration",
    };
  }
}

/**
 * Check if a registration with the same DedupKey exists
 */
export async function checkDuplicateRegistration(
  dedupKey: string
): Promise<boolean> {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "DedupKey-index", // Assumes you have a GSI on DedupKey
      KeyConditionExpression: "DedupKey = :dedupKey",
      ExpressionAttributeValues: marshall({ ":dedupKey": dedupKey }),
      ProjectionExpression: "TeamID",
    });

    const response = await dynamoDBClient.send(command);
    return (response.Items?.length || 0) > 0;
  } catch (error: any) {
    // If GSI doesn't exist, fall back to scan
    console.warn("GSI query failed, falling back to scan:", error.message);
    return await checkDuplicateViaScn(dedupKey);
  }
}

/**
 * Fallback: Check for duplicate using Scan (slower but doesn't require GSI)
 */
async function checkDuplicateViaScn(dedupKey: string): Promise<boolean> {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "DedupKey = :dedupKey",
      ExpressionAttributeValues: marshall({ ":dedupKey": dedupKey }),
      ProjectionExpression: "TeamID",
      Limit: 1, // Return early if found
    });

    const response = await dynamoDBClient.send(command);
    return (response.Items?.length || 0) > 0;
  } catch (error: any) {
    console.error("Scan fallback error:", error);
    throw error;
  }
}

/**
 * Get a registration by TeamID
 */
export async function getChavaraCupRegistration(
  teamId: string
): Promise<ChavaraCupRegistration | null> {
  try {
    const command = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ TeamID: teamId }),
    });

    const response = await dynamoDBClient.send(command);
    return response.Item ? (unmarshall(response.Item) as ChavaraCupRegistration) : null;
  } catch (error: any) {
    console.error("DynamoDB Get Error:", error);
    return null;
  }
}

/**
 * List all registrations (with optional filter)
 */
export async function listChavaraCupRegistrations(
  filterKey?: string,
  filterValue?: string
): Promise<ChavaraCupRegistration[]> {
  try {
    const params: any = {
      TableName: TABLE_NAME,
    };

    if (filterKey && filterValue) {
      params.FilterExpression = `${filterKey} = :value`;
      params.ExpressionAttributeValues = marshall({ ":value": filterValue });
    }

    const command = new ScanCommand(params);
    const response = await dynamoDBClient.send(command);

    return (response.Items || []).map((item) =>
      unmarshall(item) as ChavaraCupRegistration
    );
  } catch (error: any) {
    console.error("DynamoDB List Error:", error);
    return [];
  }
}
