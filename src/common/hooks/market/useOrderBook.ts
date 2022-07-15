import { useCallback } from "react";

import { roundNum } from "..";
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

  const reduceBookedOrdersByPrice = useCallback(
    (orders: BookedOrder[], base: Asset, quote: Asset) => {
      const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
        const repeatedPriceIndex = previousOrders.findIndex(
          (previousOrder) =>
            roundNum(Number(previousOrder.price), base.precision) ===
            roundNum(Number(currentOrder.price), base.precision)
        );
        if (repeatedPriceIndex === -1) {
          previousOrders.push({
            quote: String(
              roundNum(Number(currentOrder.quote), quote.precision)
            ),
            base: String(roundNum(Number(currentOrder.base), base.precision)),
            price: String(roundNum(Number(currentOrder.price), base.precision)),
          } as BookedOrder);
        } else {
          const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
          previousOrders[repeatedPriceIndex] = {
            quote: String(
              roundNum(Number(orderWithRepeatedPrice.quote), quote.precision) +
                roundNum(Number(currentOrder.quote), quote.precision)
            ),
            base: String(
              roundNum(Number(orderWithRepeatedPrice.base), base.precision) +
                roundNum(Number(currentOrder.base), base.precision)
            ),
            price: String(
              roundNum(Number(orderWithRepeatedPrice.price), base.precision)
            ),
          };
        }
        return previousOrders;
      }, [] as BookedOrder[]);
      return reducedOrders;
    },
    []
  );

  return {
    getOrderBook,
    reduceBookedOrdersByPrice,
  };
}
