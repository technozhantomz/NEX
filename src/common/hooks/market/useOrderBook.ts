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

  const reduceBookedOrdersByPrice = useCallback((orders: BookedOrder[]) => {
    const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
      const repeatedPriceIndex = previousOrders.findIndex(
        (previousOrder) =>
          Number(previousOrder.price) === Number(currentOrder.price)
      );
      if (repeatedPriceIndex === -1) {
        previousOrders.push({
          quote: String(Number(currentOrder.quote)),
          base: String(Number(currentOrder.base)),
          price: String(Number(currentOrder.price)),
        } as BookedOrder);
      } else {
        const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
        previousOrders[repeatedPriceIndex] = {
          quote: String(
            Number(orderWithRepeatedPrice.quote) + Number(currentOrder.quote)
          ),
          base: String(
            Number(orderWithRepeatedPrice.base) + Number(currentOrder.base)
          ),
          price: String(Number(orderWithRepeatedPrice.price)),
        };
      }
      return previousOrders;
    }, [] as BookedOrder[]);
    return reducedOrders;
  }, []);

  return {
    getOrderBook,
    reduceBookedOrdersByPrice,
  };
}
