import { Dispatch, SetStateAction } from "react";

export type UseOperationsTableResult = {
  loading: boolean;
  showDetials: boolean;
  searchDataSource: OperationRow[];
  operationsRows: OperationRow[];
  setSearchDataSource: Dispatch<SetStateAction<OperationRow[]>>;
  toggleDetails: () => void;
};

export type OperationRow = {
  key: number;
  number: number;
  id: number;
  type?: string;
  time: string;
  fees: string;
  details: string;
  results: string;
};
