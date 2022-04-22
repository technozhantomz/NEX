export type UseOrderBookResult = {
  asks: Order[];
  bids: Order[];
  ordersRows: OrderRow[];
  userOrdersRows: OrderRow[];
  orderType: OrderType;
  threshold: number;
  loadingOrderRows: boolean;
  loadingUserOrderRows: boolean;
  refreshOrderBook: () => void;
  handleThresholdChange: (menuInfo: any) => void;
  handleFilterChange: (type: OrderType) => void;
  orderColumns: OrderColumn[];
  userOrderColumns: OrderColumn[];
};

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
};

export type OrderRow = {
  key: string;
  quote: number;
  base: number;
  price: number;
  isBuyOrder: boolean;
  expiration?: string;
};

export type TableScroll = {
  scrollToFirstRowOnChange: boolean;
  y: string | number;
};
