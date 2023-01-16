export type UseHistoryTableResult = {
  tradeHistoryRows: TradeHistoryRow[];
  tradeHistoryColumns: TradeHistoryColumn[];
  loadingTradeHistory: boolean;
  defineTableRowClassName: (record: any) => "buy" | "sell";
};

export type TradeHistoryRow = {
  key: string;
  price: string;
  amount: number;
  time: string;
  isBuyOrder: boolean;
  isPriceUp?: boolean;
  filled?: string;
};

export type TradeHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
  fixed: string | boolean;
  render?: (_: any, record: TradeHistoryRow) => JSX.Element;
};
