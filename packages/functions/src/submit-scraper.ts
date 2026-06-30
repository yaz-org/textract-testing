import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { Resource } from "sst";
import { z } from "zod";

const sqs = new SQSClient({});

const submitSchema = z.object({
  profileName: z.string(),
  callbackUrl: z.string(),
});

interface FunctionUrlEvent {
  httpMethod?: string;
  body?: string;
  headers: Record<string, string>;
  requestContext: {
    domainName?: string;
    http: { method?: string; path?: string };
  };
}

export const handler = async (event: FunctionUrlEvent) => {
  const apiKey = event.headers["x-api-key"];
  if (!apiKey || apiKey !== Resource.StatementsScraperApiKey.value) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  let body: z.infer<typeof submitSchema>;
  try {
    body = submitSchema.parse(JSON.parse(event.body || "{}"));
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  await sqs.send(
    new SendMessageCommand({
      QueueUrl: Resource.StatementsScraperQueue.url,
      MessageBody: JSON.stringify({
        profileName: body.profileName,
        callbackUrl: body.callbackUrl,
      }),
      MessageGroupId: body.profileName,
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
    headers: { "Content-Type": "application/json" },
  };
};
