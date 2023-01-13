export type TradeHistoryRow = {
  key: string;
  price: string;
  amount: number;
  time: string;
  isBuyOrder: boolean;
};

export type OrderHistoryRow = {
  key: string;
  price: string;
  base: number;
  quote: number;
  date: string;
  isBuyOrder: boolean;
  filled: string;
};

export type TradeHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
  fixed: string | boolean;
};
