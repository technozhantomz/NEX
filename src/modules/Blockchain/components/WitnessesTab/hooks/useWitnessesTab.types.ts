export type UseWitnessesTabResult = {
  loading: boolean;
  witnessTableRows: WitnessTableRow[];
  witnessStats: WitnessStats;
  activeWitnesses: number;
  reward: number;
  earnings: number;
  searchValue: string;
  handleSearch: (name: string) => void;
};

export type WitnessStats = {
  active: number[];
  reward: number[];
  earnings: number[];
};

export type WitnessTableRow = {
  key: number;
  rank: number;
  name: string;
  totalVotes: string;
  lastBlock: number;
  missedBlocks: number;
  url: string;
};
