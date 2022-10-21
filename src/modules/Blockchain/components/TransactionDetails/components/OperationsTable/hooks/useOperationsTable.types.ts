import { Dispatch, SetStateAction } from "react";

export type UseOperationsTableResult = {
  loading: boolean;
  showDetials: boolean;
  searchDataSource: OperationRow[];
  operationsRows: OperationRow[];
  setSearchDataSource: Dispatch<SetStateAction<OperationRow[]>>;
  setShowDetials: Dispatch<SetStateAction<boolean>>;
};

export type OperationRow = {
  key: number;
  number: number;
  id: number;
  type: string;
  fees: string;
  details: string;
  results: string;
};
