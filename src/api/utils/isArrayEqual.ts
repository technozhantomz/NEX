import { isEmpty, isEqual, size, xorWith } from "lodash";

export const isArrayEqual = (
  x: string | Array<unknown> | null | undefined,
  y: string | Array<unknown> | null | undefined
): boolean => {
  const isSameSize = size(x) === size(y);
  console.log(xorWith([x, y], isEqual), "this is xorwith");
  return isSameSize && isEmpty(xorWith(x, y, isEqual));
};
