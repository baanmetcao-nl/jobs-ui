export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, 200)
    .replace(/[<>"'&]/g, (ch) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return entities[ch] ?? ch;
    });
}
