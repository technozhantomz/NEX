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

      if (!recentPairs.includes(selectedPair.split("_").join("/"))) {
        recentPairs.push(selectedPair.split("_").join("/"));
      }

      setExchanges({
        active: selectedPair,
        list: [...recentPairs],
      } as Exchanges);
    },
    [exchanges, setExchanges]
  );
  return { exchanges, updateExchanges };
}
