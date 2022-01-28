export type UsePairSelectResult = {
  activePair: string;
  recentPairs: string[];
  handleSelectPair: (selectedPair: string) => void;
};
