import { useEffect, useState } from "react";

import { TransactionRow } from "../../../../BlockchainTab/hooks/useBlockchainTab.types";

import { UseTransactionTableResult } from "./useTransactionTable.types";

export function useTransactionsTable(
  transactions: TransactionRow[]
): UseTransactionTableResult {
  const [loading, setLoading] = useState(true);
  const [searchDataSource, setSearchDataSource] = useState<TransactionRow[]>(
    []
  );

  useEffect(() => {
    setSearchDataSource(transactions);
    setLoading(false);
  }, [transactions]);

  return {
    loading,
    searchDataSource,
    setSearchDataSource,
  };
}
