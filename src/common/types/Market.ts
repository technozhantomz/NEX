import { Asset } from "./Asset";

export type SelectedMarketPair = MarketPair | undefined;

export type MarketPair = {
  base: Asset;
  quote: Asset;
};

export type MarketPairStats = {
  latest: string;
  percentChange: string;
  volume: string;
};

// TODO: remove marketPage redesign
export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};

export type MarketOrder = {
  base: string;
  price: string;
  quote: string;
  isBuyOrder: boolean;
};

export type MarketOrderType = "total" | "buy" | "sell";
