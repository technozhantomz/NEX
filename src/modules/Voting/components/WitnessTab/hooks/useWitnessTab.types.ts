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
  name: string;
  total_votes: string;
  url: string;
};
