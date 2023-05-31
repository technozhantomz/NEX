import { TradeHistoryRow } from "../../../../../common/types";

export type UseHistoryTableResult = {
  tradeHistoryRows: TradeHistoryRow[];
  tradeHistoryColumns: TradeHistoryColumn[];
  loadingTradeHistory: boolean;
  defineTableRowClassName: (record: TradeHistoryRow) => "buy" | "sell";
};

export type TradeHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
  fixed: string | boolean;
  render?: (_: any, record: TradeHistoryRow) => JSX.Element;
};
