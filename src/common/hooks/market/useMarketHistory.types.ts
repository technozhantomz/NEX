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
    base: Asset,
    quote: Asset
  ) => Promise<OrderHistory[] | undefined>;
  getTicker: (base: Asset, quote: Asset) => Promise<Ticker | undefined>;
  getHistoryTableRows: () => Promise<TradeHistoryRow[] | undefined>;
  formTradeHistoryRows: (
    history: OrderHistory | History,
    selectedPair: MarketPair,
    forUser: boolean,
    openOrder?: LimitOrder
  ) => Promise<TradeHistoryRow>;
};
