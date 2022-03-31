export function useCopyText(value: string): void {
  navigator.clipboard.writeText(value);
}
