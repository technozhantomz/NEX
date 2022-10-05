import { Asset, MarketPairStats, PairNameAndMarketStats } from "../../types";

export type UseMarketPairStatsResult = {
  getMarketPairStats: (base: Asset, quote: Asset) => Promise<MarketPairStats>;
  getDefaultPairs: () => Promise<string[]>;
  formPairStats: (pair: string) => Promise<PairNameAndMarketStats>;
};
