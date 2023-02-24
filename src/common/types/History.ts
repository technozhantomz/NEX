import { Fee } from ".";

export type History = {
  block_num: number;
  id: string;
  op: any[];
  op_in_trx: number;
  result: any[];
  trx_in_block: number;
  virtual_op: number;
};

export type Pay = {
  amount: number;
  asset_id: string;
};

export type OrederHistoryOptions = {
  account_id: string;
  fee: Fee;
  order_id: string;
  pays: Pay;
  receives: Pay;
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

export type TradeHistoryRow = {
  key: string;
  price: string;
  amount: number;
  time: string;
  isBuyOrder: boolean;
  isPriceUp?: boolean;
  filled?: string;
};

export type MarketHistory = {
  base_volume: number;
  close_base: number;
  close_quote: number;
  high_base: number;
  high_quote: number;
  id: string;
  key: {
    base: string;
    open: string;
    quote: string;
    seconds: number;
  };
  low_base: number;
  low_quote: number;
  open_base: number;
  open_quote: number;
  quote_volume: number;
};
