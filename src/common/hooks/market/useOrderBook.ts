import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { BookedOrder, MarketPair } from "../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

export function useOrderBook(): UseOrderBookResult {
  const { dbApi } = usePeerplaysApiContext();

  const getOrderBook = useCallback(
    async (selectedPair: MarketPair) => {
      try {
        const { asks, bids }: { asks: BookedOrder[]; bids: BookedOrder[] } =
          await dbApi("get_order_book", [
            selectedPair.base.symbol,
            selectedPair.quote.symbol,
            50,
          ]);
        return {
          asks,
          bids,
        };
      } catch (e) {
        console.log(e);
        return {
          asks: [] as BookedOrder[],
          bids: [] as BookedOrder[],
        };
      }
    },
    [dbApi]
  );

  return {
    getOrderBook,
  };
}
