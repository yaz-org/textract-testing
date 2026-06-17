export const documentsBucket = new sst.aws.Bucket("Documents");

export const documentsTable = new sst.aws.Dynamo("DocumentsTable", {
  fields: {
    documentId: "string",
    contentHash: "string",
  },
  primaryIndex: {
    hashKey: "documentId",
  },
  globalIndexes: {
    HashIndex: { hashKey: "contentHash" },
  },
});

export const hashLockTable = new sst.aws.Dynamo("HashLockTable", {
  fields: {
    contentHash: "string",
  },
  primaryIndex: {
    hashKey: "contentHash",
  },
  ttl: "ttl",
});
