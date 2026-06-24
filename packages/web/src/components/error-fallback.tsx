import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";

interface ErrorFallbackProps {
	error: Error;
	reset?: () => void;
}

function ErrorFallback({ error, reset }: ErrorFallbackProps) {
	return (
		<div className="flex items-center justify-center p-8">
			<div className="flex flex-col items-center gap-4 text-center max-w-md">
				<AlertTriangle className="size-10 text-destructive" />
				<div>
					<h2 className="text-lg font-semibold">Something went wrong</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						{error.message || "An unexpected error occurred."}
					</p>
				</div>
				{reset && (
					<Button variant="outline" onClick={reset}>
						<RefreshCw className="size-4" />
						Try again
					</Button>
				)}
			</div>
		</div>
	);
}

export { ErrorFallback };
