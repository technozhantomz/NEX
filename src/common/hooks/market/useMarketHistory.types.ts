import {
  Asset,
  History,
  LimitOrder,
  MarketPair,
  OrderHistory,
  TradeHistoryRow,
} from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    base: Asset,
    quote: Asset
  ) => Promise<OrderHistory[] | undefined>;
  formTradeHistoryTableRows: (
    selectedPair: MarketPair,
    marketHistory: OrderHistory[]
  ) => Promise<TradeHistoryRow[] | undefined>;
  formTradeHistoryRow: (
    history: OrderHistory | History,
    selectedPair: MarketPair,
    forUser: boolean,
    openOrder?: LimitOrder
  ) => Promise<TradeHistoryRow>;
};
