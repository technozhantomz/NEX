export type ITransactionBuilder = {
  buildTrx: (trx: any, keys: any) => Promise<any>;
  getTrxFee: (trx: any) => Promise<any>;
};
