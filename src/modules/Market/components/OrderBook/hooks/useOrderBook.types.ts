import { Dispatch, SetStateAction } from "react";

import { OrderColumn, OrderType } from "../../../types";

export type { OrderType } from "../../../types";

export type UseOrderBookResult = {
  orderType: OrderType;
  threshold: number;
  handleThresholdChange: (menuInfo: any) => void;
  handleFilterChange: (type: OrderType) => void;
  orderColumns: OrderColumn[];
  cancelOrderfeeAmount: number;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  setSelectedOrderId: Dispatch<SetStateAction<string>>;
  selectedOrderId: string;
  handleCancelLimitOrder: (password: string) => Promise<void>;
};

export type TableScroll = {
  scrollToFirstRowOnChange: boolean;
  y: string | number;
};
