import { createContext, type ReactNode, useContext } from "react";
import type { DocumentRow } from "./columns";

export interface DocumentsContextValue {
	rows: DocumentRow[];
	pendingIds: Set<string>;
	error: string | null;
	processing: boolean;
	exportingZip: boolean;
	handleDelete: (document: DocumentRow) => void;
	handleDeleteSelected: (
		items: { documentId: string; s3Key: string }[],
	) => void;
	handleProcessSelected: (
		items: { documentId: string; s3Key: string }[],
	) => Promise<void>;
	handleClearResults: (items: { documentId: string }[]) => void;
	handleExportZip: () => void;
	handlePreviewSelected: (document: DocumentRow) => void;
	prefetchDocument: (documentId: string) => void;
}

const DocumentsContext = createContext<DocumentsContextValue | null>(null);

export function DocumentsProvider({
	value,
	children,
}: {
	value: DocumentsContextValue;
	children: ReactNode;
}) {
	return (
		<DocumentsContext.Provider value={value}>
			{children}
		</DocumentsContext.Provider>
	);
}

export function useDocumentsContext() {
	const ctx = useContext(DocumentsContext);
	if (!ctx) {
		throw new Error(
			"useDocumentsContext must be used within a DocumentsProvider",
		);
	}
	return ctx;
}
