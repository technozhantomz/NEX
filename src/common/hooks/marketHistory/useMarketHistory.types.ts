import { MarketPair, OrderHistory } from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    selectedPair: MarketPair
  ) => Promise<OrderHistory[] | undefined>;
};
