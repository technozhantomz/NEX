import { TransactionRow } from "../../BlockDetails/hooks";

export type UseTransactionDetails = {
  loading: boolean;
  blockTransactions: TransactionRow[];
  transactionDetails: TransactionRow;
  hasNextTransition: boolean;
  hasPreviousTransition: boolean;
  loadingSideTransactions: boolean;
};
