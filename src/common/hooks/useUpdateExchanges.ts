import { useCallback } from "react";

import { useSettingsContext } from "../providers";
import { Exchanges } from "../types";

type UseUpdateExchangesResult = {
  updateExchanges: (selectedPair: string) => void;
  exchanges: Exchanges;
};

export function useUpdateExchanges(): UseUpdateExchangesResult {
  const { exchanges, setExchanges } = useSettingsContext();
  const updateExchanges = useCallback(
    (selectedPair: string) => {
      const recentPairs = [...exchanges.list];
      const _selectedPair = selectedPair.split("_").join("/");

      if (recentPairs.includes(_selectedPair)) {
        const recentPairsWithoutSelectedPair = recentPairs.filter(
          (pair) => pair !== _selectedPair
        );
        const newRecentPairs = [
          _selectedPair,
          ...recentPairsWithoutSelectedPair,
        ];
        setExchanges({
          active: selectedPair,
          list: [...newRecentPairs],
        } as Exchanges);
      } else {
        recentPairs.unshift(selectedPair.split("_").join("/"));
        setExchanges({
          active: selectedPair,
          list: [...recentPairs],
        } as Exchanges);
      }
    },
    [exchanges, setExchanges]
  );
  return { exchanges, updateExchanges };
}
