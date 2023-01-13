import { OrderColumn, OrderRow, OrderType } from "../../../types";

export type { OrderType } from "../../../types";

export type UseOrderBookResult = {
  ordersRows: OrderRow[];
  orderType: OrderType;
  threshold: number;
  handleThresholdChange: (menuInfo: any) => void;
  handleFilterChange: (type: OrderType) => void;
  orderColumns: OrderColumn[];
};
