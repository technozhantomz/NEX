export type MarketPairStats = {
  latest: string;
  percentChange: string;
  volume: string;
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
