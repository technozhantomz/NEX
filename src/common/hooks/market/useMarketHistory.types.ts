import {
  History,
  LimitOrder,
  MarketPair,
  OrderHistory,
  TradeHistoryRow,
} from "../../types";

export type UseMarketHistoryResult = {
  getFillOrderHistory: (
    selectedPair: MarketPair,
    limit?: number
  ) => Promise<OrderHistory[] | undefined>;
  getHistoryTableRows: () => Promise<TradeHistoryRow[] | undefined>;
  formTradeHistoryRows: (
    history: OrderHistory | History,
    selectedPair: MarketPair,
    forUser: boolean,
    openOrder?: LimitOrder
  ) => Promise<TradeHistoryRow>;
};
