import { Asset } from "./Asset";

export type MarketPair = {
  base: Asset;
  quote: Asset;
};

export type MarketPairStats = {
  latest: string;
  percentChange: string;
  volume: string;
  askPrice?: string;
  bidPrice?: string;
  dailyHigh?: string;
  dailyLow?: string;
};

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

export type OrderForm = {
  price: string;
  amount: string;
  total: string;
};
