import { useCallback } from "react";

import { useAsset } from "..";
import { usePeerplaysApiContext } from "../../providers";
import { Asset, BookedOrder } from "../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

export function useOrderBook(): UseOrderBookResult {
  const { dbApi } = usePeerplaysApiContext();
  const { limitByPrecision } = useAsset();

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
            limitByPrecision(previousOrder.price, base.precision) ===
            limitByPrecision(currentOrder.price, base.precision)
        );
        if (repeatedPriceIndex === -1) {
          previousOrders.push({
            quote: limitByPrecision(currentOrder.quote, quote.precision),
            base: limitByPrecision(currentOrder.base, base.precision),
            price: limitByPrecision(currentOrder.price, base.precision),
          } as BookedOrder);
        } else {
          const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
          previousOrders[repeatedPriceIndex] = {
            quote: String(
              Number(
                limitByPrecision(orderWithRepeatedPrice.quote, quote.precision)
              ) + Number(limitByPrecision(currentOrder.quote, quote.precision))
            ),
            base: String(
              Number(
                limitByPrecision(orderWithRepeatedPrice.base, base.precision)
              ) + Number(limitByPrecision(currentOrder.base, base.precision))
            ),
            price: limitByPrecision(
              orderWithRepeatedPrice.price,
              base.precision
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
