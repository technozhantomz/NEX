import { Account, Asset, Transaction } from "../../types";

export type UseTransferTransactionBuilderResult = {
  buildTransferTransaction: (
    from: Account,
    to: Account,
    memo: string,
    asset: Asset,
    quantity: number
  ) => Transaction;
};
