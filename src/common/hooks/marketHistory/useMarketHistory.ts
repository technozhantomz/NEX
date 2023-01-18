import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { MarketPair, OrderHistory } from "../../types";

import { UseMarketHistoryResult } from "./useMarketHistory.types";

export function useMarketHistory(): UseMarketHistoryResult {
  const { historyApi } = usePeerplaysApiContext();
  const getFillOrderHistory = useCallback(
    async (selectedPair: MarketPair) => {
      try {
        const histories: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [selectedPair.base.id, selectedPair.quote.id, 100]
        );
        return histories;
      } catch (e) {
        console.log(e);
      }
    },
    [historyApi]
  );

  return { getFillOrderHistory };
}
