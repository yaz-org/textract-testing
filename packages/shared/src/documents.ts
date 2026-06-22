import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import type { InferenceRecord } from "./payment";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
});

export async function saveInference(
  documentId: string,
  record: InferenceRecord,
) {
  await dynamo.send(
    new UpdateCommand({
      TableName: Resource.DocumentsTable.name,
      Key: { documentId },
      UpdateExpression:
        "SET inferenceHistory = list_append(if_not_exists(inferenceHistory, :empty), :record), paymentResult = :payment",
      ConditionExpression: "attribute_exists(documentId)",
      ExpressionAttributeValues: {
        ":empty": [],
        ":record": [record],
        ":payment": record.payment ?? null,
      },
    }),
  );
}
