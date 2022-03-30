import { MarketPairStats } from "../../../../../common/types";

export type UseMarketPageResult = {
  statPairs: PairNameAndMarketStats[];
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
