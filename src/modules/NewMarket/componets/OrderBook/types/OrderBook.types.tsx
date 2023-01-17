export type Order = {
  base: string;
  price: string;
  quote: string;
  isBuyOrder: boolean;
};

export type OrderType = "total" | "buy" | "sell";

export type OrderColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_value: string, record: unknown) => string;
};

export type OrderRow = {
  key: string;
  quote: string;
  amount: string;
  total: string;
  orderDepth: number;
  isBuyOrder: boolean;
  expiration?: string;
  filled?: string;
};

export type OrderForm = {
  price: string;
  quantity: string;
  total: string;
};
