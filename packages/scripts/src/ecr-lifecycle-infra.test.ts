import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "../../..");
const productionConfig = readFileSync(resolve(root, "sst.config.ts"), "utf8");
const scraperSource = readFileSync(
  resolve(root, "infra/ip-scraper.ts"),
  "utf8",
);

describe("ECR lifecycle infrastructure", () => {
  test("keeps every deployed SST image tagged by stage and function", () => {
    expect(productionConfig).toContain('return "doctr"');
    expect(productionConfig).toContain('return "onnxtr"');
    expect(productionConfig).toContain('return "onnxtr-subscriber"');
    expect(productionConfig).toContain("args.tags = $output(args.tags).apply");
    expect(productionConfig).toContain("`:${$app.stage}-${imageTag}-current`");
    expect(productionConfig).toContain("resolvedTags.includes(current)");
  });

  test("assigns the shared SST policy to production only", () => {
    expect(productionConfig).toContain('if ($app.stage === "production")');
    expect(productionConfig).toContain(
      'new aws.ecr.LifecyclePolicy("SstAssetLifecycle"',
    );
    expect(productionConfig).toContain('repository: "sst-asset"');
    expect(productionConfig).toContain('tagPatternList: ["*-cache"]');
    expect(productionConfig).toContain(
      'tagPatternList: ["onnxtr-promotion-*"]',
    );
    expect(productionConfig).toContain(
      'description: "Expire untagged SST assets after 14 days"',
    );
  });

  test("uses a real lifecycle resource for the scraper repository", () => {
    const repositoryEnd = scraperSource.indexOf(
      'new aws.ecr.LifecyclePolicy("IpScraperLifecycle"',
    );
    expect(repositoryEnd).toBeGreaterThan(0);
    expect(scraperSource.slice(0, repositoryEnd)).not.toContain(
      "lifecyclePolicy:",
    );
    expect(scraperSource).toContain(
      'imageTagMutability: "IMMUTABLE_WITH_EXCLUSION"',
    );
    expect(scraperSource).toContain(
      '{ filter: "latest", filterType: "WILDCARD" }',
    );
    expect(scraperSource).toContain("repository: repo.name");
    expect(scraperSource).toContain('tagStatus: "untagged"');
    expect(scraperSource).toContain('countType: "imageCountMoreThan"');
    expect(scraperSource).toContain("countNumber: 5");
  });
});
