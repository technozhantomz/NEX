import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { Asset, OrderHistory, Ticker } from "../../types";

import { UseMarketHistoryResult } from "./useMarketHistory.types";

export function useMarketHistory(): UseMarketHistoryResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();

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
      }
    },
    [historyApi]
  );

  const getTicker = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        const ticker: Ticker = await dbApi("get_ticker", [
          base.symbol,
          quote.symbol,
        ]);
        return ticker;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  return { getFillOrderHistory, getTicker };
}
