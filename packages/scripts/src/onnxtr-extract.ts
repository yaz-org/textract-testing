import { Resource } from "sst";
import {
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import {
  LambdaClient,
  InvokeCommand,
} from "@aws-sdk/client-lambda";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const s3 = new S3Client({});
const lambda = new LambdaClient({});

const BUCKET = Resource.Documents.name;
const FN_NAME = Resource.OnnxTRFunction.name;
const OUTPUT_DIR = resolve("documents-export/onnxtr-extract");

async function listAllKeys(): Promise<string[]> {
  const keys: string[] = [];
  let continuationToken: string | undefined;
  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        ContinuationToken: continuationToken,
      }),
    );
    for (const obj of response.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key);
    }
    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);
  return keys;
}

async function invokeOnnxTR(
  s3Key: string,
): Promise<{ ok: true; key: string; payload: unknown } | { ok: false; key: string; error: string }> {
  try {
    const command = new InvokeCommand({
      FunctionName: FN_NAME,
      Payload: JSON.stringify({ s3Key }),
    });
    const response = await lambda.send(command);
    const payload = JSON.parse(new TextDecoder().decode(response.Payload));
    if (response.FunctionError) {
      return { ok: false, key: s3Key, error: JSON.stringify(payload) };
    }
    return { ok: true, key: s3Key, payload };
  } catch (e) {
    return { ok: false, key: s3Key, error: String(e) };
  }
}

function sanitizeKey(key: string): string {
  return key.replace(/\//g, "--").replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function main() {
  console.log(`Bucket: ${BUCKET}`);
  console.log(`Function: ${FN_NAME}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log();

  console.log("Listing objects...");
  const keys = await listAllKeys();
  console.log(`Found ${keys.length} object(s).`);
  console.log();

  if (keys.length === 0) {
    console.log("Nothing to process.");
    return;
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  let success = 0;
  let failed = 0;
  const errors: { key: string; error: string }[] = [];
  const concurrency = 3;

  for (let i = 0; i < keys.length; i += concurrency) {
    const batch = keys.slice(i, i + concurrency);
    const outcomes = await Promise.all(batch.map((k) => invokeOnnxTR(k)));

    for (const outcome of outcomes) {
      if (outcome.ok) {
        const filename = `${sanitizeKey(outcome.key)}.json`;
        await writeFile(
          resolve(OUTPUT_DIR, filename),
          JSON.stringify(outcome.payload, null, 2),
        );
        success++;
        console.log(`OK   ${outcome.key}  ->  ${filename}`);
      } else {
        errors.push({ key: outcome.key, error: outcome.error });
        failed++;
        console.error(`FAIL ${outcome.key}  —  ${outcome.error}`);
      }
    }

    const done = i + batch.length;
    console.log(`[${done}/${keys.length}]  ${success} OK, ${failed} failed`);
  }

  if (errors.length > 0) {
    await writeFile(
      resolve(OUTPUT_DIR, "_errors.json"),
      JSON.stringify(errors, null, 2),
    );
  }

  console.log();
  console.log(`Done. ${success} succeeded, ${failed} failed.`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
