export type OrderHistoryRow = {
  key: string;
  price: string;
  base: number;
  quote: number;
  date: string;
  isBuyOrder: boolean;
  filled: string;
};

export type OrderHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
};
