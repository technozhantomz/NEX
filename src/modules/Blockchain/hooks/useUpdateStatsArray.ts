import { useCallback } from "react";

export function useUpdateStatsArray(): {
  updateStatsArray: (arr: number[], value: number) => number[];
} {
  const updateStatsArray = useCallback(
    (arr: number[], value: number): number[] => {
      if (arr.length >= 99) {
        arr.shift();
        arr.push(value);
        return arr;
      }
      arr.push(value);
      return arr;
    },
    []
  );
  return { updateStatsArray };
}
