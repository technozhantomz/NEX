import { Asset, BookedOrder } from "../../types";

export type UseOrderBookResult = {
  getOrderBook: (
    base: Asset,
    quote: Asset
  ) => Promise<{
    asks: BookedOrder[];
    bids: BookedOrder[];
  }>;
  reduceBookedOrdersByPrice: (
    orders: BookedOrder[],
    base: Asset,
    quote: Asset
  ) => BookedOrder[];
};
