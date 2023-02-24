import { BookedOrder, MarketPair } from "../../types";

export type UseOrderBookResult = {
  getOrderBook: (selectedPair: MarketPair) => Promise<{
    asks: BookedOrder[];
    bids: BookedOrder[];
  }>;
};
