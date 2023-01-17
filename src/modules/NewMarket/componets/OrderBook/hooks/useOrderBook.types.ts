import { OrderColumn, OrderRow, OrderType } from "../../../types";

export type { OrderType } from "../../../types";

export type UseOrderBookResult = {
  orderType: OrderType;
  threshold: string;
  handleThresholdChange: (menuInfo: { key: string }) => void;
  handleFilterChange: (type: OrderType) => void;
  orderColumns: OrderColumn[];
  askRows: OrderRow[];
  bidRows: OrderRow[];
};
