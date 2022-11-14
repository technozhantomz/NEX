import { Asset, MarketPairStats, PairNameAndMarketStats } from "../../types";

export type UseMarketPairStatsResult = {
  getMarketPairStats: (base: Asset, quote: Asset) => Promise<MarketPairStats>;
  getDefaultPairs: () => string[];
  formPairStats: (pair: string) => Promise<PairNameAndMarketStats>;
  loading: boolean;
};
