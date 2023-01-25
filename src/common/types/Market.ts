import { Asset } from "./Asset";

export type MarketPair = {
  base: Asset;
  quote: Asset;
};

export type MarketPairStats = {
  latest: string;
  percentChange: string;
  volume: string;
  ask_quote?: string;
  bid_quote?: string;
  dailyHigh?: string;
  dailyLow?: string;
  latestIsBuyOrder?: boolean;
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
  timestamp?: Date;
};
