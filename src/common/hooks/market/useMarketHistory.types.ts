import { Asset, OrderHistory, Ticker } from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    base: Asset,
    quote: Asset
  ) => Promise<OrderHistory[] | undefined>;

  getTicker: (base: Asset, quote: Asset) => Promise<Ticker | undefined>;
};
