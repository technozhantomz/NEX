import {
  OrderHistoryRow,
  TradeHistoryColumn,
  TradeHistoryRow,
} from "../../../types";

export type UseHistoryTableResult = {
  tradeHistoryRows: TradeHistoryRow[];
  userOrderHistoryRows: OrderHistoryRow[];
  tradeHistoryColumns: TradeHistoryColumn[];
  loadingTradeHistory: boolean;
};
