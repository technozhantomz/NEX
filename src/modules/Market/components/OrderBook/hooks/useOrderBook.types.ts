import { Dispatch, SetStateAction } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../common/hooks";
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
  transactionMessageState: TransactionMessageState;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
  setSelectedOrderId: Dispatch<SetStateAction<string>>;
  selectedOrderId: string;
  handleCancelLimitOrder: (signerKey: SignerKey) => Promise<void>;
};

export type TableScroll = {
  scrollToFirstRowOnChange: boolean;
  y: string | number;
};
