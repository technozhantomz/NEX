import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../common/types";
import { OrderColumn, OrderRow, OrderType } from "../../../types";

export type { OrderType } from "../../../types";

export type UseOrderBookResult = {
  ordersRows: OrderRow[];
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
  handleCancelLimitOrder: (signerKey: SignerKey) => Promise<void>;
};

export type TableScroll = {
  scrollToFirstRowOnChange: boolean;
  y: string | number;
};
