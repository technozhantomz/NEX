export type WitnessesTab = {
  loading: boolean;
  witnesses: WitnessData;
  searchValue: string;
  onSearch: (name: string) => void;
  removeFromVote: (id: string) => void;
  addToVote: (id: string) => void;
};

export type WitnessData = {
  data: WitnessTableRow[];
};


export type WitnessTableRow = {
  key: number;
  name: string;
  total_votes: string;
  url: string;
};
