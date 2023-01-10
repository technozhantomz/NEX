import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { Asset, OrderHistory } from "../../types";

import { UseMarketHistoryResult } from "./useMarketHistory.types";

export function useMarketHistory(): UseMarketHistoryResult {
  const { historyApi } = usePeerplaysApiContext();
  const getFillOrderHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        const histories: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [base.id, quote.id, 100]
        );
        return histories;
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    },
    [historyApi]
  );

  return { getFillOrderHistory };
}
