export function toPrecision(num: number, toPrecision = 5): number {
  num = Number(num);
  return Number(num.toPrecision(toPrecision));
}
