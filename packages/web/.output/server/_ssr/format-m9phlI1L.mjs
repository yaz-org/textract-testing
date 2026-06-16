//#region node_modules/.nitro/vite/services/ssr/assets/format-m9phlI1L.js
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	const units = [
		"KB",
		"MB",
		"GB"
	];
	let value = bytes / 1024;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}
	return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}
function formatDate(value) {
	return new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(value));
}
//#endregion
export { formatDate as n, formatBytes as t };
