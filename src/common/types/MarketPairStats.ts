export type MarketPairStats = {
  latest: number;
  percentChange: number;
  volume: number;
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
