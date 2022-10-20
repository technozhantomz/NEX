import { Dispatch, SetStateAction } from "react";

export type UseOperationsTableResult = {
  loading: boolean;
  searchDataSource: OperationRow[];
  operationsRows: OperationRow[];
  setSearchDataSource: Dispatch<SetStateAction<OperationRow[]>>;
};

export type OperationRow = {
  number: number;
  id: number;
  type: string;
  fees: string;
  details: {
    details: string;
    results: string;
  };
};
