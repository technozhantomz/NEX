export type UseOrderBookResult = {
  asks: Order[];
  bids: Order[];
  orderType: OrderType;
  handleThresholdChange: (value: string) => void;
  handleFilterChange: (type: OrderType) => void;
};

export type Order = {
  base: string;
  price: string;
  quote: string;
};

export type OrderType = "total" | "buy" | "sell";
