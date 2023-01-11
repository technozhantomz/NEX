import { useCallback } from "react";

type UseBalancesResult = {
  calculateBalances: () => string;
};

export function useBalances(): UseBalancesResult {
  const calculateBalances = useCallback(() => {
    return "BTC";
  }, []);
  return {
    calculateBalances,
  };
}
