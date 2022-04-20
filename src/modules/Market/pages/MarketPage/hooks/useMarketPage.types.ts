import { MarketPairStats } from "../../../../../common/types";

export type UseMarketPageResult = {
  tradingPairsStats: PairNameAndMarketStats[];
  loading: boolean;
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
