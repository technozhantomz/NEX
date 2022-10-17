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
  nextSecret: string;
  previousSecret: string;
  merkleRoot: string;
  blockID: number;
  time: string;
  witness: string;
  witnessSignature: string;
  transactions: TransactionRow[];
};

export type TransactionRow = {
  rank: number;
  id: string;
  expiration: string;
  operations: unknown[];
  operationResults: unknown[];
  refBlockPrefix: number;
  refBlockNum: number;
  extensions: unknown[];
  signatures: string[];
};
