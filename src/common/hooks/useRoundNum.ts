export function roundNum(num: number, roundTo = 5): number {
  num = Number(num);
  return Number(num.toFixed(roundTo));
}
