export function escapeSingleQuote(s: string): string {
  return s.replace(/'/g, "\\'");
}
