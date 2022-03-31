import { BlockTableRow } from "../../../types";

export type UseBlockchainTabResult = {
  loading: boolean;
  blockchainData: BlockChainData;
  searchValue: string;
  searchResult: BlockTableRow[] | undefined;
  handleSearch: (value: string) => void;
};

export type BlockChainData = {
  currentBlock: number;
  supply: {
    amount: number;
    symbol: string;
  };
  activeWitnesses: string[];
  avgTime: number;
  recentBlocks: BlockTableRow[];
  stats: {
    blocks: number[];
    supply: number[];
    witnesses: number[];
    times: number[];
  };
};
