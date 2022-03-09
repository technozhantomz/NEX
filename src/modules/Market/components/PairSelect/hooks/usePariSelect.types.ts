import { Asset } from "../../../../../common/types/Asset";

export type UsePairSelectResult = {
  activePair: string;
  recentPairs: string[];
  handleSelectPair: (selectedPair: string) => void;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
};
