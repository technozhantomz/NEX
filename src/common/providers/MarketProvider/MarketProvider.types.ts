import {
  MarketOrder,
  MarketPair,
  MarketPairStats,
  OrderHistory,
} from "../../types";

export type MarketContextType = {
  selectedPair: MarketPair | undefined;
  marketHistory: OrderHistory[];
  asks: MarketOrder[];
  bids: MarketOrder[];
  tradingPairStats: MarketPairStats;
  setSelectedPair: (selectedPair: MarketPair) => void;
  unsubscribeFromMarket: () => Promise<void>;
};
