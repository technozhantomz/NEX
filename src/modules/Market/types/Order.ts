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
  quote: string;
  base: string;
  price: string;
  isBuyOrder: boolean;
  expiration?: string;
};

export type OrderForm = {
  price: string;
  quantity: string;
  total: string;
};
