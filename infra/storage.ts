export const documentsBucket = new sst.aws.Bucket("Documents");

export const documentsTable = new sst.aws.Dynamo("DocumentsTable", {
  fields: {
    documentId: "string",
  },
  primaryIndex: {
    hashKey: "documentId",
  },
});
