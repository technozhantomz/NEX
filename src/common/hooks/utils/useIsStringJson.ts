export function isJson(string: string): boolean {
  try {
    JSON.parse(string);
    return true;
  } catch (_e) {
    return false;
  }
}
