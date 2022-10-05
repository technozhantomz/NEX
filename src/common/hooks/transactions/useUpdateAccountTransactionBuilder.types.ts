import { Transaction } from "../../types";

// We should change this any
export type UseUpdateAccountTransactionBuilderResult = {
  buildUpdateAccountTransaction: (
    updatedAccount: any,
    accountId: string
  ) => Transaction;
};
