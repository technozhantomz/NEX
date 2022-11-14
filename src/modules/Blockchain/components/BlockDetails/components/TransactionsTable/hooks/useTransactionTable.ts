import { useEffect, useState } from "react";

import { TransactionRow } from "../../../hooks";

import { UseTransactionTableResult } from "./useTransactionTable.types";

export function useTransactionsTable(
  transactions: TransactionRow[]
): UseTransactionTableResult {
  const [searchDataSource, setSearchDataSource] = useState<TransactionRow[]>(
    []
  );

  useEffect(() => {
    setSearchDataSource(transactions);
  }, [transactions]);

  return {
    searchDataSource,
    setSearchDataSource,
  };
}
