import { Fee } from "../../../common/types";

export type OrderHistoryRow = {
  key: string;
  price: number;
  base: number;
  quote: number;
  date: string;
  isBuyOrder: boolean;
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

export type OrderHistoryColumn = {
  title: string;
  dataIndex: string;
  key: string;
};

export type Pay = {
  amount: number;
  asset_id: string;
};
