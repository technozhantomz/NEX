import { MarketPairStats } from "../../../../../common/types";

export type UseMarketTabResult = {
  pairs: PairNameAndMarketStats[];
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
