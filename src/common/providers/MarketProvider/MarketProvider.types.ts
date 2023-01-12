import { MarketPair } from "../../types";

export type MarketContextType = {
  selectedPair: MarketPair | undefined;
  setSelectedPair: (selectedPair: MarketPair) => void;
};
