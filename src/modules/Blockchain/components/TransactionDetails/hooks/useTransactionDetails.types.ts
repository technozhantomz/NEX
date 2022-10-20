import { TransactionRow } from "../../BlockchainTab/hooks/useBlockchainTab.types";

export type UseTransactionDetails = {
  loading: boolean;
  blockTransactions: TransactionRow[];
  transactionDetails: TransactionRow;
  hasNextTransition: boolean;
  hasPreviousTransition: boolean;
  loadingSideTransactions: boolean;
};
