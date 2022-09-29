import { useCallback } from "react";

export function useArrayLimiter(): {
  updateArrayWithLimit: <Type>(
    arr: Type[],
    value: Type,
    limit: number
  ) => Type[];
} {
  const updateArrayWithLimit = useCallback(
    <Type>(arr: Type[], value: Type, limit: number): Type[] => {
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
  return { updateArrayWithLimit };
}
