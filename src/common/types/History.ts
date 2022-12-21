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
