import { Asset, OrderHistory } from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    base: Asset,
    quote: Asset
  ) => Promise<OrderHistory[] | undefined>;
};
