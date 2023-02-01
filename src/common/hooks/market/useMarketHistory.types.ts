import {
  Asset,
  History,
  LimitOrder,
  MarketPair,
  OrderHistory,
  Ticker,
  TradeHistoryRow,
} from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    selectedPair: MarketPair,
    limit?: number
  ) => Promise<OrderHistory[] | undefined>;
  getTicker: (base: Asset, quote: Asset) => Promise<Ticker | undefined>;
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
