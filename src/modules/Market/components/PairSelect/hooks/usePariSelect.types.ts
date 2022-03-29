import { Asset } from "../../../../../common/types/Asset";

export type UsePairSelectResult = {
  visible: boolean;
  activePair: string;
  recentPairs: string[];
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  handleSelectPair: (selectedPair: string) => void;
  onSelectPair: () => void;
  onCancel: () => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
};
