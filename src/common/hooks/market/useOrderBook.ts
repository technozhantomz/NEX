import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { Asset, BookedOrder } from "../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

export function useOrderBook(): UseOrderBookResult {
  const { dbApi } = usePeerplaysApiContext();

  const getOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        const { asks, bids }: { asks: BookedOrder[]; bids: BookedOrder[] } =
          await dbApi("get_order_book", [base.symbol, quote.symbol, 50]);
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
