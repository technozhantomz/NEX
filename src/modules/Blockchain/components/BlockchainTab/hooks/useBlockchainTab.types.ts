import { ColumnsType } from "antd/lib/table";
import { Dispatch, SetStateAction } from "react";

export type UseBlockchainTabResult = {
  loading: boolean;
  blockColumns: ColumnsType<unknown>;
  blockchainTableRows: BlockchainTableRow[];
  blockchainStats: BlockchainStats;
  currentBlock: number;
  lastIrreversibleBlock: string;
  avgTime: number;
  supply: BlockchainSupply;
  searchDataSource: BlockchainTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<BlockchainTableRow[]>>;
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

export type BlockchainTableRow = {
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
  operations: number;
  refBlockPrefix: number;
  refBlockNum: number;
  extensions: number;
};
