import { Account, Asset, Transaction } from "../../types";

export type UseTransferTransactionBuilderResult = {
  buildTransferTransaction: (
    from: Account,
    to: Account,
    memo: string,
    asset: Asset,
    password: string,
    quantity: number
  ) => Transaction;
};
