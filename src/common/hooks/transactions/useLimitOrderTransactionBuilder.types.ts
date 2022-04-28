import { Asset, Transaction } from "../../types";

export type UseLimitOrderTransactionBuilderResult = {
  buildCreateLimitOrderTransaction: (
    sellerId: string,
    quantity: number,
    total: number,
    currentBase: Asset,
    currentQuote: Asset,
    expiration: string,
    fill_or_kill: boolean,
    extensions: any[],
    isBuyOrder: boolean
  ) => Transaction;
};
