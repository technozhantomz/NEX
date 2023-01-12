import { TradeHistoryColumn, TradeHistoryRow } from "../../../types";

export type UseHistoryTableResult = {
  tradeHistoryRows: TradeHistoryRow[];
  tradeHistoryColumns: TradeHistoryColumn[];
  loadingTradeHistory: boolean;
};
