import { Asset, Transaction } from "../../types";

export type UseOrderTransactionBuilderResult = {
  buildCreateLimitOrderTransaction: (
    sellerId: string,
    quantity: string,
    total: string,
    currentBase: Asset,
    currentQuote: Asset,
    expiration: string,
    fill_or_kill: boolean,
    extensions: any[],
    isBuyOrder: boolean
  ) => Transaction;
  buildCancelLimitOrderTransaction: (
    orderId: string,
    feePayingAccount: string
  ) => Transaction;
  buildSwapTransaction: (
    sellerId: string,
    minToReceive: string,
    amountToSell: string,
    sellAsset: Asset,
    buyAsset: Asset
  ) => Transaction;
};
