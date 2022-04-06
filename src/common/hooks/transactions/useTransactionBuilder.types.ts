export type ITransactionBuilder = {
  trxBuilder: (trx: any, keys: any) => Promise<unknown>;
  getTrxFee: (trx: any) => Promise<any>;
};
