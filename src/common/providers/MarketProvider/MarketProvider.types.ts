import { MarketOrder, MarketPair, OrderHistory } from "../../types";

export type MarketContextType = {
  selectedPair: MarketPair | undefined;
  marketHistory: OrderHistory[];
  asks: MarketOrder[];
  bids: MarketOrder[];
  // ticker: Ticker | undefined;
  setSelectedPair: (selectedPair: MarketPair) => void;
  unsubscribeFromMarket: () => Promise<void>;
};
