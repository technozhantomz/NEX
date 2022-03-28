export type History = {
  block_num: number;
  id: string;
  op: any[];
  op_in_trx: number;
  result: any[];
  trx_in_block: number;
  virtual_op: number;
};
