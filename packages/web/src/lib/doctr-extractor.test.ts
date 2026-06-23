import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { extractDocTRPayment } from "./doctr-extractor";
import type { TextractResult } from "./textract";

const EXPORTS_DIR = join(
	import.meta.dirname,
	"..",
	"..",
	"..",
	"..",
	"documents-export",
);

function loadLines(filename: string): string[] {
	const result = JSON.parse(
		readFileSync(join(EXPORTS_DIR, filename), "utf-8"),
	) as TextractResult;
	return result.layout
		.filter((l) => l.blockType === "LINE" && l.text.trim().length > 0)
		.map((l) => l.text.trim());
}

function assertValid(payment: ReturnType<typeof extractDocTRPayment>) {
	expect(payment.status).toBe("VALID");
	expect(payment.totalScore).toBeGreaterThanOrEqual(4);
	expect(payment.referenceNumber).toBeTruthy();
	expect(payment.amount).toBeTruthy();
	expect(payment.amountValue).toBeGreaterThan(0);
}

function assertInvalid(payment: ReturnType<typeof extractDocTRPayment>) {
	expect(payment.status).toBe("INVALID");
	expect(payment.totalScore).toBeLessThan(4);
}

describe("docTR pago móvil extraction (line-based)", () => {
	describe("Format A — Banesco Standard", () => {
		test("extracts all fields from standard Banesco receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1771081433-3ADCA7E07236B127ED62.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("060451758194");
			expect(payment.amountValue).toBe(3171.2);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.originBank).toBe("0134");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("pago");
		});

		test("extracts from Banesco with success header (1772896204)", () => {
			const payment = extractDocTRPayment(
				loadLines("1772896204-3A9FFC5D00BEE59F4957.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBeTruthy();
			expect(payment.amountValue).toBeGreaterThan(0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
		});
	});

	describe("Format B — BNC Confirmation (compound beneficiary)", () => {
		test("extracts from BNC confirmation with compound beneficiary", () => {
			const payment = extractDocTRPayment(
				loadLines("1771686476-3A0E1C909CFEB627252D.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("684934112");
			expect(payment.amountValue).toBe(2704.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.originBank).toBe("0191");
			expect(payment.destinationBank).toBe("0105");
		});
	});

	describe("Format C — Tpago (Mercantil)", () => {
		test("extracts from Tpago receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1772291086-3AFE1B2C40B633FA57C7.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("48319897948");
			expect(payment.amountValue).toBe(2505.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.originBank).toBe("0105");
		});

		test("extracts from another Tpago", () => {
			const payment = extractDocTRPayment(
				loadLines("1772896704-3AED660C449C511BE230.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("48311204771");
			expect(payment.amountValue).toBe(2874.84);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.originBank).toBe("0105");
		});

		test("extracts from Tpago with different beneficiary phone (1773501024)", () => {
			const payment = extractDocTRPayment(
				loadLines("1773501024-AC3C9481F6BAC712AC059CAD6EBCFAD1.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("48312494493");
			expect(payment.amountValue).toBe(2824.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.originBank).toBe("0105");
		});

		test("extracts from Tpago with dotted cedula (1780153097)", () => {
			const payment = extractDocTRPayment(
				loadLines("1780153097-4ACD7200AF70D3F82BA9.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("48317419251");
			expect(payment.amountValue).toBe(7000.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.originBank).toBe("0105");
		});

		test("extracts from Tpago with concept (1770480109)", () => {
			const payment = extractDocTRPayment(
				loadLines("1770480109-ACFAC7AB6CCF0C77FF66CD2E08E563D7.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("48316190554");
			expect(payment.amountValue).toBe(3061.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.originBank).toBe("0105");
			expect(payment.concept).toBe("fulvo");
		});
	});

	describe("Format D — Banplus (compound beneficiary in forms)", () => {
		test("extracts from Banplus receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1773702785-4A759B5FCFB76CA5039B.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("170472142954");
			expect(payment.amountValue).toBe(3410.0);
			expect(payment.destinationPhone).toBe("0412-7965701");
			expect(payment.destinationCedula).toBe("V-31031988");
			expect(payment.destinationBank).toBe("0134");
		});

		test("extracts from Banplus with descripción", () => {
			const payment = extractDocTRPayment(
				loadLines("1773702130-3A508974091415DC42E0.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("151147636436");
			expect(payment.amountValue).toBe(3408.14);
			expect(payment.destinationPhone).toBe("0412-7965701");
			expect(payment.destinationCedula).toBe("V-31031988");
			expect(payment.destinationBank).toBe("0134");
			expect(payment.concept).toBe("Diegol");
		});
	});

	describe("Format E — Mercantil/PagoClave", () => {
		test("extracts from Mercantil receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1771081520-AC5394C21FCABC4377034954870CA9AE.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("000000454592");
			expect(payment.amountValue).toBe(3171.2);
			expect(payment.destinationPhone).toBe("0414-3297358");
		});
	});

	describe("Format F — Bancamiga Suite", () => {
		test("extracts from Bancamiga receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1772291094-ACCDD47C20E20D0B9A678FBE63E783DB.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("110441237391");
			expect(payment.amountValue).toBe(2505.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("fubol italo");
		});

		test("extracts from Bancamiga with short date", () => {
			const payment = extractDocTRPayment(
				loadLines("1773765231-3A75D26AD6E3ADCFBBDD.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("123321953221");
			expect(payment.amountValue).toBe(3409.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("nicolas");
		});
	});

	describe("Format G — BDV Pagomóvil", () => {
		test("extracts from BDV receipt", () => {
			const payment = extractDocTRPayment(
				loadLines("1773775595-ACAAB0C3B172F469957C33313C9F29F5.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("005411617229");
			expect(payment.amountValue).toBe(3500.0);
			expect(payment.destinationPhone).toBe("0412-7965701");
			expect(payment.destinationBank).toBe("0134");
			expect(payment.concept).toBe("pago");
			expect(payment.destinationCedula).toBe("31031988");
		});

		test("extracts from BDV with same beneficiary, larger amount", () => {
			const payment = extractDocTRPayment(
				loadLines("1775920136-3A4AD9688D2B9497EF9C.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("005656589442");
			expect(payment.amountValue).toBe(5194.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("82078228");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("pago");
		});

		test("does not steal destination phone when Origen value is missing", () => {
			const payment = extractDocTRPayment([
				"PagomóvilBDV Personas",
				"3.061,00 Bs",
				"Fecha:",
				"07/02/2026",
				"Operación:",
				"005020230820",
				"Identificación:",
				"82078228",
				"Origen:",
				"Destino:",
				"04143290785",
				"Banco:",
				"0105 - BANCO MERCANTIL",
			]);
			expect(payment.originPhone).toBeUndefined();
			expect(payment.destinationPhone).toBe("0414-3290785");
		});

		test("extracts origin phone from BDV with OCR noise in Origen value", () => {
			const payment = extractDocTRPayment([
				"PagomOvilBDV Personas",
				"3.061,00 Bs",
				"Fecha:",
				"07/02/2026",
				"Operacion:",
				"005020230820",
				"Identificacion:",
				"82078228",
				"Origen:",
				"0102****) 7210",
				"Destino:",
				"04143290785",
				"Banco:",
				"0105 - BANCO MERCANTIL",
			]);
			expect(payment.originPhone).toBeTruthy();
			expect(payment.destinationPhone).toBe("0414-3290785");
		});
	});

	describe("Format H — BFC (Banco Fondo Común)", () => {
		test("extracts from BFC receipt with Comprobante", () => {
			const payment = extractDocTRPayment(
				loadLines("1770476963-4A9BFA2B34ADA7182E8D.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("52166452");
			expect(payment.amountValue).toBe(3061.01);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.originBank).toBe("0151");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("pago");
		});

		test("extracts from BFC with Referencia label", () => {
			const payment = extractDocTRPayment(
				loadLines("1778945275-4A0FCBB7247EDF5B7A00.jpg.json"),
			);
			assertValid(payment);
			expect(payment.referenceNumber).toBe("95562595");
			expect(payment.amountValue).toBe(4439.0);
			expect(payment.destinationPhone).toBe("0414-3297358");
			expect(payment.destinationCedula).toBe("E-82078228");
			expect(payment.originBank).toBe("0151");
			expect(payment.destinationBank).toBe("0105");
			expect(payment.concept).toBe("Pago");
		});
	});

	describe("Invalid / non-payment images", () => {
		test("rejects meme/tweet screenshot", () => {
			const payment = extractDocTRPayment(
				loadLines("1770937875-3A78F233379E334235B9.jpg.json"),
			);
			assertInvalid(payment);
		});

		test("rejects empty result", () => {
			const payment = extractDocTRPayment(
				loadLines("1770768043-3B157A78D69FC4FC8567.jpg.json"),
			);
			assertInvalid(payment);
		});

		test("rejects WhatsApp chat", () => {
			const payment = extractDocTRPayment(
				loadLines("1773693368-3A8FC6552C775F9ECE6F.jpg.json"),
			);
			assertInvalid(payment);
		});

		test("rejects sports banner", () => {
			const payment = extractDocTRPayment(
				loadLines("1773802688-3AF7D7D870E7D154977B.jpg.json"),
			);
			assertInvalid(payment);
		});

		test("rejects news article", () => {
			const payment = extractDocTRPayment(
				loadLines("1772575013-3A2D79786707522F35CF.jpg.json"),
			);
			assertInvalid(payment);
		});

		test("rejects calculator screenshot", () => {
			const payment = extractDocTRPayment(
				loadLines("1773500366-3A563BC5F40F44A98BAA.jpg.json"),
			);
			assertInvalid(payment);
		});
	});

	describe("Masked / censored data", () => {
		// docTR (line-only) doesn't have access to forms where masked values live.
		// It extracts from visible layout text, so it finds the full phone number
		// instead of the masked version. This is expected behavior.
		test("extracts full origin phone from Banesco (no forms masking)", () => {
			const payment = extractDocTRPayment(
				loadLines("1771081433-3ADCA7E07236B127ED62.jpg.json"),
			);
			assertValid(payment);
			expect(payment.originPhone).toBe("04**-***4222");
		});

		test("extracts full origin phone from BDV (no forms masking)", () => {
			const payment = extractDocTRPayment(
				loadLines("1775920136-3A4AD9688D2B9497EF9C.jpg.json"),
			);
			assertValid(payment);
			expect(payment.originPhone).toBe("0102****7210");
		});

		test("preserves masked origin phone from Banplus (0414****749)", () => {
			const payment = extractDocTRPayment(
				loadLines("1773702130-3A508974091415DC42E0.jpg.json"),
			);
			assertValid(payment);
			expect(payment.originPhone).toBe("0414****749");
		});
	});
});
