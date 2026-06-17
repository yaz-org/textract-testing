import "@tanstack/react-start/server-only";

import {
	AnalyzeDocumentCommand,
	type Block,
	TextractClient,
} from "@aws-sdk/client-textract";
import { Resource } from "sst";

const textract = new TextractClient({});

export type LayoutItem = {
	blockType: string;
	text: string;
	confidence: number;
};

export type FormItem = {
	key: string;
	value: string;
	confidence: number;
};

export type TextractResult = {
	layout: LayoutItem[];
	forms: FormItem[];
};

export async function analyzeDocument(s3Key: string): Promise<TextractResult> {
	const command = new AnalyzeDocumentCommand({
		Document: {
			S3Object: {
				Bucket: Resource.Documents.name,
				Name: s3Key,
			},
		},
		FeatureTypes: ["LAYOUT", "FORMS"],
	});

	const response = await textract.send(command);
	const blocks = response.Blocks ?? [];

	const blockMap = new Map<string, Block>();
	for (const block of blocks) {
		if (block.Id) blockMap.set(block.Id, block);
	}

	const layout: LayoutItem[] = [];
	for (const block of blocks) {
		const bt = block.BlockType;
		if (!bt) continue;
		if ((bt.startsWith("LAYOUT_") || bt === "LINE") && block.Text) {
			layout.push({
				blockType: bt,
				text: block.Text,
				confidence: block.Confidence ?? 0,
			});
		}
	}

	const forms: FormItem[] = [];
	const keyBlocks = blocks.filter(
		(b) => b.BlockType === "KEY_VALUE_SET" && b.EntityTypes?.includes("KEY"),
	);

	for (const keyBlock of keyBlocks) {
		const keyRelationships = keyBlock.Relationships ?? [];

		const keyChildIds = keyRelationships
			.filter((r) => r.Type === "CHILD")
			.flatMap((r) => r.Ids ?? []);
		const keyText = keyChildIds
			.map((id) => blockMap.get(id)?.Text)
			.filter(Boolean)
			.join(" ");

		const valueRelationship = keyRelationships.find((r) => r.Type === "VALUE");
		const valueBlockIds = valueRelationship?.Ids ?? [];

		const valueText = valueBlockIds
			.map((vid) => {
				const valueBlock = blockMap.get(vid);
				if (!valueBlock) return "";
				const valueChildIds =
					valueBlock.Relationships?.filter((r) => r.Type === "CHILD").flatMap(
						(r) => r.Ids ?? [],
					) ?? [];
				return valueChildIds
					.map((cid) => blockMap.get(cid)?.Text)
					.filter(Boolean)
					.join(" ");
			})
			.filter(Boolean)
			.join(" ");

		if (keyText) {
			forms.push({
				key: keyText,
				value: valueText || "",
				confidence: keyBlock.Confidence ?? 0,
			});
		}
	}

	return { layout, forms };
}
