import { Dispatch, SetStateAction } from "react";

import { TransactionRow } from "../../../../BlockchainTab/hooks/useBlockchainTab.types";

export type UseTransactionTableResult = {
  loading: boolean;
  searchDataSource: TransactionRow[];
  setSearchDataSource: Dispatch<SetStateAction<TransactionRow[]>>;
};
