import { ColumnsType } from "antd/lib/table";
import { Dispatch, SetStateAction } from "react";

export type UseBlockchainTabResult = {
  loading: boolean;
  blockColumns: ColumnsType<unknown>;
  blockchainTableRows: DataTableRow[];
  blockchainStats: BlockchainStats;
  currentBlock: number;
  lastIrreversibleBlock: string;
  avgTime: number;
  supply: BlockchainSupply;
  searchDataSource: DataTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<DataTableRow[]>>;
};

export type BlockchainSupply = {
  amount: number;
  symbol: string;
};

export type BlockchainStats = {
  currentBlock: number[];
  lastIrreversible: number[];
  avgTime: number[];
  supply: number[];
};

export type DataTableRow = {
  key: number;
  blockID: number;
  time: string;
  witness: string;
  transaction: number;
};
