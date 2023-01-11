export type TradeHistoryRow = {
  key: string;
  price: string;
  amount: number;
  time: string;
  isBuyOrder: boolean;
};

export type TradeHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
  fixed: string | boolean;
};
