export type UseBlockchainTab = {
  loading: boolean;
  blockchainData: BlockChainData;
};

export type BlockTableRow = {
  blockID: number;
  time: string;
  witness: string;
  transaction: number;
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
};
