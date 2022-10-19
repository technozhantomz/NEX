export function roundNum(num: string | number, roundTo = 5): string {
  const numbered = Number(num);
  return numbered.toFixed(roundTo);
}
