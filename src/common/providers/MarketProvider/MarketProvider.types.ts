import { MarketPair, OrderHistory } from "../../types";

export type MarketContextType = {
  selectedPair: MarketPair | undefined;
  marketHistory: OrderHistory[];
  setSelectedPair: (selectedPair: MarketPair) => void;
};
