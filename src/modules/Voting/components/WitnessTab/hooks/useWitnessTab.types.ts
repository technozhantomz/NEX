export type WitnessesTab = {
  loading: boolean;
  witnesses: WitnessData;
  searchValue: string;
  onSearch: (name: string) => void;
};

export type WitnessData = {
  // activeWitnesses: number;
  // reward: number;
  // earnings: number;
  data: WitnessTableRow[];
  // stats: WitnessStats;
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
