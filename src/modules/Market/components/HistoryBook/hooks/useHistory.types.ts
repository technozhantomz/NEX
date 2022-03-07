import { Fee } from "../../../../../common/types";

export type UseHistoryResult = {
  orderHistoryRow: OrderHistoryRow[];
};

export type OrderHistoryRow = {
  baseAmount: number;
  quoteAmount: number;
  price: number;
  isBuyOrder: boolean;
  time: string;
};
export type OrderHistory = {
  id: string;
  key: {
    base: string;
    quote: string;
    sequence: number;
  };
  op: OrederHistoryOptions;
  time: string;
};

export type OrederHistoryOptions = {
  account_id: string;
  fee: Fee;
  order_id: string;
  pays: Pay;
  receives: Pay;
};

export type Pay = {
  amount: number;
  asset_id: string;
};
