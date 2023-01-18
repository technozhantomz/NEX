export type TradeHistoryRow = {
  key: string;
  price: string;
  amount: string;
  time: string;
  isBuyOrder: boolean;
  isPriceUp?: boolean;
};

export type TradeHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
  fixed: string | boolean;
  render?: (_: any, record: TradeHistoryRow) => JSX.Element;
};
