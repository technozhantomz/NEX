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
  render?: (_value: string, record: any) => JSX.Element;
};

export type OrderRow = {
  key: string;
  quote: number;
  base: number;
  price: number;
  isBuyOrder: boolean;
  expiration?: string;
};

export type OrderForm = {
  price: number;
  quantity: number;
  total: number;
};
