import { useCallback } from "react";

import { useSettingsContext } from "../../providers";
import { Exchanges } from "../../types";

type UseUpdateExchangesResult = {
  updateExchanges: (selectedPair: string) => void;
  exchanges: Exchanges;
  updateSwapPair: (selectedPair: string) => void;
};

export function useUpdateExchanges(): UseUpdateExchangesResult {
  const { exchanges, setExchanges } = useSettingsContext();

  //selectedPair in asset1_asset2 format
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
          ...exchanges,
          active: selectedPair,
          list: [...newRecentPairs],
        } as Exchanges);
      } else {
        recentPairs.unshift(selectedPair.split("_").join("/"));
        setExchanges({
          ...exchanges,
          active: selectedPair,
          list: [...recentPairs],
        } as Exchanges);
      }
    },
    [exchanges, setExchanges]
  );

  //selectedPair in asset1_asset2 format
  const updateSwapPair = useCallback(
    (selectedPair: string) => {
      setExchanges({ ...exchanges, swapPair: selectedPair });
    },
    [exchanges, setExchanges]
  );
  return { exchanges, updateExchanges, updateSwapPair };
}
