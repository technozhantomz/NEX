import { Dispatch, SetStateAction } from "react";

export type UseBlockchainTabResult = {
  loading: boolean;
  blockColumns: BlockColumnType[];
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
  nextSecret?: string;
  previousSecret?: string;
  merkleRoot?: string;
  blockID: number;
  time: string;
  witness: string;
  witnessSignature?: string;
  transactions?: TransactionRow[];
};

export type TransactionRow = {
  rank: number;
  id: string;
  expiration: string;
  operations: unknown[][];
  operationResults: unknown[];
  refBlockPrefix: number;
  refBlockNum: number;
  extensions: unknown[];
  signatures: string[];
};

export type BlockColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((witness: string) => JSX.Element) | undefined;
  filters:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: string, record: DataTableRow) => boolean) | undefined;
  sorter:
    | ((
        a: {
          blockID: number;
        },
        b: {
          blockID: number;
        }
      ) => number)
    | ((
        a: {
          time: string;
        },
        b: {
          time: string;
        }
      ) => number)
    | ((
        a: {
          transaction: number;
        },
        b: {
          transaction: number;
        }
      ) => number)
    | undefined;
};
