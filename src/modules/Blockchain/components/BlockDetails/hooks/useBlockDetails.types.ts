import {
  DataTableRow,
  TransactionRow,
} from "../../BlockchainTab/hooks/useBlockchainTab.types";

export type UseBlockDetailsResult = {
  blockDetails: DataTableRow;
  loading: boolean;
  hasNextBlock: boolean;
  hasPreviousBlock: boolean;
  loadingSideBlocks: boolean;
  hasNextTransition: boolean;
  hasPreviousTransition: boolean;
  loadingSideTransactions: boolean;
  selectedTransaction: TransactionRow;
};
