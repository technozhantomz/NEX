import { MarketOrder, OrderHistory, SelectedMarketPair } from "../../types";

export type MarketContextType = {
  selectedPair: SelectedMarketPair;
  marketHistory: OrderHistory[];
  asks: MarketOrder[];
  bids: MarketOrder[];
  setSelectedPair: (selectedPair: SelectedMarketPair) => void;
  unsubscribeFromMarket: () => Promise<void>;
};
