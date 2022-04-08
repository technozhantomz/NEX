import { useCallback } from "react";

export function useArrayLimiter(): {
  updateArrayWithLmit: (
    arr: unknown[],
    value: unknown,
    limit: number
  ) => unknown[];
} {
  const updateArrayWithLmit = useCallback(
    (arr: unknown[], value: unknown, limit: number): unknown[] => {
      if (arr.length >= limit) {
        arr.shift();
        arr.push(value);
        return arr;
      }
      arr.push(value);
      return arr;
    },
    []
  );
  return { updateArrayWithLmit };
}
