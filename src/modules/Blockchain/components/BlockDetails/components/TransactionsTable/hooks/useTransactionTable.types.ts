import { Dispatch, SetStateAction } from "react";

import { TransactionRow } from "../../../hooks";

export type UseTransactionTableResult = {
  searchDataSource: TransactionRow[];
  setSearchDataSource: Dispatch<SetStateAction<TransactionRow[]>>;
};
