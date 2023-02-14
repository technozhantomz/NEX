import {
  Asset,
  History,
  LimitOrder,
  MarketHistory,
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
  getMarketHistoryBuckets: () => Promise<number[] | undefined>;
  getMarketHistory: (
    firstAssetSymbolOrId: string,
    secondAssetSymbolOrId: string,
    bucketSize: number,
    start: string,
    end: string
  ) => Promise<MarketHistory[] | undefined>;
};
