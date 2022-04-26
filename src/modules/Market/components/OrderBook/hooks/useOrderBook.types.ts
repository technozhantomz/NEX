import { OrderColumn, OrderType } from "../../../types";

export type UseOrderBookResult = {
  orderType: OrderType;
  threshold: number;
  handleThresholdChange: (menuInfo: any) => void;
  handleFilterChange: (type: OrderType) => void;
  orderColumns: OrderColumn[];
  userOrderColumns: OrderColumn[];
};

export type TableScroll = {
  scrollToFirstRowOnChange: boolean;
  y: string | number;
};
